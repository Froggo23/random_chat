'use client';

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import UsernameInput from './UsernameInput';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';
import ConnectionStatus from './ConnectionStatus';

let socket;

export default function ChatContainer() {
    // username state is now managed within UsernameInput, but we need it here for sendMessage
    const [username, setUsername] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        const socketInitializer = async () => {
            socket = io();

            socket.on('connect', () => {
                setIsConnected(true);
            });

            socket.on('message', (msg) => {
                setChatMessages((prevMessages) => [...prevMessages, msg]);
            });

            socket.on('disconnect', () => {
                setIsConnected(false);
            });

            socket.on('connect_error', (error) => {
                setIsConnected(false);
            });
        };

        socketInitializer();

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    // This function now receives the message from the MessageInput component
    const handleSendMessage = (msgText) => {
        if (username.trim() && msgText.trim() && isConnected) {
            socket.emit('message', { user: username, text: msgText });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '1rem' }}>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', padding: '1.5rem', width: '100%', maxWidth: '48rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', color: '#2563eb', marginBottom: '1.5rem' }}>Simple Chat</h1>

                {/* UsernameInput now manages its own `username` state internally */}
                <UsernameInput setUsernameInParent={setUsername} isConnected={isConnected} />

                <MessageDisplay chatMessages={chatMessages} currentUsername={username} messagesEndRef={messagesEndRef} />

                {/* MessageInput now manages its own `message` state internally */}
                <MessageInput onSendMessage={handleSendMessage} usernameSet={username.trim() !== ''} isConnected={isConnected} />

                <ConnectionStatus isConnected={isConnected} />
            </div>
        </div>
    );
}