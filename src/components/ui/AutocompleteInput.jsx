import { useState, useRef, useEffect } from 'react';
import '../../styles/autocomplete.css';

export default function AutocompleteInput({
  label,
  value,
  onChange,
  suggestions = [],
  placeholder = '',
  disabled = false,
  required = false,
  helperText = '',
  error = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes((value || '').toLowerCase())
  );

  const showSuggestions = isOpen && filteredSuggestions.length > 0 && value !== '';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target) && 
          listRef.current && !listRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    onChange(e.target.value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredSuggestions[highlightedIndex]) {
          handleSuggestionClick(filteredSuggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className="autocomplete">
      {label && (
        <label className="autocomplete-label">
          {label}
          {required && <span className="autocomplete-required">*</span>}
        </label>
      )}
      <div className="autocomplete-wrapper" ref={inputRef}>
        <input
          ref={inputRef}
          type="text"
          className={`autocomplete-input ${error ? 'autocomplete-input-error' : ''}`}
          value={value || ''}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
        />
        {showSuggestions && (
          <ul className="autocomplete-suggestions" ref={listRef}>
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                className={`autocomplete-suggestion ${
                  index === highlightedIndex ? 'autocomplete-suggestion-highlighted' : ''
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      {helperText && !error && <p className="autocomplete-helper">{helperText}</p>}
      {error && <p className="autocomplete-error">{error}</p>}
    </div>
  );
}
