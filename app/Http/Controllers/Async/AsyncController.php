<?php

namespace App\Http\Controllers\Async;

use App\Models\User;
use App\Models\ChatRoom;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ChatRoomResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

class AsyncController extends Controller
{
    public function get_users()
    {
        $users = UserResource::collection(User::all(['id', 'name'])); // Fetch only the necessary fields
        return response()->json($users);
    }

    public function get_user_chat_rooms(Request $request)
    {
        $user_id = $request->user_id;
        $search = $request->search;
        // $rooms = ChatRoom::with('messages', 'participants')->whereHas('participants', function ($q) {
        //     $q->where('users.id', Auth::id());
        // })->get();
        $query = ChatRoom::query();

        $query->where(function ($q) use ($search, $user_id) {
            if ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhereHas('messages', function ($q) use ($search) {
                        $q->where('message', 'like', '%' . $search . '%');
                    })
                    ->orWhereHas('participants', function ($q) use ($search) {
                        $q->where('name', 'like', '%' . $search . '%');
                    });
            }
            if ($user_id) {
                $q->whereHas('participants', function ($q) use ($user_id) {
                    $q->where('users.id', $user_id);
                });
            }
        });
        $rooms = $query
            // ->orderBy($sort_by, $sort_dir)
            ->get();
        $rooms = ChatRoomResource::collection($rooms);
        return response()->json($rooms);
    }
}
