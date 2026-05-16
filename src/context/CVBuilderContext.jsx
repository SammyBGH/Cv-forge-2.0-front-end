import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { api } from '../api/client.js';

const CVBuilderContext = createContext(null);

function sortSections(sections) {
  return [...sections].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function CVBuilderProvider({ cvId, children }) {
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const saveTimer = useRef(null);
  /** Always mirrors latest `cv` for saves (avoids stale closures + overlapping PATCH races). */
  const cvRef = useRef(null);
  /** Incremented on every local mutation; detects edits during an in-flight PATCH. */
  const localGenRef = useRef(0);
  const flushSaveImplRef = useRef(async () => {});

  cvRef.current = cv;

  const scheduleSave = useCallback(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      void flushSaveImplRef.current();
    }, 900);
  }, []);

  useEffect(() => {
    flushSaveImplRef.current = async () => {
      const snapshot = cvRef.current;
      if (!snapshot) return;

      const genAtStart = localGenRef.current;
      setSaving(true);
      try {
        const payload = {
          title: snapshot.title,
          templateId: snapshot.templateId,
          themeId: snapshot.themeId,
          layoutId: snapshot.layoutId,
          sections: sortSections(snapshot.sections || []),
          customization: snapshot.customization || {},
        };
        const data = await api.patchCv(cvId, payload);

        if (genAtStart !== localGenRef.current) {
          /** User kept typing/changing layout while this PATCH was in flight — do not overwrite UI. */
          scheduleSave();
          return;
        }

        setCv(data.cv);
      } catch (e) {
        setError(e.message);
      } finally {
        setSaving(false);
      }
    };
  }, [cvId, scheduleSave]);

  useEffect(() => {
    localGenRef.current = 0;
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
      saveTimer.current = null;
    }
  }, [cvId]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getCv(cvId);
      setCv(data.cv);
      localGenRef.current = 0;
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [cvId]);

  useEffect(() => {
    load();
  }, [load]);

  const flushSave = useCallback(async () => {
    await flushSaveImplRef.current();
  }, []);

  const bumpLocalGen = useCallback(() => {
    localGenRef.current += 1;
  }, []);

  const updateCv = useCallback(
    (updater) => {
      bumpLocalGen();
      setCv((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
        return next;
      });
      scheduleSave();
    },
    [bumpLocalGen, scheduleSave]
  );

  const updateSection = useCallback(
    (key, partial) => {
      bumpLocalGen();
      setCv((prev) => {
        const sections = (prev.sections || []).map((s) => {
          if (s.key !== key) return s;
          const merged = { ...s, ...partial };
          if (partial.data !== undefined) merged.data = partial.data;
          return merged;
        });
        return { ...prev, sections };
      });
      scheduleSave();
    },
    [bumpLocalGen, scheduleSave]
  );

  const reorderSections = useCallback(
    (orderedKeys) => {
      bumpLocalGen();
      setCv((prev) => {
        const map = new Map((prev.sections || []).map((s) => [s.key, s]));
        const sections = orderedKeys
          .map((k, i) => {
            const base = map.get(k);
            return base ? { ...base, order: i } : null;
          })
          .filter(Boolean);
        return { ...prev, sections };
      });
      scheduleSave();
    },
    [bumpLocalGen, scheduleSave]
  );

  useEffect(
    () => () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    },
    []
  );

  const value = useMemo(
    () => ({
      cvId,
      cv,
      loading,
      saving,
      error,
      reload: load,
      flushSave,
      updateCv,
      updateSection,
      reorderSections,
    }),
    [cvId, cv, loading, saving, error, load, flushSave, updateCv, updateSection, reorderSections]
  );

  return <CVBuilderContext.Provider value={value}>{children}</CVBuilderContext.Provider>;
}

export function useCVBuilder() {
  const ctx = useContext(CVBuilderContext);
  if (!ctx) throw new Error('useCVBuilder must be used within CVBuilderProvider');
  return ctx;
}
