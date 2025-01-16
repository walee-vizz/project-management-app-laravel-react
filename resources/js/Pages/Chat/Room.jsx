
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
export default function ({ auth, room }) {
    const [messages, setMessages] = useState(room.messages?.length ? room.messages : []);
    const bottomRef = useRef(null);
    const roomType = room.type;
    console.log('Room selected:', room);
    useEffect(() => {
        setMessages(room.messages);

        const channel = Echo.channel('chat');
        channel.listen('SendMessageEvent', (e) => {
            console.log('Message Received :', e);
            // Check if the message belongs to the current chat room
            if (e.chatRoom && e.chatRoom.id === room.id) {
                // Add the new message to the messages array
                setMessages(prevMessages => [...prevMessages, e.message]);
                // Scroll to the bottom of the chat messages
                // bottomRef.current.scrollIntoView({ behavior: 'smooth' });
                bottomRef.current.scrollTop = bottomRef.current.scrollHeight + 10;

            }
        });

        // Cleanup the listener when the component is unmounted
        return () => {
            channel.stopListening('SendMessageEvent');
        };
    }, [room.id]);

    const { data, setData, post, errors, reset } = useForm({
        'message': '',
        'chat_room_id': room.id,
        'sender_id': auth.user.id,
    })
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
        <div className="flex flex-col justify-between flex-1 h-[100%] w-full px-5">
            <div className="flex justify-between px-2 py-3 border-b-2 border-gray-200 sm:items-center">
                <div className="relative flex items-center space-x-4">
                    <div className="relative">
                        <span className="absolute bottom-0 right-0 text-green-500">
                            <svg width="20" height="20">
                                <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                            </svg>
                        </span>
                        {
                            room.profile_picture != '' && <img src={room.profile_picture} alt={room.room_name} className="w-10 h-10 rounded-full sm:w-16 sm:h-16" />
                        }

                    </div>
                    <div className="flex flex-col leading-tight">
                        <div className="flex items-center mt-1 text-2xl">
                            <span className="mr-3 text-gray-700">{room?.room_name}</span>
                        </div>
                        <span className="text-lg text-gray-600">{room.room_description}</span>
                    </div>
                </div>
                {/* <div className="flex items-center space-x-2">
                            <button type="button" className="inline-flex items-center justify-center w-10 h-10 text-gray-500 transition duration-500 ease-in-out border rounded-lg hover:bg-gray-300 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                            <button type="button" className="inline-flex items-center justify-center w-10 h-10 text-gray-500 transition duration-500 ease-in-out border rounded-lg hover:bg-gray-300 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </button>
                            <button type="button" className="inline-flex items-center justify-center w-10 h-10 text-gray-500 transition duration-500 ease-in-out border rounded-lg hover:bg-gray-300 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                </svg>
                            </button>
                        </div> */}
            </div>
            <div id="messages" ref={bottomRef} className="flex flex-col p-3 space-y-4 overflow-y-auto scrolling-touch scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2">
                {messages.map((message, index) => {
                    const isLastMessage = index === messages.length - 1; // Check if this is the last message
                    const senderImage = message?.sender?.profile_picture || "";
                    return (
                        message.sender.id != auth.user.id ?
                            <div className="chat-message" key={message.id}>
                                <div className="flex items-end">
                                    <div className="flex flex-col items-start order-2 max-w-xs mx-2 space-y-2 text-xs">
                                        <div><span className="inline-block px-4 py-2 text-gray-600 bg-gray-300 rounded-lg rounded-bl-none">{message.message}</span></div>
                                    </div>
                                    {
                                        senderImage != '' ?
                                            <img src={senderImage} alt={message.sender.name} className="order-1 w-6 h-6 rounded-full" /> : null
                                    }

                                </div>
                            </div>
                            :
                            <div className="chat-message" key={message.id}>
                                <div className="flex items-end justify-end">
                                    <div className="flex flex-col items-end order-1 max-w-xs mx-2 space-y-2 text-xs">
                                        <div><span className="inline-block px-4 py-2 text-white bg-blue-600 rounded-lg rounded-br-none ">{message.message}</span></div>
                                    </div>
                                    {
                                        senderImage != '' ?
                                            <img src={senderImage} alt={message.sender.name} className="order-1 w-6 h-6 rounded-full" /> : null
                                    }
                                </div>
                            </div>
                    )
                })

                }

            </div>
            <div className="px-4 pt-4 mb-2 border-t-2 border-gray-200 sm:mb-0">
                <div className="relative flex">
                    {/* <span className="absolute inset-y-0 flex items-center">
                                <button type="button" className="inline-flex items-center justify-center w-12 h-12 text-gray-500 transition duration-500 ease-in-out rounded-full hover:bg-gray-300 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                                    </svg>
                                </button>
                            </span> */}
                    <TextInput type="text" value={data.message} placeholder="Write your message!"
                        name="message" className="w-full py-3 pl-12 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md focus:outline-none focus:placeholder-gray-400"
                        isFocused={true} onChange={e => setData('message', e.target.value)}
                        onKeyUp={e => {
                            if (e.key === 'Enter') {
                                // Your logic for when the Enter key is pressed
                                console.log('Enter key pressed');
                                sendMessage(e);
                                // For example, submit the message
                            }
                        }} />
                    <InputError message={errors.message} />
                    <div className="absolute inset-y-0 right-0 items-center hidden sm:flex">
                        {/* <button type="button" className="inline-flex items-center justify-center w-10 h-10 text-gray-500 transition duration-500 ease-in-out rounded-full hover:bg-gray-300 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                                    </svg>
                                </button>
                                <button type="button" className="inline-flex items-center justify-center w-10 h-10 text-gray-500 transition duration-500 ease-in-out rounded-full hover:bg-gray-300 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                </button>
                                <button type="button" className="inline-flex items-center justify-center w-10 h-10 text-gray-500 transition duration-500 ease-in-out rounded-full hover:bg-gray-300 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </button> */}
                        <button onClick={e => { sendMessage(e) }} type="button" className="inline-flex items-center justify-center px-4 py-3 text-white transition duration-500 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none">
                            <span className="font-bold">Send</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 ml-2 transform rotate-90">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}
