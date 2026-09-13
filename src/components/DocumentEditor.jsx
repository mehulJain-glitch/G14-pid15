import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

export const DocumentEditor = forwardRef(({ content, onChange, readOnly = false, docId }, ref) => {
  const paperRef = useRef(null);
  const lastContentRef = useRef(content);
  const savedRangeRef = useRef(null);

  // Expose formatting methods to parent Editor component
  useImperativeHandle(ref, () => ({
    applyCommand: (command, value = null) => {
      if (readOnly || !paperRef.current) return;

      // 1. Focus paper
      paperRef.current.focus();

      // 2. Restore saved selection range if present
      const selection = window.getSelection();
      if (savedRangeRef.current && selection) {
        try {
          selection.removeAllRanges();
          selection.addRange(savedRangeRef.current);
        } catch (e) {
          console.warn('Could not restore range:', e);
        }
      }

      // 3. Execute DOM format command
      try {
        if (command === 'formatBlock') {
          // Chrome/Edge require formatBlock to have angle brackets like <h1> or <h2>
          document.execCommand('formatBlock', false, value);
        } else if (command === 'fontSize') {
          // execCommand fontSize accepts 1-7. Also apply direct CSS font-size if needed
          document.execCommand('fontSize', false, value);
        } else if (command === 'hiliteColor') {
          const success = document.execCommand('hiliteColor', false, value);
          if (!success) {
            document.execCommand('backColor', false, value);
          }
        } else {
          document.execCommand(command, false, value);
        }
      } catch (err) {
        console.error('execCommand error:', err);
      }

      // 4. Save updated range & notify parent of content change
      saveCurrentSelection();
      handleInput();
    },

    saveSelection: () => {
      saveCurrentSelection();
    }
  }));

  // Save current text selection inside the paper div
  const saveCurrentSelection = () => {
    if (!paperRef.current) return;
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      // Ensure selection is inside our paper
      if (paperRef.current.contains(range.commonAncestorContainer)) {
        savedRangeRef.current = range.cloneRange();
      }
    }
  };

  // Set initial content on mount or document switch
  useEffect(() => {
    if (paperRef.current) {
      paperRef.current.innerHTML = content || '';
      lastContentRef.current = content;
    }
  }, [docId]);

  // Update innerHTML ONLY if paper is not currently active
  useEffect(() => {
    if (
      paperRef.current &&
      document.activeElement !== paperRef.current &&
      content !== lastContentRef.current
    ) {
      paperRef.current.innerHTML = content || '';
      lastContentRef.current = content;
    }
  }, [content]);

  // Handle content input changes
  const handleInput = () => {
    if (paperRef.current && onChange) {
      const html = paperRef.current.innerHTML;
      lastContentRef.current = html;
      onChange(html);
    }
  };

  return (
    <div className="editor-paper-wrapper" onClick={() => paperRef.current?.focus()}>
      <div className="paper-container">
        {/* Top Paper Ruler Bar */}
        <div className="paper-ruler">
          <div className="ruler-ticks">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="ruler-num">{i + 1}</span>
            ))}
          </div>
        </div>

        {/* Paper Surface */}
        <div
          ref={paperRef}
          className="document-paper"
          contentEditable={!readOnly}
          suppressContentEditableWarning={true}
          onInput={handleInput}
          onBlur={handleInput}
          onMouseUp={saveCurrentSelection}
          onKeyUp={saveCurrentSelection}
          onSelect={saveCurrentSelection}
          style={{
            cursor: readOnly ? 'default' : 'text',
            opacity: readOnly ? 0.9 : 1
          }}
        />
      </div>
    </div>
  );
});
