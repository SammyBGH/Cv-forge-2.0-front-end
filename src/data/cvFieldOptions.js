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

/** Example fields of study across many industries — users can type anything */
export const PROGRAM_FIELD_SUGGESTIONS = [
  'Business Administration',
  'Accounting',
  'Nursing',
  'Computer Science',
  'Marketing',
  'Education',
  'Law',
  'Medicine',
  'Psychology',
  'Economics',
  'Social Work',
  'Civil Engineering',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Hospitality & Tourism',
  'Human Resources',
  'Agriculture',
  'Graphic Design',
  'Data Science',
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

/** Example job titles spanning many sectors — used for autocomplete only */
export const JOB_TITLE_SUGGESTIONS = [
  // Early career
  'Intern',
  'Graduate Trainee',
  'Apprentice',
  'Volunteer',
  // Administration & office
  'Administrative Assistant',
  'Office Administrator',
  'Receptionist',
  'Executive Assistant',
  'Data Entry Clerk',
  'Project Coordinator',
  // Customer-facing & sales
  'Customer Service Representative',
  'Sales Associate',
  'Retail Supervisor',
  'Cashier',
  'Call Centre Agent',
  'Account Manager',
  // Hospitality & food service
  'Barista',
  'Waiter / Waitress',
  'Chef',
  'Housekeeping Attendant',
  'Front Desk Agent',
  // Healthcare & care
  'Nursing Assistant',
  'Care Assistant',
  'Registered Nurse',
  'Medical Receptionist',
  'Laboratory Technician',
  'Pharmacist',
  // Education
  'Teaching Assistant',
  'Teacher',
  'Tutor',
  'Early Years Practitioner',
  // Trades, logistics & field work
  'Warehouse Associate',
  'Delivery Driver',
  'Machine Operator',
  'Electrician',
  'Plumber',
  'Site Supervisor',
  'Field Technician',
  'Security Officer',
  // Finance & professional services
  'Junior Accountant',
  'Bookkeeper',
  'Financial Analyst',
  'HR Assistant',
  'Legal Assistant',
  'Paralegal',
  // Creative & marketing
  'Content Writer',
  'Social Media Coordinator',
  'Graphic Designer',
  'Marketing Assistant',
  'Photographer',
  // Science, engineering & technology
  'Research Assistant',
  'Civil Engineer',
  'Mechanical Technician',
  'Software Developer',
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

/** Tools, equipment, software, or methods across many kinds of work */
export const PROJECT_TOOLS_SUGGESTIONS = [
  'Microsoft Office (Word, Excel)',
  'Google Workspace',
  'Spreadsheets & reporting',
  'Scheduling & calendar tools',
  'Point-of-sale (POS) systems',
  'Customer relationship tools (CRM)',
  'Accounting software',
  'Project management tools',
  'Public speaking & presentations',
  'Customer service',
  'Cash handling',
  'Inventory & stock control',
  'Patient care',
  'Manual handling & lifting',
  'Health & safety procedures',
  'Laboratory procedures',
  'Power tools & hand tools',
  'Machinery & equipment operation',
  'Driving (valid license)',
  'Social media content',
  'Photography / video',
  'Design software (Photoshop, Canva)',
  'Data analysis & visualisation',
  'Python',
  'JavaScript',
];

export function recentYears(count = 45) {
  const y = new Date().getFullYear();
  return Array.from({ length: count }, (_, i) => String(y - i));
}
