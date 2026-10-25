// Storage Service - Clean helper functions for browser localStorage & PC file storage
export const STORAGE_KEYS = {
  DOCUMENTS: 'team_titans_documents_v1',
  USER: 'team_titans_user_v1',
  SETTINGS: 'team_titans_settings_v1'
};

export const DEFAULT_DOCUMENTS = [
  {
    id: 'doc-1',
    title: 'Team Titans Product Architecture',
    content: '<h2>Project Overview</h2><p>This report outlines the architecture and design of <strong>Team Titans</strong>, a real-time collaborative document editor built with high-performance React & modern Web APIs.</p><p>Key highlights include custom hooks, Zustand state management, contentEditable DOM interaction, and browser storage synchronization.</p>',
    owner: { id: 'u1', name: 'Vasudev Sharma', email: 'vasudev@example.com' },
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    starred: true,
    permissions: [
      { email: 'vasudev@example.com', role: 'Editor', name: 'Vasudev Sharma' },
      { email: 'rahul@example.com', role: 'Editor', name: 'Rahul Verma' },
      { email: 'aman@example.com', role: 'Viewer', name: 'Aman Gupta' }
    ],
    comments: [
      {
        id: 'c1',
        user: 'Rahul Verma',
        avatar: 'RV',
        time: '2 hours ago',
        text: 'Please double-check the architecture diagram section before launch.',
        resolved: false,
        replies: []
      }
    ],
    versions: [
      { id: 'v1', versionNumber: 1, title: 'Draft v1', timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), content: '<p>Initial project draft content.</p>' },
      { id: 'v2', versionNumber: 2, title: 'Team Titans Product Architecture', timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), content: '<h2>Project Overview</h2><p>Updated proposal content</p>' }
    ]
  },
  {
    id: 'doc-2',
    title: 'Software Architecture & System Notes',
    content: '<h1>Architecture Notes</h1><p>Topics include React Hooks, Component Lifecycle, and Context API / Zustand state architecture.</p>',
    owner: { id: 'u1', name: 'Vasudev Sharma', email: 'vasudev@example.com' },
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    starred: false,
    permissions: [
      { email: 'vasudev@example.com', role: 'Editor', name: 'Vasudev Sharma' }
    ],
    comments: [],
    versions: []
  },
  {
    id: 'doc-3',
    title: 'Team Sprint Planning - Shared',
    content: '<h2>Sprint Objectives</h2><p>1. Complete Phase 1 UI Skeleton<br/>2. Add LocalStorage CRUD logic<br/>3. Implement multi-tab live sync</p>',
    owner: { id: 'u2', name: 'Rahul Verma', email: 'rahul@example.com' },
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    starred: true,
    permissions: [
      { email: 'rahul@example.com', role: 'Editor', name: 'Rahul Verma' },
      { email: 'vasudev@example.com', role: 'Editor', name: 'Vasudev Sharma' }
    ],
    comments: [],
    versions: []
  }
];

// Helper to convert HTML string to Markdown
function htmlToMarkdown(html = '') {
  return html
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    .replace(/<u[^>]*>(.*?)<\/u>/gi, '_$1_')
    .replace(/<strike[^>]*>(.*?)<\/strike>/gi, '~~$1~~')
    .replace(/<s[^>]*>(.*?)<\/s>/gi, '~~$1~~')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    .replace(/<ul[^>]*>/gi, '')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<ol[^>]*>/gi, '')
    .replace(/<\/ol>/gi, '\n')
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1\n\n')
    .replace(/<pre[^>]*><code>?(.*?)<\/code>?<\/pre>/gis, '```\n$1\n```\n\n')
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<[^>]+>/g, '')
    .trim();
}

// Helper to trigger browser download of a file to PC
export function downloadFileToPC(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = window.document.createElement('a');
  link.href = url;
  link.download = filename;
  window.document.body.appendChild(link);
  link.click();
  window.document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const storageService = {
  // Get all documents from localStorage
  getDocuments: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(DEFAULT_DOCUMENTS));
        return DEFAULT_DOCUMENTS;
      }
      return JSON.parse(data);
    } catch (err) {
      console.error('Failed to read documents from localStorage:', err);
      return DEFAULT_DOCUMENTS;
    }
  },

  // Save all documents array to localStorage
  saveDocuments: (documents) => {
    try {
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
    } catch (err) {
      console.error('Failed to save documents to localStorage:', err);
    }
  },

  // Export document as a physical file on the user's PC
  exportDocumentAsFile: async (doc, format = 'html') => {
    const safeTitle = (doc.title || 'Untitled Document').replace(/[/\\?%*:|"<>]/g, '_').trim();
    let content = '';
    let mimeType = 'text/plain;charset=utf-8';
    let ext = format;

    if (format === 'html') {
      mimeType = 'text/html;charset=utf-8';
      content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${doc.title || 'Untitled Document'}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      max-width: 860px;
      margin: 40px auto;
      padding: 0 24px;
      background: #f8fafc;
    }
    .document-container {
      background: #ffffff;
      padding: 48px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid #e2e8f0;
    }
    h1 { font-size: 2.2rem; margin-bottom: 0.8rem; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.4rem; }
    h2 { font-size: 1.6rem; margin-top: 1.4rem; color: #1e293b; }
    h3 { font-size: 1.25rem; margin-top: 1.1rem; color: #334155; }
    p { margin-bottom: 1rem; }
    blockquote { border-left: 4px solid #2d8b6f; padding-left: 1rem; color: #475569; margin: 1rem 0; font-style: italic; }
    pre { background: #0b232a; color: #8cbf9f; padding: 1rem; border-radius: 8px; overflow-x: auto; font-family: monospace; }
    .meta-bar { font-size: 0.85rem; color: #64748b; margin-bottom: 2rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.5rem; }
  </style>
</head>
<body>
  <div class="document-container">
    <div class="meta-bar">
      Exported from Google Docs Lite • Last updated: ${new Date(doc.updatedAt || Date.now()).toLocaleString()}
    </div>
    ${doc.content || '<p></p>'}
  </div>
</body>
</html>`;
    } else if (format === 'txt') {
      mimeType = 'text/plain;charset=utf-8';
      const plain = (doc.content || '').replace(/<[^>]*>?/gm, '');
      content = `${doc.title}\n${'='.repeat(doc.title.length)}\n\n${plain}`;
    } else if (format === 'md') {
      mimeType = 'text/markdown;charset=utf-8';
      content = `# ${doc.title}\n\n${htmlToMarkdown(doc.content || '')}`;
    } else if (format === 'json') {
      mimeType = 'application/json;charset=utf-8';
      content = JSON.stringify(doc, null, 2);
    }

    const filename = `${safeTitle}.${ext}`;

    // Try modern File System Access API if user supports it and it's a direct user interaction
    if (window.showSaveFilePicker) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: filename,
          types: [{
            description: `${format.toUpperCase()} Document`,
            accept: { [mimeType.split(';')[0]]: [`.${ext}`] }
          }]
        });
        const writable = await handle.createWritable();
        await writable.write(content);
        await writable.close();
        return { success: true, filename, viaPicker: true };
      } catch (e) {
        if (e.name === 'AbortError') {
          return { aborted: true };
        }
        // Fallback to Blob download
        downloadFileToPC(content, filename, mimeType);
        return { success: true, filename, viaPicker: false };
      }
    }

    downloadFileToPC(content, filename, mimeType);
    return { success: true, filename, viaPicker: false };
  },

  // Parse file uploaded from PC (HTML, TXT, MD, JSON)
  parseUploadedFile: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const ext = file.name.split('.').pop().toLowerCase();
      const filenameWithoutExt = file.name.replace(/\.[^/.]+$/, "");

      reader.onload = (e) => {
        const text = e.target.result;
        try {
          if (ext === 'json') {
            const parsed = JSON.parse(text);
            resolve({
              title: parsed.title || filenameWithoutExt,
              content: parsed.content || `<pre>${text}</pre>`
            });
          } else if (ext === 'html' || ext === 'htm') {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const docTitle = doc.querySelector('title')?.innerText || filenameWithoutExt;
            const bodyContent = doc.body ? doc.body.innerHTML : text;
            resolve({
              title: docTitle,
              content: bodyContent
            });
          } else {
            // txt or md: wrap plain lines in paragraphs
            const paragraphs = text
              .split(/\r?\n\r?\n/)
              .filter(Boolean)
              .map(p => `<p>${p.replace(/\r?\n/g, '<br/>')}</p>`)
              .join('');
            resolve({
              title: filenameWithoutExt,
              content: paragraphs || `<p>${text}</p>`
            });
          }
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = () => reject(new Error('Failed to read file from PC'));
      reader.readAsText(file);
    });
  },

  // Storage usage stats
  getStorageStats: () => {
    try {
      const docsJson = localStorage.getItem(STORAGE_KEYS.DOCUMENTS) || '[]';
      const bytes = new Blob([docsJson]).size;
      const count = JSON.parse(docsJson).length;
      return {
        count,
        usedKB: (bytes / 1024).toFixed(1),
        bytes
      };
    } catch {
      return { count: 0, usedKB: '0', bytes: 0 };
    }
  },

  // User auth persistence
  getUser: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : {
        id: 'u1',
        name: 'Vasudev Sharma',
        email: 'vasudev@example.com',
        avatar: 'VK',
        role: 'Owner'
      };
    } catch {
      return null;
    }
  },

  saveUser: (user) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (err) {
      console.error('Failed to save user to localStorage:', err);
    }
  },

  clearUser: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};
