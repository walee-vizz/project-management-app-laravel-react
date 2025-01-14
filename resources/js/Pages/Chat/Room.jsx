
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
export default function ({ auth, room }) {
    Echo.channel('chat').listen('SendMessageEvent', (e) => {
        console.log('Message Recieved :', e);
        // Handle the event
    });

    console.log('room data :', room);
    return (

        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <Link
                        href={route("chat.index")}
                        className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                    >
                        Back
                    </Link>
                </div>
            }
        >
            <Head title={"Chat Room - " + room.name} />

            {/* component */}
            <div className="container p-4">
                <div className="flex flex-col justify-between flex-1 h-screen p:2 sm:p-6 w-[80%] mx-auto h-100">
                    <div className="flex justify-between py-3 border-b-2 border-gray-200 sm:items-center">
                        <div className="relative flex items-center space-x-4">
                            <div className="relative">
                                <span className="absolute bottom-0 right-0 text-green-500">
                                    <svg width="20" height="20">
                                        <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                                    </svg>
                                </span>
                                {/* <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="" className="w-10 h-10 rounded-full sm:w-16 sm:h-16"> */}
                            </div>
                            <div className="flex flex-col leading-tight">
                                <div className="flex items-center mt-1 text-2xl">
                                    <span className="mr-3 text-gray-700">Anderson Vanhron</span>
                                </div>
                                <span className="text-lg text-gray-600">Junior Developer</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
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
                        </div>
                    </div>
                    <div id="messages" className="flex flex-col p-3 space-y-4 overflow-y-auto scrolling-touch scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2">
                        <div className="chat-message">
                            <div className="flex items-end">
                                <div className="flex flex-col items-start order-2 max-w-xs mx-2 space-y-2 text-xs">
                                    <div><span className="inline-block px-4 py-2 text-gray-600 bg-gray-300 rounded-lg rounded-bl-none">Can be verified on any platform using docker</span></div>
                                </div>
                                {/* <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="order-1 w-6 h-6 rounded-full"> */}
                            </div>
                        </div>
                        <div className="chat-message">
                            <div className="flex items-end justify-end">
                                <div className="flex flex-col items-end order-1 max-w-xs mx-2 space-y-2 text-xs">
                                    <div><span className="inline-block px-4 py-2 text-white bg-blue-600 rounded-lg rounded-br-none ">Your error message says permission denied, npm global installs must be given root privileges.</span></div>
                                </div>
                                {/* <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="order-2 w-6 h-6 rounded-full"> */}
                            </div>
                        </div>
                        <div className="chat-message">
                            <div className="flex items-end">
                                <div className="flex flex-col items-start order-2 max-w-xs mx-2 space-y-2 text-xs">
                                    <div><span className="inline-block px-4 py-2 text-gray-600 bg-gray-300 rounded-lg">Command was run with root privileges. I'm sure about that.</span></div>
                                    <div><span className="inline-block px-4 py-2 text-gray-600 bg-gray-300 rounded-lg">I've update the description so it's more obviously now</span></div>
                                    <div><span className="inline-block px-4 py-2 text-gray-600 bg-gray-300 rounded-lg">FYI https://askubuntu.com/a/700266/510172</span></div>
                                    <div>
                                        <span className="inline-block px-4 py-2 text-gray-600 bg-gray-300 rounded-lg rounded-bl-none">
                                            Check the line above (it ends with a # so, I'm running it as root )
                                            <pre># npm install -g @vue/devtools</pre>
                                        </span>
                                    </div>
                                </div>
                                {/* <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="order-1 w-6 h-6 rounded-full"> */}
                            </div>
                        </div>
                        <div className="chat-message">
                            <div className="flex items-end justify-end">
                                <div className="flex flex-col items-end order-1 max-w-xs mx-2 space-y-2 text-xs">
                                    <div><span className="inline-block px-4 py-2 text-white bg-blue-600 rounded-lg rounded-br-none ">Any updates on this issue? I'm getting the same error when trying to install devtools. Thanks</span></div>
                                </div>
                                {/* <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="order-2 w-6 h-6 rounded-full"> */}
                            </div>
                        </div>
                        <   div className="chat-message">
                            <div className="flex items-end">
                                <div className="flex flex-col items-start order-2 max-w-xs mx-2 space-y-2 text-xs">
                                    <div><span className="inline-block px-4 py-2 text-gray-600 bg-gray-300 rounded-lg rounded-bl-none">Thanks for your message David. I thought I'm alone with this issue. Please, ? the issue to support it :)</span></div>
                                </div>
                                {/* <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="order-1 w-6 h-6 rounded-full"> */}
                            </div>
                        </div>
                        <div className="chat-message">
                            <div className="flex items-end justify-end">
                                <div className="flex flex-col items-end order-1 max-w-xs mx-2 space-y-2 text-xs">
                                    <div><span className="inline-block px-4 py-2 text-white bg-blue-600 rounded-lg ">Are you using sudo?</span></div>
                                    <div><span className="inline-block px-4 py-2 text-white bg-blue-600 rounded-lg rounded-br-none ">Run this command sudo chown -R `whoami` /Users//.npm-global/ then install the package globally without using sudo</span></div>
                                </div>
                                {/* <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="order-2 w-6 h-6 rounded-full"> */}
                            </div>
                        </div>
                        <div className="chat-message">
                            <div className="flex items-end">
                                <div className="flex flex-col items-start order-2 max-w-xs mx-2 space-y-2 text-xs">
                                    <div><span className="inline-block px-4 py-2 text-gray-600 bg-gray-300 rounded-lg">It seems like you are from Mac OS world. There is no /Users/ folder on linux ?</span></div>
                                    <div><span className="inline-block px-4 py-2 text-gray-600 bg-gray-300 rounded-lg rounded-bl-none">I have no issue with any other packages installed with root permission globally.</span></div>
                                </div>
                                {/* <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="order-1 w-6 h-6 rounded-full"> */}
                            </div>
                        </div>
                        <div className="chat-message">
                            <div className="flex items-end justify-end">
                                <div className="flex flex-col items-end order-1 max-w-xs mx-2 space-y-2 text-xs">
                                    <div><span className="inline-block px-4 py-2 text-white bg-blue-600 rounded-lg rounded-br-none ">yes, I have a mac. I never had issues with root permission as well, but this helped me to solve the problem</span></div>
                                </div>
                                {/* <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="order-2 w-6 h-6 rounded-full"> */}
                            </div>
                        </div>
                        <div className="chat-message">
                            <div className="flex items-end">
                                <div className="flex flex-col items-start order-2 max-w-xs mx-2 space-y-2 text-xs">
                                    <div><span className="inline-block px-4 py-2 text-gray-600 bg-gray-300 rounded-lg">I get the same error on Arch Linux (also with sudo)</span></div>
                                    <div><span className="inline-block px-4 py-2 text-gray-600 bg-gray-300 rounded-lg">I also have this issue, Here is what I was doing until now: #1076</span></div>
                                    <div><span className="inline-block px-4 py-2 text-gray-600 bg-gray-300 rounded-lg rounded-bl-none">even i am facing</span></div>
                                </div>
                                {/* <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="order-1 w-6 h-6 rounded-full"> */}
                            </div>
                        </div>
                    </div>
                    <div className="px-4 pt-4 mb-2 border-t-2 border-gray-200 sm:mb-0">
                        <div className="relative flex">
                            <span className="absolute inset-y-0 flex items-center">
                                <button type="button" className="inline-flex items-center justify-center w-12 h-12 text-gray-500 transition duration-500 ease-in-out rounded-full hover:bg-gray-300 focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                                    </svg>
                                </button>
                            </span>
                            {/* <input type="text" placeholder="Write your message!" className="w-full py-3 pl-12 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md focus:outline-none focus:placeholder-gray-400"> */}
                            <div className="absolute inset-y-0 right-0 items-center hidden sm:flex">
                                <button type="button" className="inline-flex items-center justify-center w-10 h-10 text-gray-500 transition duration-500 ease-in-out rounded-full hover:bg-gray-300 focus:outline-none">
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
                                </button>
                                <button type="button" className="inline-flex items-center justify-center px-4 py-3 text-white transition duration-500 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none">
                                    <span className="font-bold">Send</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 ml-2 transform rotate-90">
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );

}