import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { sectionByType, sortedSections } from '../preview/cvSelectors.js';
import { formatEducationCredential } from '../../utils/educationDisplay.js';
import {
  paletteFor,
  resolveLayoutId,
  resolveTemplateId,
  sectionHeading,
} from '../../utils/cvDesign.js';

const SIDE_TYPES = new Set(['skills', 'languages', 'certifications']);

function createStyles(palette, layout) {
  const single = layout === 'single';
  const serif = palette.typeScale === 'serif';
  const nameFont = serif ? 'Times-Bold' : 'Helvetica-Bold';
  const bodyFont = serif ? 'Times-Roman' : 'Helvetica';
  const bodyBold = serif ? 'Times-Bold' : 'Helvetica-Bold';
  const pagePad = single ? 44 : 36;
  const isSlate = palette.themeId === 'slate';
  const isPaper = palette.themeId === 'paper';

  return StyleSheet.create({
    page: {
      backgroundColor: palette.paper,
      padding: pagePad,
      fontFamily: bodyFont,
      fontSize: 9.2,
      color: palette.ink,
      lineHeight: 1.42,
    },
    splitPage: { padding: 0, backgroundColor: palette.paper },
    row: { flexDirection: 'row' },
    splitSide: {
      width: '32%',
      backgroundColor: isSlate ? '#1E2D3A' : palette.surface,
      paddingTop: 44,
      paddingHorizontal: 24,
      paddingBottom: 36,
      minHeight: 841,
    },
    splitMain: {
      width: '68%',
      paddingTop: 44,
      paddingHorizontal: 32,
      paddingBottom: 36,
    },
    name: {
      fontFamily: nameFont,
      fontSize: 25,
      lineHeight: 1.05,
      color: palette.ink,
    },
    sideName: {
      fontFamily: nameFont,
      fontSize: 22,
      lineHeight: 1.08,
      color: isSlate ? '#F8FAFC' : palette.ink,
    },
    headline: {
      marginTop: 7,
      color: palette.muted,
      fontSize: 10.2,
      lineHeight: 1.32,
    },
    sideHeadline: {
      marginTop: 7,
      color: isSlate ? '#94A3B8' : palette.muted,
      fontSize: 9.8,
      lineHeight: 1.32,
    },
    contact: {
      marginTop: 20,
      color: palette.muted,
      fontSize: 8.4,
      lineHeight: 1.45,
    },
    sideContact: {
      marginTop: 20,
      color: isSlate ? '#94A3B8' : palette.muted,
      fontSize: 8.4,
      lineHeight: 1.45,
    },
    contactLine: { marginBottom: 3.5 },
    contactRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 10,
      marginBottom: 16,
    },
    contactChip: {
      color: palette.muted,
      fontSize: 8.2,
      marginRight: 10,
      marginBottom: 3,
    },
    stackHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingBottom: 14,
      marginBottom: 18,
      borderBottomWidth: 1.8,
      borderBottomColor: palette.accent,
    },
    sideRule: {
      width: 28,
      height: 2.5,
      marginTop: 18,
      backgroundColor: palette.accent,
    },
    sideSectionsWrap: {
      marginTop: 22,
    },
    block: {
      marginBottom: 18,
    },
    sidebarBlock: {
      marginBottom: 16,
    },
    sectionTitle: {
      marginBottom: 8,
      paddingBottom: 5,
      borderBottomWidth: isPaper ? 1.5 : 0.8,
      borderBottomColor: palette.accent,
      color: palette.accent,
      fontFamily: bodyBold,
      fontSize: 8.2,
      letterSpacing: isSlate ? 1.5 : 1.2,
      textTransform: 'uppercase',
    },
    sidebarSectionTitle: {
      color: isSlate ? '#38BDF8' : palette.accent,
      borderBottomColor: isSlate ? '#334155' : palette.rule,
    },
    prose: {
      color: palette.muted,
      lineHeight: 1.52,
    },
    item: {
      marginBottom: 11,
    },
    itemHead: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
    },
    itemName: {
      fontFamily: bodyBold,
      color: palette.ink,
      fontSize: 9.3,
    },
    sideItemName: {
      color: isSlate ? '#F1F5F9' : palette.ink,
    },
    itemDate: {
      color: palette.muted,
      fontSize: 8,
      textAlign: 'right',
    },
    itemSub: {
      marginTop: 2,
      color: palette.muted,
      fontFamily: bodyBold,
      fontSize: 8.5,
    },
    itemDetail: {
      marginTop: 3.5,
      color: palette.muted,
      fontSize: 8.6,
      lineHeight: 1.48,
    },
    skills: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      columnGap: 12,
      rowGap: 5,
    },
    skillsSidebar: {
      flexDirection: 'column',
      rowGap: 5,
    },
    skill: {
      width: '46%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 3.5,
      borderBottomWidth: 0.5,
      borderBottomColor: palette.rule,
    },
    skillSidebar: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 3.5,
      borderBottomWidth: 0.5,
      borderBottomColor: isSlate ? '#334155' : palette.rule,
    },
    skillName: {
      fontFamily: bodyBold,
      fontSize: 8.6,
      color: palette.ink,
    },
    sideSkillName: {
      color: isSlate ? '#E2E8F0' : palette.ink,
    },
    skillLevel: {
      color: isSlate ? '#94A3B8' : palette.muted,
      fontSize: 7.4,
    },
    minimalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingBottom: 16,
      borderBottomWidth: 1.8,
      borderBottomColor: palette.accent,
    },
    minimalContact: {
      width: 190,
      color: palette.muted,
      fontSize: 7.8,
      lineHeight: 1.4,
      textAlign: 'right',
    },
    minimalMain: { paddingTop: 24 },
    minimalBody: { flexDirection: 'row', paddingTop: 20, gap: 18 },
    minimalCol: { width: '64%' },
    minimalSide: { width: '36%', paddingLeft: 10 },
    minimalTitle: {
      color: palette.accent,
      borderBottomWidth: 0,
      paddingBottom: 0,
      marginBottom: 7,
    },
    executivePage: { padding: 0, backgroundColor: palette.paper },
    executiveHeader: {
      paddingTop: 38,
      paddingHorizontal: 40,
      paddingBottom: 30,
      backgroundColor: isSlate ? '#0F172A' : palette.surface,
      borderBottomWidth: 2.5,
      borderBottomColor: palette.accent,
    },
    executiveName: {
      color: isSlate ? '#FFFFFF' : palette.ink,
      fontFamily: nameFont,
      fontSize: 27,
      lineHeight: 1.05,
    },
    executiveHeadline: {
      marginTop: 7,
      color: isSlate ? '#94A3B8' : palette.muted,
      fontSize: 10,
    },
    executiveBody: { flexDirection: 'row' },
    executiveSide: {
      width: '28%',
      paddingTop: 28,
      paddingHorizontal: 20,
      paddingBottom: 28,
      backgroundColor: isSlate ? '#1E2D3A' : palette.surface,
    },
    executiveMain: {
      width: '72%',
      paddingTop: 28,
      paddingHorizontal: 32,
      paddingBottom: 34,
    },
    executiveStack: { paddingTop: 22, paddingHorizontal: 40, paddingBottom: 34 },
    executiveTitle: { color: palette.accent, borderBottomColor: palette.accent },
  });
}

function Contacts({ personal, styles, style, inline = false }) {
  const items = [
    personal.email,
    personal.phone,
    personal.location,
    personal.website,
    personal.linkedin,
  ].filter(Boolean);

  if (!items.length) return null;

  if (inline) {
    return (
      <View style={styles.contactRow}>
        {items.map((item) => (
          <Text key={item} style={styles.contactChip}>
            {item}
          </Text>
        ))}
      </View>
    );
  }

  return (
    <View style={style || styles.contact}>
      {items.map((item) => (
        <Text key={item} style={styles.contactLine}>
          {item}
        </Text>
      ))}
    </View>
  );
}

export function CVPdfDocument({ cv }) {
  const personal = sectionByType(cv, 'personal')?.data || {};
  const blocks = sortedSections(cv).filter((section) => section.type !== 'personal');
  const palette = paletteFor(cv);
  const layout = resolveLayoutId(cv);
  const styles = createStyles(palette, layout);
  const template = resolveTemplateId(cv);

  if (template === 'minimal') {
    return <MinimalPdf cv={cv} personal={personal} blocks={blocks} styles={styles} layout={layout} />;
  }
  if (template === 'accent-header') {
    return <ExecutivePdf cv={cv} personal={personal} blocks={blocks} styles={styles} layout={layout} />;
  }
  return <SplitPdf cv={cv} personal={personal} blocks={blocks} styles={styles} layout={layout} />;
}

function SplitPdf({ cv, personal, blocks, styles, layout }) {
  if (layout === 'single') {
    return (
      <Document title={cv.title || 'CV'}>
        <Page size="A4" wrap style={styles.page}>
          <View style={styles.stackHeader}>
            <View>
              <Text style={styles.name}>{personal.fullName || 'Your name'}</Text>
              <Text style={styles.headline}>{personal.headline || 'Professional headline'}</Text>
            </View>
            <Contacts personal={personal} styles={styles} style={styles.minimalContact} />
          </View>
          <PdfSections blocks={blocks} styles={styles} />
        </Page>
      </Document>
    );
  }

  const side = blocks.filter((s) => SIDE_TYPES.has(s.type));
  const main = blocks.filter((s) => !SIDE_TYPES.has(s.type));

  return (
    <Document title={cv.title || 'CV'}>
      <Page size="A4" wrap style={[styles.page, styles.splitPage]}>
        <View style={styles.row}>
          <View style={styles.splitSide} fixed>
            <Text style={styles.sideName}>{personal.fullName || 'Your name'}</Text>
            <Text style={styles.sideHeadline}>{personal.headline || 'Professional headline'}</Text>
            <View style={styles.sideRule} />
            <Contacts personal={personal} styles={styles} style={styles.sideContact} />
            {side.length > 0 && (
              <View style={styles.sideSectionsWrap}>
                <PdfSections blocks={side} styles={styles} isSidebar />
              </View>
            )}
          </View>
          <View style={styles.splitMain}>
            <PdfSections blocks={main} styles={styles} />
          </View>
        </View>
      </Page>
    </Document>
  );
}

function MinimalPdf({ cv, personal, blocks, styles, layout }) {
  if (layout === 'two-column') {
    const side = blocks.filter((s) => SIDE_TYPES.has(s.type));
    const main = blocks.filter((s) => !SIDE_TYPES.has(s.type));

    return (
      <Document title={cv.title || 'CV'}>
        <Page size="A4" wrap style={styles.page}>
          <View style={styles.minimalHeader}>
            <View>
              <Text style={styles.name}>{personal.fullName || 'Your name'}</Text>
              <Text style={styles.headline}>{personal.headline || 'Professional headline'}</Text>
            </View>
            <Contacts personal={personal} styles={styles} style={styles.minimalContact} />
          </View>
          <View style={styles.minimalBody}>
            <View style={styles.minimalCol}>
              <PdfSections blocks={main} styles={styles} minimal />
            </View>
            <View style={styles.minimalSide}>
              <PdfSections blocks={side} styles={styles} minimal isSidebar />
            </View>
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <Document title={cv.title || 'CV'}>
      <Page size="A4" wrap style={styles.page}>
        <View style={styles.minimalHeader}>
          <View>
            <Text style={styles.name}>{personal.fullName || 'Your name'}</Text>
            <Text style={styles.headline}>{personal.headline || 'Professional headline'}</Text>
          </View>
          <Contacts personal={personal} styles={styles} style={styles.minimalContact} />
        </View>
        <View style={styles.minimalMain}>
          <PdfSections blocks={blocks} styles={styles} minimal />
        </View>
      </Page>
    </Document>
  );
}

function ExecutivePdf({ cv, personal, blocks, styles, layout }) {
  if (layout === 'single') {
    return (
      <Document title={cv.title || 'CV'}>
        <Page size="A4" wrap style={[styles.page, styles.executivePage]}>
          <View style={styles.executiveHeader}>
            <Text style={styles.executiveName}>{personal.fullName || 'Your name'}</Text>
            <Text style={styles.executiveHeadline}>{personal.headline || 'Professional headline'}</Text>
          </View>
          <View style={styles.executiveStack}>
            <Contacts personal={personal} styles={styles} inline />
            <PdfSections blocks={blocks} styles={styles} executive />
          </View>
        </Page>
      </Document>
    );
  }

  const side = blocks.filter((s) => SIDE_TYPES.has(s.type));
  const main = blocks.filter((s) => !SIDE_TYPES.has(s.type));

  return (
    <Document title={cv.title || 'CV'}>
      <Page size="A4" wrap style={[styles.page, styles.executivePage]}>
        <View style={styles.executiveHeader} fixed>
          <Text style={styles.executiveName}>{personal.fullName || 'Your name'}</Text>
          <Text style={styles.executiveHeadline}>{personal.headline || 'Professional headline'}</Text>
        </View>
        <View style={styles.executiveBody}>
          <View style={styles.executiveSide} fixed>
            <Contacts personal={personal} styles={styles} style={styles.sideContact} />
            <View style={styles.sideRule} />
            {side.length > 0 && (
              <View style={styles.sideSectionsWrap}>
                <PdfSections blocks={side} styles={styles} executive isSidebar />
              </View>
            )}
          </View>
          <View style={styles.executiveMain}>
            <PdfSections blocks={main} styles={styles} executive />
          </View>
        </View>
      </Page>
    </Document>
  );
}

function PdfSections({ blocks, styles, minimal = false, executive = false, isSidebar = false }) {
  return blocks.map((section) => (
    <PdfBlock
      key={section.key}
      section={section}
      styles={styles}
      minimal={minimal}
      executive={executive}
      isSidebar={isSidebar}
    />
  ));
}

function PdfBlock({ section, styles, minimal, executive, isSidebar }) {
  const items = section.data?.items || [];
  const title = sectionHeading(section);
  if (!title || (section.type !== 'summary' && !items.length)) return null;

  const titleStyle = [
    styles.sectionTitle,
    minimal && styles.minimalTitle,
    executive && styles.executiveTitle,
    isSidebar && styles.sidebarSectionTitle,
  ].filter(Boolean);

  const blockStyle = isSidebar ? styles.sidebarBlock : styles.block;

  return (
    <View style={blockStyle} wrap>
      <Text style={titleStyle}>{title}</Text>
      {section.type === 'summary' ? (
        <Text style={styles.prose}>{section.data?.html || 'Add a short professional summary.'}</Text>
      ) : null}
      {section.type === 'skills' || section.type === 'languages' ? (
        <View style={isSidebar ? styles.skillsSidebar : styles.skills}>
          {items.map((item, i) => (
            <View style={isSidebar ? styles.skillSidebar : styles.skill} key={i}>
              <Text style={[styles.skillName, isSidebar && styles.sideSkillName]}>
                {item.name || (section.type === 'languages' ? 'Language' : 'Skill')}
              </Text>
              {item.level ? <Text style={styles.skillLevel}>{item.level}</Text> : null}
            </View>
          ))}
        </View>
      ) : null}
      {['experience', 'education', 'projects', 'certifications'].includes(section.type)
        ? items.map((item, i) => (
            <PdfItem key={i} type={section.type} item={item} styles={styles} isSidebar={isSidebar} />
          ))
        : null}
    </View>
  );
}

function PdfItem({ type, item, styles, isSidebar }) {
  const content = {
    experience: {
      primary: item.role || 'Role',
      secondary: item.company,
      date: item.period,
      detail: item.bullets,
    },
    education: {
      primary: item.school || 'School',
      secondary: formatEducationCredential(item),
      date: item.period,
      detail: item.detail,
    },
    projects: {
      primary: item.name || 'Project',
      secondary: item.stack,
      date: item.link,
      detail: item.detail,
    },
    certifications: {
      primary: item.name || 'Certificate',
      secondary: item.issuer,
      date: item.year,
    },
  }[type];

  if (!content) return null;

  return (
    <View style={styles.item} wrap={false}>
      <View style={styles.itemHead}>
        <Text style={[styles.itemName, isSidebar && styles.sideItemName]}>{content.primary}</Text>
        {content.date ? <Text style={styles.itemDate}>{content.date}</Text> : null}
      </View>
      {content.secondary ? <Text style={styles.itemSub}>{content.secondary}</Text> : null}
      {content.detail ? <Text style={styles.itemDetail}>{content.detail}</Text> : null}
    </View>
  );
}
