import React from 'react';

export default function ConnectionStatus({ isConnected }) {
    return (
        <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem' }}>
            Connection Status: {' '}
            <span style={{ color: isConnected ? '#16a34a' : '#dc2626', fontWeight: 'bold' }}>
                {isConnected ? 'Connected' : 'Disconnected'}
            </span>
        </div>
    );
}