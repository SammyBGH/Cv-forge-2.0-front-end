import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { sectionByType, sortedSections } from '../preview/cvSelectors.js';
import { formatEducationCredential } from '../../utils/educationDisplay.js';

const styles = StyleSheet.create({
  page: { padding: 36, fontSize: 10, fontFamily: 'Helvetica' },
  row: { flexDirection: 'row' },
  sidebar: { width: '32%', paddingRight: 14, borderRightWidth: 1, borderRightColor: '#e2e8f0' },
  main: { flex: 1 },
  name: { fontSize: 18, marginBottom: 4, fontFamily: 'Helvetica-Bold' },
  headline: { fontSize: 10, color: '#64748b', marginBottom: 10 },
  muted: { color: '#64748b', marginBottom: 2 },
  h2: { fontSize: 12, marginTop: 10, marginBottom: 6, fontFamily: 'Helvetica-Bold', color: '#2563eb' },
  p: { marginBottom: 4, color: '#334155', lineHeight: 1.35 },
  itemTitle: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  bold: { fontFamily: 'Helvetica-Bold' },
  bullets: { marginTop: 2, color: '#475569' },
});

export function CVPdfDocument({ cv }) {
  const personal = sectionByType(cv, 'personal')?.data || {};
  const blocks = sortedSections(cv).filter((s) => s.type !== 'personal');

  return (
    <Document title={cv.title || 'CV'}>
      <Page size="A4" style={styles.page}>
        <View style={styles.row}>
          <View style={styles.sidebar}>
            <Text style={styles.name}>{personal.fullName || 'Your name'}</Text>
            <Text style={styles.headline}>{personal.headline || ''}</Text>
            {personal.email ? <Text style={styles.muted}>{personal.email}</Text> : null}
            {personal.phone ? <Text style={styles.muted}>{personal.phone}</Text> : null}
            {personal.location ? <Text style={styles.muted}>{personal.location}</Text> : null}
            {personal.website ? <Text style={styles.muted}>{personal.website}</Text> : null}
            {personal.linkedin ? <Text style={styles.muted}>{personal.linkedin}</Text> : null}
          </View>

          <View style={styles.main}>
            {blocks.map((s) => (
              <PdfBlock key={s.key} section={s} />
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}

function PdfBlock({ section }) {
  switch (section.type) {
    case 'summary':
      return (
        <View>
          <Text style={styles.h2}>Summary</Text>
          <Text style={styles.p}>{section.data?.html || ''}</Text>
        </View>
      );
    case 'experience': {
      const items = section.data?.items || [];
      return (
        <View>
          <Text style={styles.h2}>Experience</Text>
          {items.map((it, i) => (
            <View key={i} wrap={false}>
              <View style={styles.itemTitle}>
                <Text style={styles.bold}>{it.role}</Text>
                <Text style={styles.muted}>{it.period}</Text>
              </View>
              <Text style={styles.muted}>{it.company}</Text>
              <Text style={styles.bullets}>{it.bullets}</Text>
            </View>
          ))}
        </View>
      );
    }
    case 'education': {
      const items = section.data?.items || [];
      return (
        <View>
          <Text style={styles.h2}>Education</Text>
          {items.map((it, i) => (
            <View key={i} wrap={false}>
              <View style={styles.itemTitle}>
                <Text style={styles.bold}>{it.school}</Text>
                <Text style={styles.muted}>{it.period}</Text>
              </View>
              <Text style={styles.muted}>{formatEducationCredential(it)}</Text>
              <Text style={styles.p}>{it.detail}</Text>
            </View>
          ))}
        </View>
      );
    }
    case 'skills': {
      const items = section.data?.items || [];
      if (!items.length) return null;
      return (
        <View>
          <Text style={styles.h2}>Skills</Text>
          {items.map((it, i) => (
            <Text key={i} style={styles.p}>
              • {it.name}
              {it.level ? ` (${it.level})` : ''}
            </Text>
          ))}
        </View>
      );
    }
    case 'projects': {
      const items = section.data?.items || [];
      return (
        <View>
          <Text style={styles.h2}>Projects & highlights</Text>
          {items.map((it, i) => (
            <View key={i} wrap={false}>
              <View style={styles.itemTitle}>
                <Text style={styles.bold}>{it.name}</Text>
              </View>
              {it.stack ? (
                <Text style={styles.p}>
                  Tools & methods: {it.stack}
                </Text>
              ) : null}
              {it.link ? <Text style={styles.muted}>{it.link}</Text> : null}
              <Text style={styles.p}>{it.detail}</Text>
            </View>
          ))}
        </View>
      );
    }
    case 'certifications': {
      const items = section.data?.items || [];
      return (
        <View>
          <Text style={styles.h2}>Certificates & licenses</Text>
          {items.map((it, i) => (
            <View key={i} wrap={false}>
              <View style={styles.itemTitle}>
                <Text style={styles.bold}>{it.name}</Text>
                <Text style={styles.muted}>{it.year}</Text>
              </View>
              <Text style={styles.muted}>{it.issuer}</Text>
            </View>
          ))}
        </View>
      );
    }
    default:
      return null;
  }
}
