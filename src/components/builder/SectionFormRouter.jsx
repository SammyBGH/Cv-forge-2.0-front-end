import PersonalEditor from './editors/PersonalEditor.jsx';
import SummaryEditor from './editors/SummaryEditor.jsx';
import ItemsEditor from './editors/ItemsEditor.jsx';
import {
  DEGREE_TYPE_SUGGESTIONS,
  JOB_TITLE_SUGGESTIONS,
  PROGRAM_FIELD_SUGGESTIONS,
  PROJECT_TOOLS_SUGGESTIONS,
  SKILL_LEVEL_SUGGESTIONS,
  recentYears,
} from '../../data/cvFieldOptions.js';

export default function SectionFormRouter({ section, cv }) {
  switch (section.type) {
    case 'personal':
      return <PersonalEditor section={section} cv={cv} />;
    case 'summary':
      return <SummaryEditor section={section} cv={cv} />;
    case 'experience':
      return (
        <ItemsEditor
          section={section}
          title="Work experience"
          titleHint="Paid work, internships, apprenticeships, or strong volunteer roles — whatever fits your story."
          fields={[
            {
              key: 'role',
              label: 'Job title or role',
              suggestions: JOB_TITLE_SUGGESTIONS,
              hint: 'Pick a suggestion or write your exact title.',
              placeholder: 'e.g. Sales associate',
            },
            {
              key: 'company',
              label: 'Employer or organization',
              hint: 'Company, school department, nonprofit, or family business.',
              placeholder: 'Where you worked',
            },
            {
              key: 'period',
              label: 'Dates',
              hint: 'Use any format you like — months and years work well.',
              placeholder: 'e.g. June 2023 – August 2024',
            },
            {
              key: 'bullets',
              label: 'What you did and achieved',
              type: 'textarea',
              hint: 'One idea per line: results, responsibilities, or skills you used on the job.',
              placeholder: 'Helped customers find products…\nBalanced cash drawer daily…',
            },
          ]}
        />
      );
    case 'education':
      return (
        <ItemsEditor
          section={section}
          title="Education"
          titleHint="Schools, courses, or training that support your next step."
          fields={[
            {
              key: 'school',
              label: 'School or provider',
              placeholder: 'University, college, online school…',
            },
            {
              key: 'degreeType',
              label: 'Type of qualification',
              suggestions: DEGREE_TYPE_SUGGESTIONS,
              hint: 'Examples: BSc, MSc, BTech — pick one or type your own.',
              placeholder: 'e.g. BSc',
            },
            {
              key: 'program',
              label: 'Program or field of study',
              suggestions: PROGRAM_FIELD_SUGGESTIONS,
              hint: 'What you studied — use quick pick, suggestions while typing, or your own words.',
              placeholder: 'e.g. Electrical Engineering',
            },
            {
              key: 'period',
              label: 'Dates',
              placeholder: 'e.g. 2021 – 2025',
              hint: 'Expected graduation is fine if you are still studying.',
            },
            {
              key: 'detail',
              label: 'Honors, focus, or coursework',
              type: 'textarea',
              hint: 'Optional: GPA if helpful, relevant modules, awards, thesis topic.',
              placeholder: 'Dean’s list, relevant courses, dissertation…',
            },
          ]}
        />
      );
    case 'skills':
      return (
        <ItemsEditor
          section={section}
          title="Skills"
          titleHint="Languages, tools, caregiving skills, lab techniques — anything that fits the roles you want."
          fields={[
            {
              key: 'name',
              label: 'Skill',
              hint: 'Name one skill per row (typing, budgeting, Python, first aid…).',
              placeholder: 'e.g. Budget planning',
            },
            {
              key: 'level',
              label: 'Comfort level',
              suggestions: SKILL_LEVEL_SUGGESTIONS,
              hint: 'Pick a level or describe it your way.',
              placeholder: 'e.g. Proficient',
            },
          ]}
        />
      );
    case 'projects':
      return (
        <ItemsEditor
          section={section}
          title="Projects & highlights"
          titleHint="Class projects, volunteer builds, personal goals, research, or portfolio pieces."
          fields={[
            {
              key: 'name',
              label: 'Title',
              placeholder: 'Short name people will recognize',
            },
            {
              key: 'stack',
              label: 'Tools, equipment, or methods',
              suggestions: PROJECT_TOOLS_SUGGESTIONS,
              hint: 'Software, machines, techniques, or materials — suggestions are examples only.',
              placeholder: 'What you used or how you worked',
            },
            {
              key: 'link',
              label: 'Link',
              hint: 'Website, portfolio, video, or article — optional.',
              placeholder: 'https://…',
            },
            {
              key: 'detail',
              label: 'What you did',
              type: 'textarea',
              hint: 'Your role, outcome, or what someone should know.',
              placeholder: 'Describe the project and your contribution…',
            },
          ]}
        />
      );
    case 'certifications':
      return (
        <ItemsEditor
          section={section}
          title="Certificates & licenses"
          titleHint="Professional licenses, safety cards, software certs, or exams you passed."
          fields={[
            {
              key: 'name',
              label: 'Name',
              placeholder: 'e.g. First Aid / CPR',
            },
            {
              key: 'issuer',
              label: 'Issued by',
              placeholder: 'Organization or board',
            },
            {
              key: 'year',
              label: 'Year',
              suggestions: recentYears(50),
              hint: 'Pick a year or type your own (e.g. valid-until date).',
              placeholder: new Date().getFullYear().toString(),
            },
          ]}
        />
      );
    default:
      return (
        <div className="muted small">
          This section type is not editable in the form yet. Your content is still saved.
        </div>
      );
  }
}
