import { useId, useState } from 'react';
import { useCVBuilder } from '../../../context/CVBuilderContext.jsx';
import { BulbIcon, XIcon } from '../../ui/Icons.jsx';

const STARTER_TEMPLATES = [
  {
    title: 'Experienced Professional',
    text: 'Results-driven professional with extensive experience in delivering impactful projects, optimizing team processes, and solving complex challenges. Known for strong communication, analytical problem-solving, and a track record of driving measurable business value.',
  },
  {
    title: 'Recent Graduate / Entry Level',
    text: 'Motivated and detail-oriented graduate with strong foundational training in analytical problem-solving and modern technical tools. Eager to apply academic insights, volunteer experience, and collaborative energy to a dynamic team.',
  },
  {
    title: 'Technical / Engineering Specialist',
    text: 'Dedicated technical specialist skilled in designing, developing, and maintaining high-quality systems and solutions. Experienced with cross-functional teamwork, modern best practices, and delivering clean, maintainable results on schedule.',
  },
];

export default function SummaryEditor({ section }) {
  const { updateSection } = useCVBuilder();
  const rid = useId();
  const d = section.data || {};
  const currentText = d.html || '';
  const taId = `${rid}-summary`;
  const [showStarters, setShowStarters] = useState(false);

  function applyStarter(text) {
    if (currentText.trim() && !window.confirm('Replace your current summary draft with this template?')) {
      return;
    }
    updateSection(section.key, { data: { ...d, html: text } });
    setShowStarters(false);
  }

  const length = currentText.trim().length;
  let statusTone = 'muted';
  let lengthAdvice = 'Aim for 2–4 sentences (150–500 characters)';
  if (length > 0 && length < 100) {
    lengthAdvice = 'Good start — adding 1 or 2 specific strengths makes it even stronger';
  } else if (length >= 100 && length <= 600) {
    statusTone = 'success';
    lengthAdvice = 'Ideal summary length for recruiter scanning';
  } else if (length > 600) {
    statusTone = 'warning';
    lengthAdvice = 'A bit lengthy — consider condensing for faster readability';
  }

  return (
    <div className="summary-editor-wrap">
      <div className="summary-topbar">
        <div>
          <label className="field-label" htmlFor={taId} id={`${taId}-lbl`}>
            Professional Summary
          </label>
          <p className="field-hint summary-editor-hint">
            A concise 2–4 sentence overview of who you are, what you bring to the table, and your primary career focus.
          </p>
        </div>
        <button
          type="button"
          className="btn-ghost small starter-btn"
          onClick={() => setShowStarters((prev) => !prev)}
        >
          {showStarters ? (
            <>
              <XIcon size={12} /> Close templates
            </>
          ) : (
            <>
              <BulbIcon size={12} /> Browse starter templates
            </>
          )}
        </button>
      </div>

      {showStarters && (
        <div className="summary-starters-card">
          <p className="starters-intro">Select a starter template to use as a baseline, then edit with your own details:</p>
          <div className="starters-grid">
            {STARTER_TEMPLATES.map((t) => (
              <div key={t.title} className="starter-card">
                <h5>{t.title}</h5>
                <p>{t.text}</p>
                <button
                  type="button"
                  className="btn btn-secondary tiny use-starter-btn"
                  onClick={() => applyStarter(t.text)}
                >
                  Use this template
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <textarea
        id={taId}
        className="textarea summary-textarea"
        rows={5}
        maxLength={900}
        aria-labelledby={`${taId}-lbl`}
        placeholder="Example: Detail-oriented Project Coordinator with 3+ years managing client deliverables and operational roadmaps. Experienced with Agile workflows, stakeholder reporting, and cross-functional team coordination."
        value={currentText}
        onChange={(e) => updateSection(section.key, { data: { ...d, html: e.target.value } })}
      />

      <div className="summary-meta-bar">
        <span className={`summary-count ${statusTone}`}>
          {length} / 900 characters
        </span>
        <span className="summary-advice">{lengthAdvice}</span>
      </div>
    </div>
  );
}
