import React, { useEffect, useState } from 'react';
import UserSelectDropdown from './Users/UserSelectDropdown';

export default function MessageComposer({ auth, isGroupChat, onSendMessage }) {
    const [message, setMessage] = useState('');
    const [selectedUsersList, setSelectedUsersList] = useState([]);

    const handleSend = () => {
        console.log('user :', auth?.user);
        const messageData = {
            message,
            recipients: selectedUsersList,
        };
        onSendMessage(messageData);
        setMessage('');
    };

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('data submitted :', data);

        axios.post(route('chat.send_message'), data)
            .then(response => {
                console.log('Message sent successfully', response.data);
                // data.message = '';
                setData('message', '');
                // Handle success, maybe update the UI or show a success message
            })
            .catch(error => {
                console.error('Error sending message', error.response.data);

                // Handle error, maybe show an error message
            });
    };
    return (
        <div className="p-4 border rounded shadow-lg">
            <UserSelectDropdown isMulti={isGroupChat} onSelectionChange={(selectedUsers) => { setSelectedUsersList(selectedUsers); }} />
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-2 mt-2 border rounded"
            />
            <button
                onClick={handleSend}
                className="px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
                Send
            </button>
        </div>
    );
}
