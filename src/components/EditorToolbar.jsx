import React from 'react';
import {
  IconBold,
  IconItalic,
  IconUnderline
} from './Icons';

export const EditorToolbar = ({ onCommand, onSaveSelection, disabled = false }) => {
  const executeCommand = (command, value = null) => {
    if (disabled) return;
    if (onCommand) {
      onCommand(command, value);
    }
  };

  const preventFocusLoss = (e) => {
    e.preventDefault();
    if (onSaveSelection) {
      onSaveSelection();
    }
  };

  const handleDropdownFocus = () => {
    if (onSaveSelection) {
      onSaveSelection();
    }
  };

  return (
    <div className="editor-toolbar" style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}>
      {/* Undo & Redo */}
      <button
        type="button"
        className="toolbar-btn"
        onMouseDown={preventFocusLoss}
        onClick={() => executeCommand('undo')}
        disabled={disabled}
        title="Undo (Ctrl+Z)"
      >
        ↺
      </button>
      <button
        type="button"
        className="toolbar-btn"
        onMouseDown={preventFocusLoss}
        onClick={() => executeCommand('redo')}
        disabled={disabled}
        title="Redo (Ctrl+Y)"
      >
        ↻
      </button>

      <div className="toolbar-divider" />

      {/* Paragraph / Headings */}
      <select
        className="toolbar-btn"
        style={{ background: 'var(--bg-input)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
        onFocus={handleDropdownFocus}
        onMouseDown={handleDropdownFocus}
        onChange={(e) => executeCommand('formatBlock', e.target.value)}
        defaultValue="<p>"
        disabled={disabled}
      >
        <option value="<p>">Normal Text</option>
        <option value="<h1>">Title (Heading 1)</option>
        <option value="<h2>">Subtitle (Heading 2)</option>
        <option value="<h3>">Section (Heading 3)</option>
        <option value="<pre>">Code Block</option>
        <option value="<blockquote>">Quote</option>
      </select>

      {/* Font Family */}
      <select
        className="toolbar-btn"
        style={{ background: 'var(--bg-input)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
        onFocus={handleDropdownFocus}
        onMouseDown={handleDropdownFocus}
        onChange={(e) => executeCommand('fontName', e.target.value)}
        defaultValue="Inter"
        disabled={disabled}
      >
        <option value="Inter">Inter</option>
        <option value="Outfit">Outfit</option>
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Verdana">Verdana</option>
      </select>

      {/* Font Size */}
      <select
        className="toolbar-btn"
        style={{ background: 'var(--bg-input)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
        onFocus={handleDropdownFocus}
        onMouseDown={handleDropdownFocus}
        onChange={(e) => executeCommand('fontSize', e.target.value)}
        defaultValue="3"
        disabled={disabled}
      >
        <option value="1">Small (10pt)</option>
        <option value="2">Normal (13pt)</option>
        <option value="3">Medium (16pt)</option>
        <option value="4">Large (18pt)</option>
        <option value="5">X-Large (24pt)</option>
        <option value="6">Huge (32pt)</option>
        <option value="7">Giant (48pt)</option>
      </select>

      <div className="toolbar-divider" />

      {/* Formatting Style */}
      <button
        type="button"
        className="toolbar-btn"
        onMouseDown={preventFocusLoss}
        onClick={() => executeCommand('bold')}
        disabled={disabled}
        title="Bold (Ctrl+B)"
      >
        <IconBold size={16} />
      </button>
      <button
        type="button"
        className="toolbar-btn"
        onMouseDown={preventFocusLoss}
        onClick={() => executeCommand('italic')}
        disabled={disabled}
        title="Italic (Ctrl+I)"
      >
        <IconItalic size={16} />
      </button>
      <button
        type="button"
        className="toolbar-btn"
        onMouseDown={preventFocusLoss}
        onClick={() => executeCommand('underline')}
        disabled={disabled}
        title="Underline (Ctrl+U)"
      >
        <IconUnderline size={16} />
      </button>
      <button
        type="button"
        className="toolbar-btn"
        onMouseDown={preventFocusLoss}
        onClick={() => executeCommand('strikeThrough')}
        disabled={disabled}
        title="Strikethrough"
      >
        <s>S</s>
      </button>

      <div className="toolbar-divider" />

      {/* Color pickers */}
      <label
        className="toolbar-btn"
        onMouseDown={preventFocusLoss}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', cursor: 'pointer' }}
        title="Text Color"
      >
        <span style={{ fontWeight: 700, color: '#f43f5e' }}>A</span>
        <input
          type="color"
          style={{ width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
          onChange={(e) => executeCommand('foreColor', e.target.value)}
          disabled={disabled}
        />
      </label>

      <label
        className="toolbar-btn"
        onMouseDown={preventFocusLoss}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', cursor: 'pointer' }}
        title="Highlight Background Color"
      >
        <span style={{ background: '#fef08a', color: '#000', padding: '0 4px', borderRadius: '2px', fontWeight: 700 }}>H</span>
        <input
          type="color"
          defaultValue="#fef08a"
          style={{ width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
          onChange={(e) => executeCommand('hiliteColor', e.target.value)}
          disabled={disabled}
        />
      </label>

      <div className="toolbar-divider" />

      {/* Alignments */}
      <button
        type="button"
        className="toolbar-btn"
        onMouseDown={preventFocusLoss}
        onClick={() => executeCommand('justifyLeft')}
        disabled={disabled}
        title="Align Left"
      >
        Left
      </button>
      <button
        type="button"
        className="toolbar-btn"
        onMouseDown={preventFocusLoss}
        onClick={() => executeCommand('justifyCenter')}
        disabled={disabled}
        title="Align Center"
      >
        Center
      </button>
      <button
        type="button"
        className="toolbar-btn"
        onMouseDown={preventFocusLoss}
        onClick={() => executeCommand('justifyRight')}
        disabled={disabled}
        title="Align Right"
      >
        Right
      </button>
      <button
        type="button"
        className="toolbar-btn"
        onMouseDown={preventFocusLoss}
        onClick={() => executeCommand('justifyFull')}
        disabled={disabled}
        title="Justify"
      >
        Justify
      </button>

      <div className="toolbar-divider" />

      {/* Lists */}
      <button
        type="button"
        className="toolbar-btn"
        onMouseDown={preventFocusLoss}
        onClick={() => executeCommand('insertUnorderedList')}
        disabled={disabled}
        title="Bullet List"
      >
        • List
      </button>
      <button
        type="button"
        className="toolbar-btn"
        onMouseDown={preventFocusLoss}
        onClick={() => executeCommand('insertOrderedList')}
        disabled={disabled}
        title="Numbered List"
      >
        1. List
      </button>

      <div className="toolbar-divider" />

      {/* Indent / Outdent */}
      <button
        type="button"
        className="toolbar-btn"
        onMouseDown={preventFocusLoss}
        onClick={() => executeCommand('outdent')}
        disabled={disabled}
        title="Decrease Indent"
      >
        ⇤
      </button>
      <button
        type="button"
        className="toolbar-btn"
        onMouseDown={preventFocusLoss}
        onClick={() => executeCommand('indent')}
        disabled={disabled}
        title="Increase Indent"
      >
        ⇥
      </button>

      <div className="toolbar-divider" />

      {/* Links, Line, Clear */}
      <button
        type="button"
        className="toolbar-btn"
        onMouseDown={preventFocusLoss}
        onClick={() => {
          if (disabled) return;
          const url = prompt('Enter URL link:');
          if (url) executeCommand('createLink', url);
        }}
        disabled={disabled}
        title="Insert Link"
      >
        🔗 Link
      </button>
      <button
        type="button"
        className="toolbar-btn"
        onMouseDown={preventFocusLoss}
        onClick={() => executeCommand('insertHorizontalRule')}
        disabled={disabled}
        title="Horizontal Line"
      >
        ― Line
      </button>
      <button
        type="button"
        className="toolbar-btn"
        onMouseDown={preventFocusLoss}
        onClick={() => executeCommand('removeFormat')}
        disabled={disabled}
        title="Clear Formatting"
      >
        🧹 Clear
      </button>
    </div>
  );
};
