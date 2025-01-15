<?php

use App\Models\User;
use Inertia\Inertia;
use App\Events\SendMessageEvent;
use App\Http\Controllers\ChatRoomController;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\DashboardController;

Route::redirect('/', 'dashboard');


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    // Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    Route::resource('projects', ProjectController::class);
    Route::get('tasks/my-tasks', [TaskController::class, 'my_tasks'])->name('tasks.my_tasks');
    Route::resource('tasks', TaskController::class);
    Route::resource('users', UserController::class);
});
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::controller(ChatRoomController::class)->prefix('chat')->name('chat.')->group(function () {

        Route::get('/', 'index')->name('index');
        Route::get('/room/create', 'create')->name('room.create');
        Route::post('/room/store', 'store')->name('room.store');
        Route::get('/room/{room}',  'show')->name('room');
        Route::post('/send-message',  'send_message')->name('send_message');
    });
});

Route::get('/dispatch/event', function () {
    $sender = User::find(1);
    $recipient = User::find(2);
    // dd($sender, $recipient);
    broadcast(new SendMessageEvent($sender, $recipient, 'Hello from Laravel Event!'));
});


Route::get('/chat/room', function () {
    return inertia('Chat/Room');
});

require __DIR__ . '/auth.php';
