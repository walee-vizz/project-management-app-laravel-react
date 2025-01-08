<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();
        $sort_by = request('sortBy', 'created_at');
        $sort_dir = request('sortDir', 'DESC');


        $query->where(function ($q) {
            if (request('search')) {
                $q->where('name', 'like', '%' . request('search') . '%')
                    ->orWhere('email', 'like', '%' . request('search') . '%');
            }
        });


        if (request('from_date')) {
            $query->whereDate('created_at', '>=', request('from_date'));
        }
        if (request('to_date')) {
            $query->whereDate('created_at', '<=', request('to_date'));
        }
        session()->forget('success');

        // request()->session()->flush();
        // Session::put('error', 'Error');
        $users = $query->orderBy($sort_by, $sort_dir)
            ->paginate(15)->onEachSide(1);
        $data = [
            'users' => UserResource::collection($users),
            'queryParams' => request()->query() ?: null,

        ];
        return inertia("Users/Index", $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data = [];
        return inertia('Users/Create', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();
        $validated['email_verified_at'] = time();
        $user = User::create($validated);
        return redirect()->route('users.show', $user)->with('success', 'User created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return inertia('Users/Show', [
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {

        return inertia('Users/Edit', [
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $validated = $request->validated();
        if (!$request->password) {
            unset($validated['password']);
        }
        $user->update($validated);
        return redirect()->route('users.show', $user)->with('success', 'User updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        dd($user);
        if ($user->delete()) {
            return redirect()->route('users.index')->with('success', 'User deleted successfully');
        } else {
            return redirect()->route('users.index')->with('error', 'User failed to be deleted');
        };
    }
}
