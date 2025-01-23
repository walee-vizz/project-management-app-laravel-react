import Alert from '@/Components/Alert';
import Pagination from '@/Components/Pagination';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@headlessui/react';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Room from './Room';
import ChatButton from '@/Components/ChatButton';
import ChatRoomList from '@/Components/Chat/ChatRoomList';
export default function Index({ auth, sessionParams, rooms: initialRooms, queryParams = null, session = null }) {


    const [rooms, setRooms] = useState(initialRooms?.data?.length ? initialRooms?.data : []);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const updateURLParam = (key, value) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(key, value);
        const newRelativePathQuery = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.pushState(null, '', newRelativePathQuery);
    };
    useEffect(() => {
        if (queryParams?.chat && rooms.length > 0) {
            // console.log('room param :', queryParams?.chat);
            const room = rooms.find(room => room.id == queryParams?.chat);
            if (room) {
                // console.log('room param found:', room);

                setSelectedRoom(room);
                // router.get(route('chat.index', queryParams));

            }
        }
        console.log('query updated :', queryParams);
    }, [queryParams, rooms]);

    useEffect(() => {

        if (selectedRoom?.id) {
            queryParams.chat = selectedRoom?.id;
            updateURLParam('chat', selectedRoom?.id);
        } else {

        }
    }, [selectedRoom?.id]);




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
                    {/* <div className="w-2/5 max-w-md mx-auto  bg-gray-100 rounded-lg shadow-lg md:max-w-lg h-[100%]">
                        <div className="overflow-auto md:flex h-[100%]">
                            <div className="w-full p-4">
                                <div className="sticky top-0">
                                    <TextInput type="text" defaultValue={queryParams?.search || ''}
                                        isFocused={false}
                                        onKeyPress={e => onKeyPress('search', e)}
                                        className="w-full h-12 px-3 rounded focus:outline-none focus:shadow-md" placeholder="Search..." />
                                    <i className="absolute text-gray-300 fa fa-search right-3 top-4"></i>
                                </div>
                                <ul>
                                    {rooms.map((room, index) => {

                                        return (
                                            <li onClick={e => { setSelectedRoom(room) }} key={room.id} className="flex items-center justify-between p-2 mt-2 transition bg-white rounded cursor-pointer hover:shadow-lg">
                                                <div className="flex ml-2">
                                                    <div className="flex flex-col ml-2"> <span className="font-medium text-black">{room.room_name}</span> <span className="w-32 text-sm text-gray-400 truncate">{room.messages?.length > 0 ? room.messages[room.messages?.length - 1].message : room.description}</span> </div>
                                                </div>
                                                <div className="flex flex-col items-center"> <span className="text-gray-300">{room.last_message_timestamp}</span> <i className="text-green-400 fa fa-star"></i> </div>
                                            </li>

                                        );
                                    })}

                                </ul>
                            </div>
                        </div>
                        <ChatButton />
                    </div> */}
                    <ChatRoomList className="w-[25%]" withSearch={true} user={auth.user} auth={auth} onSelection={(val) => { setSelectedRoom(val) }} />
                    {/* <!-- end chat list --> */}
                    {
                        selectedRoom?.id ? <Room room={selectedRoom} auth={auth} /> : <div className='w-full px-5'></div>
                    }

                </div>
            </div>


        </AuthenticatedLayout >
    );
}
