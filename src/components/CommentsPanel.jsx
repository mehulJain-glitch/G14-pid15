import React, { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { useAppStore } from '../store/appStore';

export const CommentsPanel = ({ document }) => {
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState({});
  const updateDocument = useAppStore((state) => state.updateDocument);
  const user = useAppStore((state) => state.user);
  const addToast = useAppStore((state) => state.addToast);

  if (!document) return null;

  const comments = document.comments || [];

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentObj = {
      id: `c-${Date.now()}`,
      user: user?.name || 'Vasudev Sharma',
      avatar: user?.avatar || 'VK',
      time: 'Just now',
      text: newComment.trim(),
      resolved: false,
      replies: []
    };

    const updatedComments = [commentObj, ...comments];
    updateDocument(document.id, { comments: updatedComments });
    addToast('Comment added', 'success');
    setNewComment('');
  };

  const handleToggleResolve = (commentId) => {
    const updatedComments = comments.map((c) =>
      c.id === commentId ? { ...c, resolved: !c.resolved } : c
    );
    updateDocument(document.id, { comments: updatedComments });
    addToast('Comment resolved', 'info');
  };

  return (
    <div>
      <form onSubmit={handleAddComment} style={{ marginBottom: '1.25rem' }}>
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          type="submit"
          variant="primary"
          style={{ width: '100%' }}
          disabled={!newComment.trim()}
        >
          Post Comment
        </Button>
      </form>

      {!comments.length ? (
        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textAlign: 'center', padding: '1rem 0' }}>
          No comments yet on this document.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                padding: '0.75rem',
                background: comment.resolved ? 'rgba(255,255,255,0.02)' : 'var(--bg-hover)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                opacity: comment.resolved ? 0.6 : 1
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="avatar" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>
                    {comment.avatar}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{comment.user}</span>
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{comment.time}</span>
              </div>

              <p style={{ fontSize: '0.875rem', margin: '0.4rem 0', color: 'var(--text-main)' }}>
                {comment.text}
              </p>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <Button
                  variant="icon"
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                  onClick={() => handleToggleResolve(comment.id)}
                >
                  {comment.resolved ? 'Reopen' : 'Resolve'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
