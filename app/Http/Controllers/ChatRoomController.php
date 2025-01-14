<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Models\Message;
use App\Models\ChatRoom;
use Illuminate\Http\Request;
use App\Events\SendMessageEvent;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\UserResource;
use App\Http\Resources\ChatRoomResource;

class ChatRoomController extends Controller
{
    public function index()
    {
        $rooms = ChatRoomResource::collection(ChatRoom::all());
        $data = [
            'rooms' => $rooms,
        ];
        return inertia('Chat/Index', $data);
    }

    public function create()
    {
        $data = [
            'users' => UserResource::collection(User::all()),
        ];
        return inertia('Chat/Create', $data);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:255'],
            'participants' => ['nullable', 'array'],
            'participants.*' => ['integer', 'exists:users,id'], // Validate each participant ID
        ]);
        try {
            // dd($validated);
            $room = ChatRoom::create($validated);
            if ($room) {
                $room->participants()->sync($validated['participants'] ?? []); // Sync participants with the chat room
                return redirect()->route('chat.room', $room);
            } else {
                return redirect()->back()->withErrors(['Error creating room']);
            }
        } catch (Exception $e) {
            // Log the error for debugging purposes
            Log::error('Error occured while creating a chat room : ' . $e->getMessage());
            return redirect()->route('chat.index')->with('error', 'An error occurred while creating the chat room. Please try again.');
        }
    }

    public function show(ChatRoom $room)
    {
        $data = [
            'room' => new ChatRoomResource($room),
        ];
        return inertia('Chat/Room', $data);
    }

    public function send_message(Request $request)
    {
        $validated = $request->validate([
            'chat_room_id' => ['required', 'integer', 'exists:chat_rooms,id'],
            'sender_id' => ['required', 'integer', 'exists:users,id'],
            'message' => ['required', 'string', 'max:255'],
        ]);
        try {
            $message = Message::create($validated);

            if ($message) {
                // Broadcast the new message to all connected clients
                broadcast(new SendMessageEvent($message));
                // return inertia(route('chat.room', $validated['chat_room_id']));
                return response()->json(['message' => 'Message sent successfully'], 200);
            } else {
                return response()->json(['error' => 'Error sending message'], 500);
            }
        } catch (Exception $e) {
            // Log the error for debugging purposes
            Log::error('Error occured while sending a message : ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while sending the message. Please try again.'], 500);
        }
    }
}
