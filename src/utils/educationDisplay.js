/**
 * Display line for education credential (new degreeType + program, or legacy degree).
 */
export function formatEducationCredential(item) {
  if (!item || typeof item !== 'object') return '';
  const type = String(item.degreeType || '').trim();
  const prog = String(item.program || '').trim();
  const legacy = String(item.degree || '').trim();

  if (type && prog) return `${type} — ${prog}`;
  if (type) return type;
  if (prog) return prog;
  return legacy;
}
