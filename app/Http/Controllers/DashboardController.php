<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;
use App\Models\Project;
use App\Enums\TaskStatus;
use App\Enums\ProjectStatus;
use Illuminate\Http\Request;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProjectResource;

class DashboardController extends Controller
{

    public function index()
    {
        // Retrieve the authenticated user
        $user = Auth::user();

        // Use eager loading to optimize project retrieval if there are relationships
        // $projects = ProjectResource::collection(Project::with('tasks')->get());
        $projectStatuses = Project::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');
        $pendingProjects = $projectStatuses[ProjectStatus::PENDING] ?? 0;
        $inProgressProjects = $projectStatuses[ProjectStatus::INPROGRESS] ?? 0;
        $completedProjects = $projectStatuses[ProjectStatus::COMPLETED] ?? 0;
        $totalProjectsCount = $pendingProjects + $completedProjects + $inProgressProjects;

        $projects = [
            'pendingProjects' => $pendingProjects,
            'inProgressProjects' => $inProgressProjects,
            'completedProjects' => $completedProjects,
            'totalProjectsCount' => $totalProjectsCount,
        ];
        // Use eager loading for tasks as well
        // $tasks = TaskResource::collection(Task::with('relatedModel1', 'relatedModel2')->get());

        // Group the task status queries to reduce the number of queries to the database
        $taskStatuses = Task::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');

        // Get task counts by status
        $pendingTasks = $taskStatuses[TaskStatus::PENDING] ?? 0;
        $inProgressTasks = $taskStatuses[TaskStatus::INPROGRESS] ?? 0;
        $completedTasks = $taskStatuses[TaskStatus::COMPLETED] ?? 0;
        $totalTasksCount = $pendingTasks + $completedTasks + $inProgressTasks;

        $tasks = [
            'pendingTasks' => $pendingTasks,
            'inProgressTasks' => $inProgressTasks,
            'completedTasks' => $completedTasks,
            'totalTasksCount' => $totalTasksCount,
        ];

        return Inertia::render('Dashboard', compact('user', 'projects', 'tasks'));
    }
}
