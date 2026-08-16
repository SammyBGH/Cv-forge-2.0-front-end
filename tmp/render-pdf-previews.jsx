import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { writeFile, mkdir } from 'node:fs/promises';
import { CVPdfDocument } from '../src/components/pdf/CVPdfDocument.jsx';

const sections = [
  { key: 'personal', type: 'personal', order: 0, data: { fullName: 'Amara Mensah', headline: 'Product designer focused on useful, inclusive digital experiences', email: 'amara.mensah@example.com', phone: '+233 24 555 0198', location: 'Accra, Ghana', website: 'amaramensah.design', linkedin: 'linkedin.com/in/amaramensah' } },
  { key: 'summary', type: 'summary', order: 1, data: { html: 'Product designer with five years of experience turning complex services into clear, accessible digital products. Comfortable leading discovery, creating systems, and partnering closely with engineering teams.' } },
  { key: 'experience', type: 'experience', order: 2, data: { items: [{ role: 'Senior Product Designer', company: 'Northstar Health', period: '2022 - Present', bullets: 'Led the redesign of appointment booking across web and mobile.\nBuilt a reusable component library with engineering.\nImproved successful self-service bookings by 24%.' }, { role: 'Product Designer', company: 'Studio A', period: '2019 - 2022', bullets: 'Designed digital tools for financial-services and education clients.\nFacilitated research sessions and translated findings into product decisions.' }] } },
  { key: 'education', type: 'education', order: 3, data: { items: [{ school: 'Kwame Nkrumah University of Science and Technology', degreeType: 'BFA', program: 'Communication Design', period: '2015 - 2019', detail: 'First Class Honours' }] } },
  { key: 'skills', type: 'skills', order: 4, data: { items: [{ name: 'Product strategy', level: 'Advanced' }, { name: 'Interface design', level: 'Advanced' }, { name: 'Design systems', level: 'Advanced' }, { name: 'User research', level: 'Proficient' }] } },
  { key: 'projects', type: 'projects', order: 5, data: { items: [{ name: 'Community health portal', stack: 'Figma, research, prototyping', link: 'portfolio.example.com/health', detail: 'A service prototype that helped patients prepare for care before their first visit.' }] } },
];

async function main() {
  await mkdir('tmp/pdfs', { recursive: true });
  for (const [templateId, themeId] of [['modern-split', 'light'], ['minimal', 'paper'], ['accent-header', 'slate']]) {
    const cv = { title: `Amara Mensah - ${templateId}`, templateId, themeId, layoutId: 'two-column', sections };
    const buffer = await pdf(React.createElement(CVPdfDocument, { cv })).toBuffer();
    await writeFile(`tmp/pdfs/${templateId}.pdf`, buffer);
  }
}

main();
