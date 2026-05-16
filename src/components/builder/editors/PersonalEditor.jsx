import { useId } from 'react';

import { useCVBuilder } from '../../../context/CVBuilderContext.jsx';

import { isFieldLocked } from '../../../utils/locks.js';

import QuickPickSelect from '../../ui/QuickPickSelect.jsx';



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

      hint: 'As you want it to appear on your CV.',

      placeholder: 'Your name',

    },

    {

      key: 'headline',

      label: 'Headline',

      hint: 'One short line: what you do or what you are looking for.',

      placeholder: 'e.g. Biology graduate · Retail experience',

      suggestions: HEADLINE_SUGGESTIONS,

    },

    {

      key: 'email',

      label: 'Email',

      hint: 'Use an address you check often.',

      placeholder: 'you@example.com',

      inputMode: 'email',

      autoComplete: 'email',

    },

    {

      key: 'phone',

      label: 'Phone',

      hint: 'Include country code if you apply internationally.',

      placeholder: 'Your phone number',

      inputMode: 'tel',

      autoComplete: 'tel',

    },

    {

      key: 'location',

      label: 'City / region',

      hint: 'Helps employers see commute or relocation — optional.',

      placeholder: 'e.g. Accra · Remote',

    },

    {

      key: 'website',

      label: 'Website or portfolio',

      hint: 'Optional link to your work, LinkedIn post, or blog.',

      placeholder: 'https://…',

      inputMode: 'url',

      autoComplete: 'url',

    },

    {

      key: 'linkedin',

      label: 'LinkedIn or professional profile',

      hint: 'Another way to learn about you — optional.',

      placeholder: 'Profile URL',

      inputMode: 'url',

    },

  ];



  return (

    <div className="field-grid" role="group" aria-label="Contact and headline">

      {fields.map((f) => {

        const locked = isFieldLocked(cv, section.key, f.key);

        const baseId = `${rid}-${f.key}`;

        const hintId = f.hint ? `${baseId}-hint` : undefined;

        const listId = f.suggestions?.length ? `${baseId}-list` : undefined;

        const describedBy = [hintId].filter(Boolean).join(' ') || undefined;



        return (

          <div key={f.key} className="field">

            <span className="field-label" id={`${baseId}-lbl`}>

              {f.label}

              {locked ? <span className="lock-tag">Locked after paid export</span> : null}

            </span>

            {!locked && f.suggestions?.length ? (

              <QuickPickSelect

                id={`${baseId}-quick`}

                options={f.suggestions}

                ariaLabel={`Quick pick: ${f.label}`}

                onPick={(v) => patch(f.key, v)}

              />

            ) : null}

            <input

              id={baseId}

              className="input"

              type="text"

              aria-labelledby={`${baseId}-lbl`}

              aria-describedby={describedBy}

              placeholder={f.placeholder}

              list={locked ? undefined : listId}

              inputMode={f.inputMode}

              autoComplete={f.autoComplete}

              value={d[f.key] || ''}

              disabled={locked}

              onChange={(e) => patch(f.key, e.target.value)}

            />

            {!locked && f.suggestions?.length ? (

              <datalist id={listId}>

                {f.suggestions.map((opt) => (

                  <option key={opt} value={opt} />

                ))}

              </datalist>

            ) : null}

            {f.hint ? (

              <span id={hintId} className="field-hint">

                {f.hint}

              </span>

            ) : null}

          </div>

        );

      })}

    </div>

  );

}

