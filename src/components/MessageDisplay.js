import React from 'react';

export default function MessageDisplay({ chatMessages, currentUsername, messagesEndRef }) {
    return (
        <div style={{ border: '1px solid #d1d5db', borderRadius: '0.5rem', padding: '1rem', height: '20rem', overflowY: 'auto', marginBottom: '1rem', backgroundColor: '#f9fafb' }}>
            {chatMessages.length === 0 ? (
                <p style={{ color: '#6b7280', textAlign: 'center', marginTop: '2rem' }}>Start typing to chat!</p>
            ) : (
                chatMessages.map((msg, index) => (
                    <div
                        key={index}
                        style={{ marginBottom: '0.5rem', padding: '0.5rem', borderRadius: '0.5rem', maxWidth: '80%',
                            backgroundColor: msg.user === currentUsername ? '#3b82f6' : '#e5e7eb',
                            color: msg.user === currentUsername ? '#ffffff' : '#374151',
                            marginLeft: msg.user === currentUsername ? 'auto' : 'unset',
                            marginRight: msg.user === currentUsername ? 'unset' : 'auto'
                        }}
                    >
                        <p style={{ fontWeight: 'semibold', fontSize: '0.875rem' }}>{msg.user}:</p>
                        <p style={{ fontSize: '1rem' }}>{msg.text}</p>
                    </div>
                ))
            )}
            <div ref={messagesEndRef} />
        </div>
    );
}