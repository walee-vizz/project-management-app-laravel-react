<?php

namespace App\Events;

use App\Http\Resources\UserResource;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SendMessageEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $message;
    protected $sender;
    protected $recipient;
    /**
     * Create a new event instance.
     */
    public function __construct($sender, $recipient, $message)
    {
        $this->sender = $sender;
        $this->recipient = $recipient;
        $this->sender = new UserResource($this->sender);
        $this->recipient = new UserResource($this->recipient);
        $this->message = $message;
    }


    public function broadcastWith()
    {
        return [
            'sender' => $this->sender,
            'recipient' => $this->recipient,
            'message' => $this->message,
        ];
    }


    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('chat'),
        ];
    }
}
