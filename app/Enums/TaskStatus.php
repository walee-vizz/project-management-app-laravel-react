<?php

namespace App\Enums;

class TaskStatus
{
    const PENDING = 'pending';
    const INPROGRESS = 'in_progress';
    const COMPLETED = 'completed';

    public static function getValues()
    {
        return [
            self::PENDING,
            self::INPROGRESS,
            self::COMPLETED,
        ];
    }
}
