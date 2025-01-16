import Alert from '@/Components/Alert';
import Pagination from '@/Components/Pagination';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@headlessui/react';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Room from './Room';

export default function Index({ auth, sessionParams, rooms: initialRooms, queryParams = null, session = null }) {


    // console.log('rooms fetched :', initialRooms);
    const [rooms, setRooms] = useState(initialRooms?.data?.length ? initialRooms?.data : []);
    // console.log('rooms fetched 2 :', rooms);

    sessionParams = sessionParams || {};
    queryParams = queryParams || {};
    // console.log('rooms to be selected :', rooms[1]);
    const sortByField = queryParams.sortBy || 'created_at';
    const sortDir = queryParams.sortDir || 'DESC';
    const [selectedRoom, setSelectedRoom] = useState(null);
    // console.log('rooms selected :', selectedRoom);
    useEffect(() => {
        setRooms(rooms);
        const channel = Echo.channel('chat');

        channel.listen('ChatRoomCreatedEvent', (e) => {
            console.log('New Room Created :', e);

            const chatParticipants = e.chatRoom?.participants || [];
            const thisUserExist = chatParticipants.some(participant => participant.id === auth.user.id);

            if (thisUserExist) {
                setRooms(prevRooms => [...prevRooms, e.chatRoom]);

                // if (bottomRef.current) {
                //     bottomRef.current.scrollTop = bottomRef.current.scrollHeight + 10;
                // }
            }
        });

        return () => {
            channel.stopListening('ChatRoomCreatedEvent');
        };
    }, [auth.user.id]);


    const searchFieldChanged = async (name, value) => {
        console.log('Search field changed :' + name + ' -> ' + value);
        if (name == 'submit' && value == 'submit') {
            router.get(route('rooms.index'), queryParams);
            return;
        } else if (name == 'clear' && value == 'clear') {
            if (queryParams?.page && queryParams.page > 0) {
                router.get(route('rooms.index'), { page: queryParams.page });
                return;
            }
            queryParams = {};
            router.get(route('rooms.index'));
            return;
        } else if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route('rooms.index', queryParams));
    };




    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Chat Rooms
                    </h2>
                    <Link
                        href={route("chat.room.create")}
                        className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="Rooms" />

            <div className="container mx-auto rounded-lg shadow-lg h-[700px] py-2 w-full">

                {/* <!-- Chatting --> */}
                <div className="flex flex-row justify-between bg-white h-[100%]">
                    {/* <!-- chat list --> */}
                    <div className="w-2/5 max-w-md mx-auto overflow-hidden bg-gray-100 rounded-lg shadow-lg md:max-w-lg h-[100%]">
                        <div className="md:flex">
                            <div className="w-full p-4">
                                <div className="relative">
                                    <TextInput type="text" className="w-full h-12 px-3 rounded focus:outline-none focus:shadow-md" placeholder="Search..." />
                                    <i className="absolute text-gray-300 fa fa-search right-3 top-4"></i> </div>
                                <ul>
                                    {rooms.map((room, index) => {

                                        return (
                                            <li onClick={e => { setSelectedRoom(room) }} key={room.id} className="flex items-center justify-between p-2 mt-2 transition bg-white rounded cursor-pointer hover:shadow-lg">
                                                <div className="flex ml-2">
                                                    {/* <img src="https://i.imgur.com/aq39RMA.jpg" width="40" height="40" className="rounded-full"> */}
                                                    <div className="flex flex-col ml-2"> <span className="font-medium text-black">{room.room_name}</span> <span className="w-32 text-sm text-gray-400 truncate">{room.messages?.length > 0 ? room.messages[room.messages?.length - 1].message : room.description}</span> </div>
                                                </div>
                                                <div className="flex flex-col items-center"> <span className="text-gray-300">{room.last_message_timestamp}</span> <i className="text-green-400 fa fa-star"></i> </div>
                                            </li>

                                        );
                                    })}

                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* <!-- end chat list --> */}
                    {
                        selectedRoom?.id ? <Room room={selectedRoom} auth={auth} /> : <div className='w-full px-5'></div>
                    }

                </div>
            </div>


        </AuthenticatedLayout >
    );
}
