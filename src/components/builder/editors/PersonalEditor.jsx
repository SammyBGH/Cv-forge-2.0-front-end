import { useId } from 'react';
import { useCVBuilder } from '../../../context/CVBuilderContext.jsx';
import { isFieldLocked } from '../../../utils/locks.js';
import AutocompleteInput from '../../ui/AutocompleteInput.jsx';
import { LockIcon } from '../../ui/Icons.jsx';

const QUICK_HEADLINES = [
  'Customer Service Representative',
  'Administrative Assistant',
  'Project Manager',
  'Marketing Specialist',
  'Registered Nurse',
  'Sales Associate',
  'Teacher',
  'Operations Coordinator',
  'Graphic Designer',
  'Financial Analyst',
  'Warehouse Supervisor',
  'Recent Graduate',
];

const COMMON_LOCATIONS = [
  'Accra, Ghana',
  'Kumasi, Ghana',
  'Remote (Worldwide)',
  'London, UK',
  'Lagos, Nigeria',
];

function Field({ f, d, locked, baseId, patch }) {
  const badgeClass = f.required
    ? 'field-required-badge'
    : f.recommended
    ? 'field-recommended-badge'
    : 'field-optional-badge';
  const badgeLabel = f.required
    ? 'Required'
    : f.recommended
    ? 'Recommended'
    : 'Optional';

  return (
    <div className="field">
      <div className="field-label-wrap">
        <label className="field-label" htmlFor={baseId}>
          {f.label}
        </label>
        <span className={`field-badge ${badgeClass}`}>{badgeLabel}</span>
        {locked ? (
          <span className="lock-tag">
            <LockIcon size={11} /> Locked after export
          </span>
        ) : null}
      </div>

      {f.suggestions && !locked ? (
        <AutocompleteInput
          id={baseId}
          value={d[f.key] || ''}
          onChange={(v) => patch(f.key, v)}
          suggestions={f.suggestions}
          placeholder={f.placeholder}
          disabled={locked}
          required={f.required}
        />
      ) : (
        <input
          id={baseId}
          className="input"
          type={f.inputType || 'text'}
          placeholder={f.placeholder}
          inputMode={f.inputMode}
          autoComplete={f.autoComplete}
          value={d[f.key] || ''}
          disabled={locked}
          required={f.required}
          onChange={(e) => patch(f.key, e.target.value)}
        />
      )}
      {f.hint ? <span className="field-hint">{f.hint}</span> : null}
    </div>
  );
}

export default function PersonalEditor({ section, cv }) {
  const { updateSection } = useCVBuilder();
  const rid = useId();
  const d = section.data || {};

  function patch(field, value) {
    updateSection(section.key, { data: { ...d, [field]: value } });
  }

  const identity = [
    {
      key: 'fullName',
      label: 'Full Name',
      placeholder: 'e.g. Kwame Mensah',
      required: true,
      autoComplete: 'name',
      hint: 'Your official name as it should appear on your CV',
    },
    {
      key: 'headline',
      label: 'Professional Headline',
      placeholder: 'e.g. Marketing Specialist · 3+ Years Experience',
      recommended: true,
      suggestions: QUICK_HEADLINES,
      hint: 'A concise summary of your current focus or target role',
    },
  ];

  const contact = [
    {
      key: 'email',
      label: 'Email Address',
      placeholder: 'kwame@example.com',
      inputMode: 'email',
      inputType: 'email',
      autoComplete: 'email',
      required: true,
      hint: 'Employers will use this to reach out with interview invites',
    },
    {
      key: 'phone',
      label: 'Phone Number',
      placeholder: '+233 24 123 4567',
      inputMode: 'tel',
      inputType: 'tel',
      autoComplete: 'tel',
      recommended: true,
      hint: 'Include country code if applying internationally',
    },
    {
      key: 'location',
      label: 'City & Country',
      placeholder: 'e.g. Accra, Ghana or Remote',
      autoComplete: 'address-level2',
      recommended: true,
      suggestions: COMMON_LOCATIONS,
      hint: 'City and country or Remote preference is sufficient',
    },
  ];

  const links = [
    {
      key: 'website',
      label: 'Portfolio or Personal Website',
      placeholder: 'https://yourportfolio.com',
      inputMode: 'url',
      inputType: 'url',
      autoComplete: 'url',
      hint: 'Optional link to your portfolio, work samples, or personal site',
    },
    {
      key: 'linkedin',
      label: 'LinkedIn Profile',
      placeholder: 'linkedin.com/in/kwame-mensah',
      inputMode: 'url',
      inputType: 'url',
      hint: 'Optional link to your professional networking profile',
    },
  ];

  return (
    <div className="personal-editor" role="group" aria-label="Personal details and contact">
      <div className="form-cluster">
        <div className="form-cluster-header">
          <h4 className="form-cluster-title">Identity & Role</h4>
          <p className="form-cluster-desc">The headline appears right below your name on every page.</p>
        </div>
        <div className="field-grid">
          {identity.map((f) => (
            <Field
              key={f.key}
              f={f}
              d={d}
              locked={isFieldLocked(cv, section.key, f.key)}
              baseId={`${rid}-${f.key}`}
              patch={patch}
            />
          ))}
        </div>

        {!d.headline && (
          <div className="suggestion-chips-row">
            <span className="suggestion-chips-label">Popular headlines:</span>
            {QUICK_HEADLINES.slice(0, 5).map((hl) => (
              <button
                key={hl}
                type="button"
                className="chip-btn"
                onClick={() => patch('headline', hl)}
              >
                + {hl}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="form-cluster">
        <div className="form-cluster-header">
          <h4 className="form-cluster-title">Contact Information</h4>
          <p className="form-cluster-desc">Ensure your email and phone are active so recruiters can connect.</p>
        </div>
        <div className="field-grid">
          {contact.map((f) => (
            <Field
              key={f.key}
              f={f}
              d={d}
              locked={isFieldLocked(cv, section.key, f.key)}
              baseId={`${rid}-${f.key}`}
              patch={patch}
            />
          ))}
        </div>
      </div>

      <div className="form-cluster">
        <div className="form-cluster-header">
          <h4 className="form-cluster-title">Online Presence & Links</h4>
          <p className="form-cluster-desc">Optional links to showcase your portfolio, work samples, or recommendations.</p>
        </div>
        <div className="field-grid">
          {links.map((f) => (
            <Field
              key={f.key}
              f={f}
              d={d}
              locked={isFieldLocked(cv, section.key, f.key)}
              baseId={`${rid}-${f.key}`}
              patch={patch}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
