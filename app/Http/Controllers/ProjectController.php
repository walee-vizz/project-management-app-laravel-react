<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Support\Str;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProjectResource;
use Illuminate\Support\Facades\Session;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();
        $sort_by = request('sortBy', 'created_at');
        $sort_dir = request('sortDir', 'DESC');


        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }


        if (request('start_date')) {
            $query->whereDate('created_at', '>=', request('start_date'));
        }
        if (request('end_date')) {
            $query->whereDate('created_at', '<=', request('end_date'));
        }
        session()->forget('success');

        // request()->session()->flush();
        // Session::put('error', 'Error');
        $projects = $query->orderBy($sort_by, $sort_dir)
            ->paginate(15)->onEachSide(1);
        $data = [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,

        ];
        return inertia("Projects/Index", $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data = [];
        return inertia('Projects/Create', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        // dd($request->all());
        $image = $request->file('image') ?? null;
        $validated = $request->validated();
        $validated['created_by'] = Auth::id();
        $validated['updated_by'] = Auth::id();
        if ($image) {
            $file_name = Str::random() . '-' . $image->getClientOriginalName();
            $uploaded = $image->store('projects', 'public');
            $validated['image_path'] = $uploaded;
        }
        $project = Project::create($validated);

        return redirect()->route('projects.index', $project->id)->with('success', 'Project created successfully');
        dd($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();
        $sort_by = request('sortBy', 'created_at');
        $sort_dir = request('sortDir', 'DESC');


        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }


        if (request('start_date')) {
            $query->whereDate('created_at', '>=', request('start_date'));
        }
        if (request('end_date')) {
            $query->whereDate('created_at', '<=', request('end_date'));
        }


        $tasks = $query->orderBy($sort_by, $sort_dir)
            ->paginate(15)->onEachSide(1);
        $data = [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'project' => new ProjectResource($project),

        ];
        return  inertia('Projects/Show', $data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $data = [
            'project' => new ProjectResource($project),
        ];
        return  inertia('Projects/Edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        dd($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        if ($project->delete()) {
            return redirect()->route('projects.index')->with('success', 'Project deleted successfully');
        } else {
            return redirect()->route('projects.index')->with('error', 'Project failed to be deleted');
        }
    }
}
