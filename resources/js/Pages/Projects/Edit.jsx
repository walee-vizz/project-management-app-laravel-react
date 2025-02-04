
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from '@/Components/SelectInput';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants';

export default function Edit({ auth, project }) {

    const { data, setData, errors, reset, post } = useForm({
        'name': project.name || '',
        'description': project.description || '',
        'status': project.status || '',
        'due_date': project.due_date || '',
        'image': '',
        '_method': 'PUT'
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('projects.update', project.id), data);
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit Project "{project.name}"
                    </h2>
                    <Link
                        href={route("projects.index")}
                        className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                    >
                        Back
                    </Link>
                </div>
            }
        >
            <Head title="Projects - Edit" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {/* Form */}
                        <form onSubmit={onSubmit} className='p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg'  >
                            {project.image_path && (
                                <div className="mb-4">
                                    <img src={project.image_path} className="w-64" />
                                </div>
                            )}
                            <div className='mt-3'>
                                <InputLabel htmlFor="name" value="Project Name" />
                                <TextInput id="name" type="text" name="name" value={data.name} className={"w-full mt-1 " + (errors.name ? 'border-red-500' : '')} isFocused={true} onChange={e => setData('name', e.target.value)} />
                                <InputError message={errors.name} className='mt-2' />
                            </div>
                            <div className='mt-3'>
                                <InputLabel htmlFor="image" value="Project Image" />
                                <TextInput id="image" type="file" name="image" className={"w-full mt-1 form-input " + (errors.image ? 'border-red-500' : '')}
                                    onChange={e => setData('image', e.target.files[0])} />
                                <InputError message={errors.image} className='mt-2' />

                            </div>
                            <div className='mt-3'>
                                <InputLabel htmlFor="desc" value="Project Description" />
                                <TextAreaInput
                                    id="project_description"
                                    name="description"
                                    value={data.description}
                                    className={"block w-full mt-1 " + (errors.description ? 'border-red-500' : '')}
                                    onChange={(e) => setData("description", e.target.value)}
                                />
                                <InputError message={errors.description} className='mt-2' />

                                {/* <TextInput /> */}
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="project_status" value="Project Status" />

                                <SelectInput
                                    name="status"
                                    id="project_status"
                                    placeholder="Select Status"
                                    defaultValue={data.status}
                                    className={`block w-full mt-1 cursor-pointer ${errors.status ? 'border-red-500' : ''}`}
                                    options={Object.entries(PROJECT_STATUS_TEXT_MAP).map(([status, text]) => ({
                                        value: status,
                                        label: text
                                    }))}
                                    onChange={(selectedOption) => setData("status", selectedOption ? selectedOption.value : '')}
                                />

                                <InputError message={errors.status} className="mt-2" />
                            </div>
                            <div className='mt-3'>
                                <InputLabel htmlFor="due_date" value="Project Due Date" />
                                <TextInput id="due_date" type="date" name="due_date" value={data.due_date} className={"w-full mt-1 " + (errors.due_date ? 'border-red-500' : '')} onChange={e => setData('due_date', e.target.value)} />
                                <InputError message={errors.due_date} className='mt-2' />

                            </div>
                            <div className="mt-4 text-right">
                                <Link
                                    href={route("projects.index")}
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
