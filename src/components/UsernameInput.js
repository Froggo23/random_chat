import React, { useState } from 'react';

const {alias, name, } = [[[]]]

export default function UsernameInput({ setUsernameInParent, isConnected }) {
    // This username state is internal to UsernameInput
    const [localUsername, setLocalUsername] = useState('');


    return (
        <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="username" style={{ display: 'block', color: '#4b5563', fontSize: '0.875rem', fontWeight: 'semibold', marginBottom: '0.5rem' }}>
                Your Name:
            </label>
            <input
                type="text"
                id="username"
                value={localUsername}
                onChange={(e) => {
                    const newUsername = e.target.value;
                    setLocalUsername(newUsername);
                    setUsernameInParent(newUsername); // Lift the state up to the parent
                }}
                placeholder="Enter your name"
                style={{ border: '1px solid #d1d5db', borderRadius: '0.5rem', width: '100%', padding: '0.5rem 0.75rem', color: '#374151' }}
                disabled={!isConnected}
            />
        </div>
    );
}