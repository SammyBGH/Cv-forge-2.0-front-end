import { useId } from 'react';

import { useCVBuilder } from '../../../context/CVBuilderContext.jsx';

import QuickPickSelect from '../../ui/QuickPickSelect.jsx';



/**

 * Generic list editor for section.data.items[]

 *

 * Field config:

 * - key, label (required)

 * - type: 'text' | 'textarea'

 * - hint, placeholder

 * - suggestions: string[] → datalist + **Quick pick** dropdown (works even when input already has text)

 */

export default function ItemsEditor({ section, title, titleHint, fields }) {

  const { updateSection } = useCVBuilder();

  const reactId = useId();

  const d = section.data || {};

  const items = Array.isArray(d.items) ? d.items : [];



  function setItems(next) {

    updateSection(section.key, { data: { ...d, items: next } });

  }



  function updateItem(idx, patch) {

    setItems(items.map((it, i) => (i === idx ? { ...it, ...patch } : it)));

  }



  function addItem() {

    const empty = {};

    fields.forEach((f) => {

      empty[f.key] = '';

    });

    setItems([...items, empty]);

  }



  function removeItem(idx) {

    setItems(items.filter((_, i) => i !== idx));

  }



  const sectionHeadingId = `${reactId}-heading`;



  return (

    <div className="items-editor" role="group" aria-labelledby={sectionHeadingId}>

      <div className="items-editor-head">

        <div>

          <strong id={sectionHeadingId}>{title}</strong>

          {titleHint ? (

            <p className="field-hint block-hint" id={`${sectionHeadingId}-hint`}>

              {titleHint}

            </p>

          ) : null}

        </div>

        <button type="button" className="btn-ghost tiny" onClick={addItem} aria-describedby={titleHint ? `${sectionHeadingId}-hint` : undefined}>

          Add entry

        </button>

      </div>

      {items.length === 0 ? (

        <p className="muted small">Nothing here yet — use “Add entry” to get started.</p>

      ) : null}

      <ul className="items-list">

        {items.map((item, idx) => (

          <li key={idx} className="items-card">

            <fieldset className="items-fieldset">

              <legend className="sr-only">

                {title} — entry {idx + 1} of {items.length}

              </legend>

              <div className="item-grid-dynamic">

                {fields.map((f) => {

                  const baseId = `${reactId}-${section.key}-${idx}-${f.key}`;

                  const hintId = f.hint ? `${baseId}-hint` : undefined;

                  const listId = f.suggestions?.length ? `${baseId}-list` : undefined;

                  const describedBy = [hintId].filter(Boolean).join(' ') || undefined;



                  if (f.type === 'textarea') {

                    return (

                      <div key={f.key} className="field block">

                        <span className="field-label" id={`${baseId}-lbl`}>

                          {f.label}

                        </span>

                        <textarea

                          id={baseId}

                          className="textarea mini"

                          rows={3}

                          aria-labelledby={`${baseId}-lbl`}

                          aria-describedby={describedBy}

                          placeholder={f.placeholder}

                          value={item[f.key] || ''}

                          onChange={(e) => updateItem(idx, { [f.key]: e.target.value })}

                        />

                        {f.hint ? (

                          <span id={hintId} className="field-hint">

                            {f.hint}

                          </span>

                        ) : null}

                      </div>

                    );

                  }



                  return (

                    <div key={f.key} className="field">

                      <span className="field-label" id={`${baseId}-lbl`}>

                        {f.label}

                      </span>

                      <div className="field-stack">

                        {f.suggestions?.length ? (

                          <QuickPickSelect

                            id={`${baseId}-quick`}

                            options={f.suggestions}

                            ariaLabel={`Quick pick: ${f.label}`}

                            onPick={(v) => updateItem(idx, { [f.key]: v })}

                          />

                        ) : null}

                        <input

                          id={baseId}

                          className="input"

                          type="text"

                          aria-labelledby={`${baseId}-lbl`}

                          aria-describedby={describedBy}

                          placeholder={f.placeholder}

                          list={listId}

                          autoComplete="off"

                          value={item[f.key] || ''}

                          onChange={(e) => updateItem(idx, { [f.key]: e.target.value })}

                        />

                        {f.suggestions?.length ? (

                          <datalist id={listId}>

                            {f.suggestions.map((opt) => (

                              <option key={opt} value={opt} />

                            ))}

                          </datalist>

                        ) : null}

                      </div>

                      {f.hint ? (

                        <span id={hintId} className="field-hint">

                          {f.hint}

                        </span>

                      ) : null}

                    </div>

                  );

                })}

              </div>

              <button type="button" className="btn-danger-ghost tiny" onClick={() => removeItem(idx)}>

                Remove this entry

              </button>

            </fieldset>

          </li>

        ))}

      </ul>

    </div>

  );

}

