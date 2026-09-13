import React, { useState } from 'react';
import { Modal } from './Modal';

export const Collaborators = ({ permissions = [] }) => {
  const [showModal, setShowModal] = useState(false);

  const displayList = permissions.length ? permissions : [
    { name: 'Vasudev Sharma', role: 'Editor', email: 'vasudev@example.com' }
  ];

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '-0.375rem',
          cursor: 'pointer'
        }}
        onClick={() => setShowModal(true)}
        title="View Collaborators"
      >
        {displayList.slice(0, 3).map((p, idx) => (
          <div
            key={idx}
            className="avatar"
            style={{
              width: 32,
              height: 32,
              fontSize: '0.75rem',
              border: '2px solid var(--bg-sidebar)',
              marginLeft: idx > 0 ? '-8px' : '0'
            }}
          >
            {p.name ? p.name.split(' ').map((n) => n[0]).join('').substring(0, 2) : 'U'}
          </div>
        ))}

        {displayList.length > 3 && (
          <div
            className="avatar"
            style={{
              width: 32,
              height: 32,
              fontSize: '0.75rem',
              background: 'var(--bg-hover)',
              border: '2px solid var(--bg-sidebar)',
              marginLeft: '-8px'
            }}
          >
            +{displayList.length - 3}
          </div>
        )}

        <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {displayList.length} collaborator{displayList.length > 1 ? 's' : ''}
        </span>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Active Collaborators"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {displayList.map((user, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.625rem',
                background: 'var(--bg-hover)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  {user.email}
                </div>
              </div>
              <span className={`badge badge-${user.role.toLowerCase()}`}>
                {user.role}
              </span>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};
