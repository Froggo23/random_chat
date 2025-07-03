import React, { useState } from 'react';

export default function MessageInput({ onSendMessage, usernameSet, isConnected }) {
    // This message state is internal to MessageInput
    const [localMessage, setLocalMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage(localMessage); // Pass the internal message state to the parent's handler
        setLocalMessage(''); // Clear the internal message state after sending
    };

    const isDisabled = !usernameSet || !isConnected || localMessage.trim() === '';

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
            <input
                type="text"
                value={localMessage}
                onChange={(e) => setLocalMessage(e.target.value)}
                placeholder="Type your message..."
                style={{ border: '1px solid #d1d5db', borderRadius: '0.5rem', width: '100%', padding: '0.5rem 0.75rem', color: '#374151' }}
                disabled={!usernameSet || !isConnected}
            />
            <button
                type="submit"
                style={{ backgroundColor: '#2563eb', color: '#ffffff', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', opacity: isDisabled ? '0.5' : '1' }}
                disabled={isDisabled}
            >
                Send
            </button>
        </form>
    );
}