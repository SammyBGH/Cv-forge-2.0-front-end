import { useId } from 'react';
import { useCVBuilder } from '../../../context/CVBuilderContext.jsx';

export default function SummaryEditor({ section }) {
  const { updateSection } = useCVBuilder();
  const rid = useId();
  const d = section.data || {};
  const taId = `${rid}-summary`;
  const hintId = `${taId}-hint`;

  return (
    <div className="field block summary-editor-wrap">
      <label className="field-label" htmlFor={taId} id={`${taId}-lbl`}>
        About you (short summary)
      </label>
      <p id={hintId} className="field-hint summary-editor-hint">
        In a few sentences: what you bring, what you are looking for, or what you have studied — written for employers or admissions readers.
      </p>
      <textarea
        id={taId}
        className="textarea"
        rows={6}
        aria-labelledby={`${taId}-lbl`}
        aria-describedby={hintId}
        placeholder="Example: Third-year nursing student with volunteer elder-care experience. Comfortable with patient intake, documentation, and teamwork in fast-paced wards."
        value={d.html || ''}
        onChange={(e) => updateSection(section.key, { data: { ...d, html: e.target.value } })}
      />
    </div>
  );
}
