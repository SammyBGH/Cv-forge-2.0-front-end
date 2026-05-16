import { useState } from 'react';

/**
 * Dropdown of preset values — always applies when chosen, even if the text box already has text.
 * Resets to the placeholder option after each pick so users can pick again.
 */
export default function QuickPickSelect({ id, options, ariaLabel, onPick }) {
  const [value, setValue] = useState('');

  return (
    <select
      id={id}
      className="input quick-pick-select"
      value={value}
      aria-label={ariaLabel}
      onChange={(e) => {
        const v = e.target.value;
        if (v) {
          onPick(v);
          setValue('');
        }
      }}
    >
      <option value="">Choose a common option…</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
