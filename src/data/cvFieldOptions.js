/**
 * Degree / qualification type (abbreviations + common labels).
 * Paired with free-text "program" or field of study in the education editor.
 */
export const DEGREE_TYPE_SUGGESTIONS = [
  'High school diploma',
  'GED',
  'Associate degree',
  'Diploma',
  'HND',
  'ND',
  'BSc',
  'BA',
  'BEng',
  'BTech',
  'BBA',
  'BEd',
  'LLB',
  'MBBS',
  'MSc',
  'MA',
  'MEng',
  'MBA',
  'MEd',
  'LLM',
  'MPhil',
  'PhD',
  'MD',
  'JD',
  'DNP',
  'Certificate',
  'Professional certification',
  'Bootcamp / intensive course',
];

/** Example fields of study — users can type anything */
export const PROGRAM_FIELD_SUGGESTIONS = [
  'Electrical Engineering',
  'Computer Science',
  'Business Administration',
  'Nursing',
  'Accounting',
  'Marketing',
  'Mechanical Engineering',
  'Education',
  'Law',
  'Medicine',
  'Psychology',
  'Economics',
  'Data Science',
  'Graphic Design',
];

/**
 * @deprecated Use DEGREE_TYPE_SUGGESTIONS + PROGRAM_FIELD_SUGGESTIONS in forms.
 * Kept for any legacy reference.
 */
export const DEGREE_SUGGESTIONS = [
  'High school diploma',
  'GED',
  'Associate degree',
  "Bachelor's degree",
  "Master's degree",
  'Doctorate (PhD)',
  'Professional degree (e.g. MD, JD)',
  'Certificate program',
  'Diploma',
  'Bootcamp / intensive course',
  'Professional certification (in progress)',
];

export const JOB_TITLE_SUGGESTIONS = [
  'Intern',
  'Graduate Trainee',
  'Research Assistant',
  'Teaching Assistant',
  'Administrative Assistant',
  'Office Administrator',
  'Receptionist',
  'Customer Service Representative',
  'Sales Associate',
  'Retail Associate',
  'Cashier',
  'Warehouse Associate',
  'Delivery Driver',
  'Nursing Assistant',
  'Care Assistant',
  'Laboratory Technician',
  'Field Technician',
  'Junior Accountant',
  'Bookkeeper',
  'Marketing Assistant',
  'Social Media Assistant',
  'Content Writer',
  'Graphic Design Assistant',
  'Junior Analyst',
  'Data Entry Clerk',
  'Project Coordinator',
  'Operations Assistant',
  'HR Assistant',
  'Legal Assistant',
  'Community Organizer',
  'Volunteer Coordinator',
  'Software Developer',
  'Web Developer',
  'IT Support Technician',
];

export const SKILL_LEVEL_SUGGESTIONS = [
  'Learning',
  'Basic',
  'Comfortable',
  'Proficient',
  'Advanced',
  'Expert',
];

/** Tools, methods, equipment — tech and non-tech examples */
export const PROJECT_TOOLS_SUGGESTIONS = [
  'Microsoft Office (Word, Excel)',
  'Google Workspace',
  'Public speaking & presentations',
  'Customer service',
  'Cash handling & POS',
  'Patient care basics',
  'Laboratory safety',
  'Power tools & hand tools',
  'Driving (valid license)',
  'Scheduling & calendar tools',
  'Social media content',
  'Photography / video',
  'Python',
  'JavaScript',
  'Spreadsheets & reporting',
];

export function recentYears(count = 45) {
  const y = new Date().getFullYear();
  return Array.from({ length: count }, (_, i) => String(y - i));
}
