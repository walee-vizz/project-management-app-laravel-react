
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from '@/Components/SelectInput';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP, TASK_PRIORITY_TEXT_MAP } from '@/constants';

export default function Create({ auth, users, projects }) {

    const { data, setData, post, errors, reset } = useForm({
        'name': '',
        'image': '',
        'description': '',
        'due_date': '',
        'status': '',
        'priority': '',
        'assigned_user_id': '',
        'project_id': ''
    })

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log('data submitted :', data);
        post(route('tasks.store'), data);
        // console.log('data submitted errors:', errors);
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Create Task
                    </h2>
                    <Link
                        href={route("tasks.index")}
                        className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                    >
                        Back
                    </Link>
                </div>
            }
        >
            <Head title="Tasks - Create" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {/* Form */}
                        <form onSubmit={onSubmit} className='p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg'  >
                            <div className="mt-4">
                                <InputLabel htmlFor="project" value="Project" />
                                <SelectInput
                                    name="project_id"
                                    id="project"
                                    className={`block w-full mt-1 cursor-pointer ${errors.project_id ? 'border-red-500' : ''}`}
                                    placeholder="Select project"
                                    options={projects.data.map(project => ({ value: project.id, label: project.name }))}
                                    onChange={(selectedOption) => setData("project_id", selectedOption ? selectedOption.value : '')}
                                />
                                <InputError message={errors.project_id} className="mt-2" />
                            </div>
                            <div className='mt-3'>
                                <InputLabel htmlFor="name" value="Task Name" />
                                <TextInput id="name" type="text" name="name" value={data.name} className={"w-full mt-1 " + (errors.name ? 'border-red-500' : '')} isFocused={true} onChange={e => setData('name', e.target.value)} />
                                <InputError message={errors.name} className='mt-2' />
                            </div>
                            <div className='mt-3'>
                                <InputLabel htmlFor="image" value="Task Image" />
                                <TextInput id="image" type="file" name="image" className={"w-full mt-1 form-input " + (errors.image ? 'border-red-500' : '')}
                                    onChange={e => setData('image', e.target.files[0])} />
                                <InputError message={errors.image} className='mt-2' />

                            </div>
                            <div className='mt-3'>
                                <InputLabel htmlFor="desc" value="Task Description" />
                                <TextAreaInput
                                    id="task_description"
                                    name="description"
                                    value={data.description}
                                    className={"block w-full mt-1 " + (errors.description ? 'border-red-500' : '')}
                                    onChange={(e) => setData("description", e.target.value)}
                                />
                                <InputError message={errors.description} className='mt-2' />

                                {/* <TextInput /> */}
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="task_priority" value="Task Priority" />

                                <SelectInput
                                    name="priority"
                                    id="task_priority"
                                    placeholder="Select Priority"
                                    className={`block w-full mt-1 cursor-pointer ${errors.priority ? 'border-red-500' : ''}`}
                                    options={Object.entries(TASK_PRIORITY_TEXT_MAP).map(([priority, text]) => ({
                                        value: priority,
                                        label: text
                                    }))}
                                    onChange={(selectedOption) => setData("priority", selectedOption ? selectedOption.value : '')}
                                />


                                <InputError message={errors.priority} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="assigned_user" value="Assigned User" />

                                <SelectInput
                                    name="assigned_user_id"
                                    id="assigned_user"
                                    placeholder="Select User"
                                    className={`block w-full mt-1 cursor-pointer ${errors.assigned_user_id ? 'border-red-500' : ''}`}
                                    options={users.data.map(user => ({ value: user.id, label: user.name }))}
                                    onChange={(selectedOption) => setData("assigned_user_id", selectedOption ? selectedOption.value : '')}
                                />
                                <InputError message={errors.assigned_user_id} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="task_status" value="Task Status" />
                                <SelectInput
                                    name="status"
                                    id="task_status"
                                    placeholder="Select Status"
                                    className={`block w-full mt-1 cursor-pointer ${errors.status ? 'border-red-500' : ''}`}
                                    options={Object.entries(TASK_STATUS_TEXT_MAP).map(([status, text]) => ({
                                        value: status,
                                        label: text
                                    }))}
                                    onChange={(selectedOption) => setData("status", selectedOption ? selectedOption.value : '')}
                                />

                                <InputError message={errors.status} className="mt-2" />
                            </div>
                            <div className='mt-3'>
                                <InputLabel htmlFor="due_date" value="Task Deadline" />
                                <TextInput id="due_date" type="date" name="due_date" value={data.due_date} className={"w-full mt-1 " + (errors.due_date ? 'border-red-500' : '')} onChange={e => setData('due_date', e.target.value)} />
                                <InputError message={errors.due_date} className='mt-2' />

                            </div>
                            <div className="mt-4 text-right">
                                <Link
                                    href={route("tasks.index")}
                                    className="px-3 py-1 mr-2 text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200"
                                >
                                    Cancel
                                </Link>
                                <button type='submit' className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
