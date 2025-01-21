<?php

namespace App\Http\Controllers;

use App\Events\ChatRoomCreatedEvent;
use Exception;
use App\Models\User;
use App\Models\Message;
use App\Models\ChatRoom;
use Illuminate\Http\Request;
use App\Events\SendMessageEvent;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ChatRoomResource;

class ChatRoomController extends Controller
{
    public function index()
    {
        // dd(ChatRoom::all());
        $query = ChatRoom::query();
        // $sort_by = request('sortBy', 'created_at');
        // $sort_dir = request('sortDir', 'DESC');


        // if (request('search')) {
        $query->where(function ($q) {
            if (request('search')) {
                $q->where('name', 'like', '%' . request('search') . '%')
                    ->orWhereHas('messages', function ($q) {
                        $q->where('message', 'like', '%' . request('search') . '%');
                    })
                    ->orWhereHas('participants', function ($q) {
                        $q->where('users.id', '!=', Auth::id());
                        $q->where('name', 'like', '%' . request('search') . '%');
                    });
            }
        });
        // }

        if (request('from_date')) {
            $query->whereDate('created_at', '>=', request('from_date'));
        }
        if (request('to_date')) {
            $query->whereDate('created_at', '<=', request('to_date'));
        }
        session()->forget('success');

        // request()->session()->flush();
        // Session::put('error', 'Error');
        $rooms = $query
            // ->orderBy($sort_by, $sort_dir)
            ->get();
        // ->paginate(15)->onEachSide(1);
        $data = [
            'rooms' => ChatRoomResource::collection($rooms),
            'queryParams' => request()->query() ?: null,

        ];
        return inertia('Chat/Index', $data);
    }
    public function get_chat_rooms()
    {
        $query = ChatRoom::query();
        $sort_by = request('sortBy', 'created_at');
        $sort_dir = request('sortDir', 'DESC');


        if (request('search')) {
            $query->where('name', 'like', '%' . request('search') . '%');
        }

        if (request('from_date')) {
            $query->whereDate('created_at', '>=', request('from_date'));
        }
        if (request('to_date')) {
            $query->whereDate('created_at', '<=', request('to_date'));
        }
        session()->forget('success');

        // request()->session()->flush();
        // Session::put('error', 'Error');
        $rooms = $query->orderBy($sort_by, $sort_dir)
            ->get();
        // ->paginate(15)->onEachSide(1);
        $data = [
            'rooms' => ChatRoomResource::collection($rooms),
            'queryParams' => request()->query() ?: null,

        ];
        // return response()->json($data);
        return inertia("rooms/Index", $data);
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
            'type' => ['required', 'string', 'in:individual,group'],
            'description' => ['nullable', 'string', 'max:255'],
            'participants' => ['nullable', 'array'],
            'participants.*' => ['integer', 'exists:users,id'], // Validate each participant ID
        ]);
        try {
            $validated['participants'][] = Auth::id();
            // dd($validated);
            $room = ChatRoom::create($validated);
            if ($room) {
                $room->participants()->sync($validated['participants'] ?? []); // Sync participants with the chat room
                broadcast(new ChatRoomCreatedEvent($room));
                return redirect()->route('chat.index', $room);
            } else {
                return redirect()->back()->withErrors(['Error creating room']);
            }
        } catch (Exception $e) {
            // dd($e);
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
