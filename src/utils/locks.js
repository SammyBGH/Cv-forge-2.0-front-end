export function isFieldLocked(cv, sectionKey, field) {
  const path = `sections.${sectionKey}.data.${field}`;
  const locks = cv?.lockedFields || [];
  return locks.includes(path);
}
