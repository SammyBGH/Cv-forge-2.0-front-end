import { useId, useState } from 'react';
import { useCVBuilder } from '../../../context/CVBuilderContext.jsx';
import AutocompleteInput from '../../ui/AutocompleteInput.jsx';
import { FileIcon, ChevronUpIcon, ChevronDownIcon, XIcon } from '../../ui/Icons.jsx';

/** Broad, transferable skills that apply across most industries and roles. */
const POPULAR_SKILL_SUGGESTIONS = [
  'Communication',
  'Teamwork',
  'Customer Service',
  'Time Management',
  'Problem Solving',
  'Attention to Detail',
  'Organisation',
  'Adaptability',
  'Microsoft Office',
  'Scheduling & Planning',
  'Cash Handling',
  'Conflict Resolution',
  'Team Leadership',
  'Health & Safety',
  'Data Entry',
  'Written Communication',
];

const ACTION_VERBS = [
  'Led',
  'Managed',
  'Created',
  'Coordinated',
  'Delivered',
  'Improved',
  'Supported',
  'Trained',
  'Organised',
  'Handled',
  'Resolved',
  'Achieved',
];

function entryLabel(item, fields, idx) {
  const primaryField = fields.find((f) => f.type !== 'textarea' && item[f.key]);
  if (primaryField && item[primaryField.key]) {
    return item[primaryField.key];
  }
  return `Entry ${idx + 1}`;
}

function entrySubtitle(item, fields) {
  const secondaryField = fields.find(
    (f) => f.type !== 'textarea' && f.key !== fields[0]?.key && item[f.key]
  );
  if (secondaryField && item[secondaryField.key]) {
    return item[secondaryField.key];
  }
  return null;
}

export default function ItemsEditor({ section, title, titleHint, fields }) {
  const { updateSection } = useCVBuilder();
  const reactId = useId();
  const d = section.data || {};
  const items = Array.isArray(d.items) ? d.items : [];
  const [openIdx, setOpenIdx] = useState(0);

  function setItems(next) {
    updateSection(section.key, { data: { ...d, items: next } });
  }

  function updateItem(idx, patch) {
    setItems(items.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  }

  function addItem(initialData = {}) {
    const empty = {};
    fields.forEach((f) => {
      empty[f.key] = initialData[f.key] || '';
    });
    setItems([...items, empty]);
    setOpenIdx(items.length);
  }

  function removeItem(idx) {
    if (window.confirm('Are you sure you want to remove this entry?')) {
      setItems(items.filter((_, i) => i !== idx));
      setOpenIdx((current) => Math.max(0, Math.min(current, items.length - 2)));
    }
  }

  function moveItem(idx, dir) {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    const tmp = next[idx];
    next[idx] = next[j];
    next[j] = tmp;
    setItems(next);
    setOpenIdx(j);
  }

  const sectionHeadingId = `${reactId}-heading`;
  const isSkills = section.type === 'skills';
  const isExperience = section.type === 'experience';

  // Set of already added skill names
  const existingSkillNames = new Set(items.map((it) => (it.name || '').toLowerCase().trim()));

  return (
    <div className="items-editor" role="group" aria-labelledby={sectionHeadingId}>
      <div className="items-editor-head">
        <div>
          <strong id={sectionHeadingId} className="items-editor-title">
            {title}
          </strong>
          {titleHint ? (
            <p className="field-hint block-hint" id={`${sectionHeadingId}-hint`}>
              {titleHint}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          className="btn btn-secondary tiny add-entry-btn"
          onClick={() => addItem()}
          aria-describedby={titleHint ? `${sectionHeadingId}-hint` : undefined}
        >
          + Add {section.type === 'skills' ? 'skill' : section.type === 'languages' ? 'language' : 'entry'}
        </button>
      </div>

      {isSkills && (
        <div className="skills-suggestions-bar">
          <span className="skills-suggest-label">Suggested skills:</span>
          <div className="skills-suggest-chips">
            {POPULAR_SKILL_SUGGESTIONS.filter(
              (name) => !existingSkillNames.has(name.toLowerCase())
            )
              .slice(0, 8)
              .map((skillName) => (
                <button
                  key={skillName}
                  type="button"
                  className="chip-btn"
                  onClick={() => addItem({ name: skillName, level: 'Proficient' })}
                  title={`Add ${skillName}`}
                >
                  + {skillName}
                </button>
              ))}
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="items-empty">
          <div className="items-empty-icon" aria-hidden="true">
            <FileIcon size={26} />
          </div>
          <p className="items-empty-text">No entries added yet.</p>
          <p className="muted small">Add your experience or credentials to make your CV stand out.</p>
          <button type="button" className="btn btn-primary small" onClick={() => addItem()}>
            Add the first entry
          </button>
        </div>
      ) : null}

      <ul className="items-list">
        {items.map((item, idx) => {
          const expanded = openIdx === idx;
          const label = entryLabel(item, fields, idx);
          const subtitle = entrySubtitle(item, fields);
          const period = item.period || item.year || null;

          return (
            <li key={idx} className={`items-card ${expanded ? 'is-open' : ''}`}>
              <div className="items-card-toolbar">
                <button
                  type="button"
                  className="items-card-toggle"
                  aria-expanded={expanded}
                  onClick={() => setOpenIdx(expanded ? -1 : idx)}
                >
                  <div className="items-card-title-wrap">
                    <span className="items-card-primary">{label}</span>
                    {subtitle && <span className="items-card-secondary">{subtitle}</span>}
                  </div>
                  <div className="items-card-meta-wrap">
                    {period && <span className="items-card-period">{period}</span>}
                    <span className="toggle-badge">{expanded ? 'Done' : 'Edit'}</span>
                  </div>
                </button>

                <div className="reorder-tools">
                  <button
                    type="button"
                    className="btn-icon-reorder"
                    onClick={() => moveItem(idx, -1)}
                    disabled={idx === 0}
                    aria-label="Move entry up"
                    title="Move up"
                  >
                    <ChevronUpIcon size={13} />
                  </button>
                  <button
                    type="button"
                    className="btn-icon-reorder"
                    onClick={() => moveItem(idx, 1)}
                    disabled={idx === items.length - 1}
                    aria-label="Move entry down"
                    title="Move down"
                  >
                    <ChevronDownIcon size={13} />
                  </button>
                  <button
                    type="button"
                    className="btn-icon-delete"
                    onClick={() => removeItem(idx)}
                    aria-label="Delete entry"
                    title="Remove entry"
                  >
                    <XIcon size={13} />
                  </button>
                </div>
              </div>

              {expanded && (
                <fieldset className="items-fieldset">
                  <legend className="sr-only">
                    {title} — entry {idx + 1} of {items.length}
                  </legend>

                  <div className="item-grid-dynamic">
                    {fields.map((f) => {
                      const baseId = `${reactId}-${section.key}-${idx}-${f.key}`;
                      const hintId = f.hint ? `${baseId}-hint` : undefined;
                      const describedBy = [hintId].filter(Boolean).join(' ') || undefined;
                      const isOptional = f.optional !== false && !f.required;

                      if (f.type === 'textarea') {
                        return (
                          <div key={f.key} className="field block">
                            <div className="field-label-wrap">
                              <label className="field-label" htmlFor={baseId}>
                                {f.label}
                              </label>
                              <span className="field-badge field-optional-badge">Optional</span>
                            </div>

                            {isExperience && (
                              <div className="action-verbs-bar">
                                <span className="action-verbs-label">Action verbs:</span>
                                {ACTION_VERBS.slice(0, 6).map((verb) => (
                                  <button
                                    key={verb}
                                    type="button"
                                    className="verb-chip"
                                    onClick={() => {
                                      const current = item[f.key] || '';
                                      const prefix = current.length > 0 && !current.endsWith('\n') ? '\n' : '';
                                      updateItem(idx, { [f.key]: `${current}${prefix}${verb} ` });
                                    }}
                                  >
                                    + {verb}
                                  </button>
                                ))}
                              </div>
                            )}

                            <textarea
                              id={baseId}
                              className="textarea mini"
                              rows={3}
                              aria-describedby={describedBy}
                              placeholder={f.placeholder}
                              value={item[f.key] || ''}
                              onChange={(e) => updateItem(idx, { [f.key]: e.target.value })}
                            />
                            {f.hint ? (
                              <span id={hintId} className="field-hint">
                                {f.hint}
                              </span>
                            ) : null}
                          </div>
                        );
                      }

                      return (
                        <div key={f.key} className="field">
                          <div className="field-label-wrap">
                            <label className="field-label" htmlFor={baseId}>
                              {f.label}
                            </label>
                            {isOptional ? (
                              <span className="field-badge field-optional-badge">Optional</span>
                            ) : (
                              <span className="field-badge field-required-badge">Required</span>
                            )}
                          </div>

                          {f.key === 'period' && (
                            <div className="period-quick-helpers">
                              <button
                                type="button"
                                className="period-chip"
                                onClick={() => {
                                  const yr = new Date().getFullYear();
                                  updateItem(idx, { [f.key]: `${yr - 1} – Present` });
                                }}
                              >
                                {new Date().getFullYear() - 1} – Present
                              </button>
                              <button
                                type="button"
                                className="period-chip"
                                onClick={() => {
                                  const yr = new Date().getFullYear();
                                  updateItem(idx, { [f.key]: `${yr - 2} – ${yr}` });
                                }}
                              >
                                {new Date().getFullYear() - 2} – {new Date().getFullYear()}
                              </button>
                            </div>
                          )}

                          {f.suggestions?.length ? (
                            <AutocompleteInput
                              id={baseId}
                              value={item[f.key] || ''}
                              onChange={(v) => updateItem(idx, { [f.key]: v })}
                              suggestions={f.suggestions}
                              placeholder={f.placeholder}
                            />
                          ) : (
                            <input
                              id={baseId}
                              className="input"
                              type={f.inputType || 'text'}
                              aria-describedby={describedBy}
                              placeholder={f.placeholder}
                              autoComplete="off"
                              value={item[f.key] || ''}
                              onChange={(e) => updateItem(idx, { [f.key]: e.target.value })}
                            />
                          )}
                          {f.hint ? (
                            <span id={hintId} className="field-hint">
                              {f.hint}
                            </span>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>

                  <div className="items-card-footer">
                    <button
                      type="button"
                      className="btn btn-ghost tiny text-danger"
                      onClick={() => removeItem(idx)}
                    >
                      Delete this entry
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary tiny"
                      onClick={() => setOpenIdx(-1)}
                    >
                      Done editing
                    </button>
                  </div>
                </fieldset>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
