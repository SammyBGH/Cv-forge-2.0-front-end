import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { sectionByType, sortedSections } from '../preview/cvSelectors.js';
import { formatEducationCredential } from '../../utils/educationDisplay.js';

function paletteFor(cv) {
  const custom = /^#[0-9a-f]{6}$/i.test(cv?.customization?.accentColor || '') ? cv.customization.accentColor : null;
  const themes = {
    slate: { ink: '#1F2937', muted: '#5D6875', surface: '#EEF2F5', accent: '#36556D' },
    paper: { ink: '#292724', muted: '#6D6861', surface: '#F4EEE5', accent: '#76513A' },
    light: { ink: '#1F2937', muted: '#667085', surface: '#F1F4F5', accent: '#254F6D' },
  };
  const base = themes[cv?.themeId] || themes.light;
  return { ...base, accent: custom || base.accent };
}

function createStyles(palette) {
  return StyleSheet.create({
    page: { backgroundColor: '#FFFFFF', padding: 38, fontFamily: 'Helvetica', fontSize: 9.3, color: palette.ink, lineHeight: 1.42 },
    splitPage: { padding: 0 },
    row: { flexDirection: 'row' },
    splitSide: { width: '31%', backgroundColor: palette.surface, paddingTop: 48, paddingHorizontal: 26 },
    splitMain: { width: '69%', paddingTop: 48, paddingHorizontal: 34, paddingBottom: 38 },
    name: { fontFamily: 'Times-Bold', fontSize: 25, lineHeight: 1.05, color: palette.ink },
    headline: { marginTop: 8, color: palette.muted, fontSize: 10.4, lineHeight: 1.34 },
    contact: { marginTop: 24, color: palette.muted, fontSize: 8.4, lineHeight: 1.48 },
    contactLine: { marginBottom: 4 },
    sideRule: { width: 30, height: 3, marginTop: 24, backgroundColor: palette.accent },
    block: { marginBottom: 23 },
    sectionTitle: { marginBottom: 9, paddingBottom: 6, borderBottomWidth: 0.7, borderBottomColor: palette.accent, color: palette.accent, fontFamily: 'Helvetica-Bold', fontSize: 8, letterSpacing: 1.25, textTransform: 'uppercase' },
    prose: { color: palette.muted, lineHeight: 1.55 },
    item: { marginBottom: 14 },
    itemHead: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
    itemName: { fontFamily: 'Helvetica-Bold', color: palette.ink, fontSize: 9.5 },
    itemDate: { color: palette.muted, fontSize: 8.2, textAlign: 'right' },
    itemSub: { marginTop: 2, color: palette.muted, fontFamily: 'Helvetica-Bold', fontSize: 8.7 },
    itemDetail: { marginTop: 4, color: palette.muted, fontSize: 8.8, lineHeight: 1.5 },
    skills: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 14, rowGap: 6 },
    skill: { width: '45%', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 4, borderBottomWidth: 0.5, borderBottomColor: '#D7DCE0' },
    skillName: { fontFamily: 'Helvetica-Bold', fontSize: 8.8 },
    skillLevel: { color: palette.muted, fontSize: 7.5 },
    minimalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 18, borderBottomWidth: 1.5, borderBottomColor: palette.ink },
    minimalContact: { width: 190, color: palette.muted, fontSize: 7.8, lineHeight: 1.42, textAlign: 'right' },
    minimalMain: { paddingTop: 28 },
    minimalTitle: { color: palette.ink, borderBottomWidth: 0, paddingBottom: 0, marginBottom: 8 },
    executivePage: { padding: 0 },
    executiveHeader: { paddingTop: 42, paddingHorizontal: 44, paddingBottom: 36, backgroundColor: palette.ink, color: '#FFFFFF' },
    executiveName: { color: '#FFFFFF', fontFamily: 'Times-Bold', fontSize: 28, lineHeight: 1.05 },
    executiveHeadline: { marginTop: 8, color: '#E7EAED', fontSize: 10.2 },
    executiveBody: { flexDirection: 'row' },
    executiveSide: { width: '25%', minHeight: 720, paddingTop: 30, paddingHorizontal: 20, backgroundColor: palette.surface },
    executiveMain: { width: '75%', paddingTop: 32, paddingHorizontal: 37, paddingBottom: 38 },
    executiveTitle: { color: palette.ink, borderBottomColor: palette.accent },
  });
}

function Contacts({ personal, styles, style }) {
  return <View style={style || styles.contact}>{[personal.email, personal.phone, personal.location, personal.website, personal.linkedin].filter(Boolean).map((item) => <Text key={item} style={styles.contactLine}>{item}</Text>)}</View>;
}

export function CVPdfDocument({ cv }) {
  const personal = sectionByType(cv, 'personal')?.data || {};
  const blocks = sortedSections(cv).filter((section) => section.type !== 'personal');
  const styles = createStyles(paletteFor(cv));
  const template = cv?.templateId || 'modern-split';

  if (template === 'minimal') return <MinimalPdf cv={cv} personal={personal} blocks={blocks} styles={styles} />;
  if (template === 'accent-header') return <ExecutivePdf cv={cv} personal={personal} blocks={blocks} styles={styles} />;
  return <SplitPdf cv={cv} personal={personal} blocks={blocks} styles={styles} />;
}

function SplitPdf({ cv, personal, blocks, styles }) {
  return <Document title={cv.title || 'CV'}><Page size="A4" style={[styles.page, styles.splitPage]}>
    <View style={styles.row}><View style={styles.splitSide}><Text style={styles.name}>{personal.fullName || 'Your name'}</Text><Text style={styles.headline}>{personal.headline || 'Professional headline'}</Text><View style={styles.sideRule} /><Contacts personal={personal} styles={styles} /></View><View style={styles.splitMain}><PdfSections blocks={blocks} styles={styles} /></View></View>
  </Page></Document>;
}

function MinimalPdf({ cv, personal, blocks, styles }) {
  return <Document title={cv.title || 'CV'}><Page size="A4" style={styles.page}>
    <View style={styles.minimalHeader}><View><Text style={styles.name}>{personal.fullName || 'Your name'}</Text><Text style={styles.headline}>{personal.headline || 'Professional headline'}</Text></View><Contacts personal={personal} styles={styles} style={styles.minimalContact} /></View>
    <View style={styles.minimalMain}><PdfSections blocks={blocks} styles={styles} minimal /></View>
  </Page></Document>;
}

function ExecutivePdf({ cv, personal, blocks, styles }) {
  return <Document title={cv.title || 'CV'}><Page size="A4" style={[styles.page, styles.executivePage]}>
    <View style={styles.executiveHeader}><Text style={styles.executiveName}>{personal.fullName || 'Your name'}</Text><Text style={styles.executiveHeadline}>{personal.headline || 'Professional headline'}</Text></View>
    <View style={styles.executiveBody}><View style={styles.executiveSide}><Contacts personal={personal} styles={styles} /><View style={styles.sideRule} /></View><View style={styles.executiveMain}><PdfSections blocks={blocks} styles={styles} executive /></View></View>
  </Page></Document>;
}

function PdfSections({ blocks, styles, minimal = false, executive = false }) {
  return blocks.map((section) => <PdfBlock key={section.key} section={section} styles={styles} minimal={minimal} executive={executive} />);
}

function PdfBlock({ section, styles, minimal, executive }) {
  const items = section.data?.items || [];
  const title = { summary: 'Profile', experience: 'Experience', education: 'Education', skills: 'Skills', projects: 'Projects', certifications: 'Certificates' }[section.type];
  if (!title || (section.type !== 'summary' && !items.length)) return null;
  const titleStyle = minimal ? [styles.sectionTitle, styles.minimalTitle] : executive ? [styles.sectionTitle, styles.executiveTitle] : styles.sectionTitle;
  return <View style={styles.block} wrap>
    <Text style={titleStyle}>{title}</Text>
    {section.type === 'summary' ? <Text style={styles.prose}>{section.data?.html || 'Add a short professional summary.'}</Text> : null}
    {section.type === 'skills' ? <View style={styles.skills}>{items.map((item, i) => <View style={styles.skill} key={i}><Text style={styles.skillName}>{item.name || 'Skill'}</Text>{item.level ? <Text style={styles.skillLevel}>{item.level}</Text> : null}</View>)}</View> : null}
    {['experience', 'education', 'projects', 'certifications'].includes(section.type) ? items.map((item, i) => <PdfItem key={i} type={section.type} item={item} styles={styles} />) : null}
  </View>;
}

function PdfItem({ type, item, styles }) {
  const content = {
    experience: { primary: item.role || 'Role', secondary: item.company, date: item.period, detail: item.bullets },
    education: { primary: item.school || 'School', secondary: formatEducationCredential(item), date: item.period, detail: item.detail },
    projects: { primary: item.name || 'Project', secondary: item.stack, date: item.link, detail: item.detail },
    certifications: { primary: item.name || 'Certificate', secondary: item.issuer, date: item.year },
  }[type];
  return <View style={styles.item} wrap={false}><View style={styles.itemHead}><Text style={styles.itemName}>{content.primary}</Text>{content.date ? <Text style={styles.itemDate}>{content.date}</Text> : null}</View>{content.secondary ? <Text style={styles.itemSub}>{content.secondary}</Text> : null}{content.detail ? <Text style={styles.itemDetail}>{content.detail}</Text> : null}</View>;
}
