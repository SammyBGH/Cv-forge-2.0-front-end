export function sectionByType(cv, type) {
  const list = cv?.sections || [];
  return list.find((s) => s.type === type && s.visible !== false);
}

export function sortedSections(cv) {
  return [...(cv?.sections || [])].filter((s) => s.visible !== false).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
