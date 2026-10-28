/**
 * Shared template / theme / layout resolution for live preview and PDF export.
 */

export const TEMPLATES = [
  { id: 'modern-split', label: 'Modern Split', description: 'Contemporary split layout with dedicated sidebar' },
  { id: 'minimal', label: 'Classic Minimal', description: 'Understated elegance with high readability' },
  { id: 'accent-header', label: 'Executive Header', description: 'Distinguished header banner with structured grid' },
];

export const THEMES = [
  {
    id: 'light',
    label: 'Clean Slate',
    swatch: '#254f6d',
    bg: '#ffffff',
    paper: '#ffffff',
    description: 'Crisp, contemporary white paper with slate-blue accents',
  },
  {
    id: 'slate',
    label: 'Executive Slate',
    swatch: '#3d7a8c',
    bg: '#1e2d3a',
    paper: '#f8fafc',
    description: 'Deep navy/slate contrast with teal accents',
  },
  {
    id: 'paper',
    label: 'Warm Editorial',
    swatch: '#8a4f2c',
    bg: '#fffaf2',
    paper: '#fffaf2',
    description: 'Ivory parchment tone with warm serif typography',
  },
];

export const LAYOUTS = [
  { id: 'two-column', label: 'Two Column', description: 'Sidebar for contact & skills, main for work history' },
  { id: 'single', label: 'Single Column', description: 'Direct top-to-bottom narrative flow' },
];

/** Schema default that previously overrode theme accent. */
const LEGACY_DEFAULT_ACCENT = '#2563eb';

const PALETTES = {
  light: {
    ink: '#111827',
    muted: '#4b5563',
    paper: '#ffffff',
    surface: '#f1f5f9',
    accent: '#254f6d',
    rule: '#cbd5e1',
    headingTone: 'accent',
    typeScale: 'sans',
  },
  slate: {
    ink: '#0f172a',
    muted: '#475569',
    paper: '#f8fafc',
    surface: '#1e2d3a',
    accent: '#3d7a8c',
    rule: '#334155',
    headingTone: 'ink',
    typeScale: 'sans-tight',
  },
  paper: {
    ink: '#2a241c',
    muted: '#665c50',
    paper: '#fffaf2',
    surface: '#f4e9da',
    accent: '#8a4f2c',
    rule: '#ded1bf',
    headingTone: 'accent',
    typeScale: 'serif',
  },
};

export const DEFAULT_SECTION_TITLES = {
  summary: 'Profile',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certificates',
  languages: 'Languages',
  custom: 'Additional',
};

export function resolveTemplateId(cv) {
  const id = cv?.templateId;
  if (id === 'minimal' || id === 'accent-header' || id === 'modern-split') return id;
  return 'modern-split';
}

export function resolveThemeId(cv) {
  const id = cv?.themeId;
  if (id === 'slate' || id === 'paper' || id === 'light') return id;
  return 'light';
}

export function resolveLayoutId(cv) {
  return cv?.layoutId === 'single' ? 'single' : 'two-column';
}

export function isCustomAccent(value, themeAccent) {
  if (!value || typeof value !== 'string') return false;
  if (!/^#[0-9a-f]{6}$/i.test(value)) return false;
  const hex = value.toLowerCase();
  if (hex === LEGACY_DEFAULT_ACCENT) return false;
  if (themeAccent && hex === themeAccent.toLowerCase()) return false;
  return true;
}

export function paletteFor(cv) {
  const themeId = resolveThemeId(cv);
  const base = PALETTES[themeId] || PALETTES.light;
  const custom = cv?.customization?.accentColor;
  const accent = isCustomAccent(custom, base.accent) ? custom : base.accent;
  return { ...base, accent, themeId };
}

export function sectionHeading(section) {
  const override = String(section?.data?.heading || '').trim();
  if (override) return override;
  return DEFAULT_SECTION_TITLES[section?.type] || 'Section';
}

export function densityFor(cv) {
  const d = cv?.customization?.density;
  if (d === 'compact' || d === 'spacious') return d;
  return resolveLayoutId(cv) === 'single' ? 'comfortable' : 'compact';
}

export const LANGUAGE_NAMES = {
  en: 'English',
  fr: 'French',
  es: 'Spanish',
  de: 'German',
  pt: 'Portuguese',
  ar: 'Arabic',
  zh: 'Chinese',
  tw: 'Twi',
  ha: 'Hausa',
  it: 'Italian',
  nl: 'Dutch',
  ja: 'Japanese',
};

export function languageLabel(code) {
  const raw = String(code || '').trim().toLowerCase();
  if (!raw) return '';
  return LANGUAGE_NAMES[raw] || raw.toUpperCase();
}

