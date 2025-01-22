import Alert from '@/Components/Alert';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import { useState, useEffect } from 'react';
import ChatButton from '@/Components/ChatButton';
export default function ChatRoomList({ auth, user, withSearch = false, onSelection }) {


    const currentUserId = user?.id ? user.id : auth?.user?.id;
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [search, setSearch] = useState('');
    const fetchRooms = async (userId = currentUserId, searchQuery = null) => {
        try {
            let payload = {
                user_id: userId ? userId : auth.user.id,
            }
            if (searchQuery) {
                payload.search = searchQuery;
            }
            const response = await axios.get(route('async.get_user_chat_rooms'), {
                params: payload,
            });            // Adjust the URL as necessary
            setRooms(response.data);
        } catch (error) {
            console.error('Error fetching user Chat rooms:', error);
        }
    };
    useEffect(() => {
        fetchRooms();
    }, [auth, user]);


    useEffect(() => {
        if (onSelection) {
            onSelection(selectedRoom);
        }
    }, [selectedRoom?.id]);


    useEffect(() => {
        const channel = Echo.channel('chat');

        channel.listen('ChatRoomCreatedEvent', (e) => {
            const chatParticipants = e.chatRoom?.participants || [];
            const thisUserExist = chatParticipants.some(participant => participant.id === auth?.user?.id);

            if (thisUserExist) {
                setRooms(prevRooms => [...prevRooms, e.chatRoom]);
            }
        });

        return () => {
            channel.stopListening('ChatRoomCreatedEvent');
        };
    }, [auth.user.id]);


    const searchChatRooms = async (value = '') => {
        if (value) {
            fetchRooms(currentUserId, value);
        } else {
            fetchRooms();
        }
    };

    const onKeyPress = async (name, e) => {
        if (e.key === 'Enter') {
            searchChatRooms(e.target.value);
        }
    };


    return (
        <div className="overflow-auto h-[100%] relative" >
            <div className="w-full p-4 ">
                {
                    withSearch && (
                        <div className="sticky top-0">
                            <TextInput type="text" defaultValue={search || ''}
                                isFocused={false}
                                onChange={e => { setSearch(e.target.value) }}
                                onKeyPress={e => onKeyPress('search', e)}
                                className="w-full h-12 px-3 rounded focus:outline-none focus:shadow-md" placeholder="Search..." />
                            <i className="absolute text-gray-300 fa fa-search right-3 top-4"></i>
                        </div>
                    )
                }
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
            <ChatButton />
        </div>
    );
}
