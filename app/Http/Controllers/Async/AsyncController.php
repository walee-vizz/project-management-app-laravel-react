<?php

namespace App\Http\Controllers\Async;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

class AsyncController extends Controller
{
    public function get_users()
    {
        $users = UserResource::collection(User::all(['id', 'name'])); // Fetch only the necessary fields
        return response()->json($users);
    }
}
