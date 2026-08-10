import { useId } from 'react';

import { useCVBuilder } from '../../../context/CVBuilderContext.jsx';

import { isFieldLocked } from '../../../utils/locks.js';

import AutocompleteInput from '../../ui/AutocompleteInput.jsx';



const HEADLINE_SUGGESTIONS = [
  'Recent graduate seeking entry-level role',
  'Customer-focused professional',
  'Detail-oriented team member',
  'Motivated student seeking internship',
  'Reliable worker with flexible schedule',
  'Organized administrator',
  'Creative problem-solver',
  'Bilingual customer support professional',
];



export default function PersonalEditor({ section, cv }) {

  const { updateSection } = useCVBuilder();

  const rid = useId();

  const d = section.data || {};



  function patch(field, value) {

    updateSection(section.key, { data: { ...d, [field]: value } });

  }



  const fields = [

    {

      key: 'fullName',

      label: 'Full name',

      placeholder: 'Your name',

      required: true,

    },

    {

      key: 'headline',

      label: 'Headline',

      placeholder: 'e.g. Biology graduate · Retail experience',

      suggestions: HEADLINE_SUGGESTIONS,

    },

    {

      key: 'email',

      label: 'Email',

      placeholder: 'you@example.com',

      inputMode: 'email',

      autoComplete: 'email',

      required: true,

    },

    {

      key: 'phone',

      label: 'Phone',

      placeholder: 'Your phone number',

      inputMode: 'tel',

      autoComplete: 'tel',

    },

    {

      key: 'location',

      label: 'City / region',

      placeholder: 'e.g. Accra · Remote',

    },

    {

      key: 'website',

      label: 'Website or portfolio',

      placeholder: 'https://…',

      inputMode: 'url',

      autoComplete: 'url',

    },

    {

      key: 'linkedin',

      label: 'LinkedIn or professional profile',

      placeholder: 'Profile URL',

      inputMode: 'url',

    },

    ];



  return (

    <div className="field-grid" role="group" aria-label="Contact and headline">

      {fields.map((f) => {

        const locked = isFieldLocked(cv, section.key, f.key);

        const baseId = `${rid}-${f.key}`;



        return (

          <div key={f.key} className="field">

            <label className="field-label" htmlFor={baseId}>

              {f.label}

              {f.required && <span className="field-required">*</span>}

              {locked ? <span className="lock-tag">Locked after paid export</span> : null}

            </label>

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

                type="text"

                placeholder={f.placeholder}

                inputMode={f.inputMode}

                autoComplete={f.autoComplete}

                value={d[f.key] || ''}

                disabled={locked}

                onChange={(e) => patch(f.key, e.target.value)}

              />

            )}

          </div>

        );

      })}

    </div>

  );

}

