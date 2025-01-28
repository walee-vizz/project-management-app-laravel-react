import React, { useState } from 'react';
import MessageComposer from '@/Components/MessageComposer'; // Import your MessageComposer component

export default function ChatButton({ className }) {
    const [showOptions, setShowOptions] = useState(false);
    const [chatType, setChatType] = useState(null);

    const handleOptionClick = (type) => {
        setChatType(type);
        setShowOptions(false);
    };

    return (
        <div className={"sticky bottom-3 flex justify-end " + className} >
            <button
                className="p-3 text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600"
                onClick={() => setShowOptions(!showOptions)}
            >
                Chat
            </button>

            {showOptions && (
                <div className="absolute right-0 w-40 p-2 bg-white border rounded shadow-lg bottom-14">
                    <button
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        onClick={() => handleOptionClick('private')}
                    >
                        Private Chat
                    </button>
                    <button
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        onClick={() => handleOptionClick('group')}
                    >
                        Group Chat
                    </button>
                </div>
            )}

            {chatType && (
                <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t">
                    <MessageComposer
                        isGroupChat={chatType === 'group'}
                        onSendMessage={(messageData) => {
                            console.log('Message sent:', messageData);
                            setChatType(null); // Close the composer after sending the message
                        }}
                    />
                </div>
            )}
        </div>
    );
}
