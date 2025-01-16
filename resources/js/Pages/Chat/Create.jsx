
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from '@/Components/SelectInput';

export default function Create({ auth, users }) {

    const { data, setData, post, errors, reset } = useForm({
        'name': '',
        'type': '',
        'description': '',
        'participants': '',
    })
    const typeOptions = [
        {
            value: 'group',
            label: 'Group'
        },
        {
            value: 'individual',
            label: 'Individual'
        }
    ];
    const onSubmit = (e) => {
        e.preventDefault();
        console.log('data submitted :', data);
        post(route('chat.room.store'), data);
        // console.log('data submitted errors:', errors);
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Create Chat Room
                    </h2>
                    <Link
                        href={route("chat.index")}
                        className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                    >
                        Back
                    </Link>
                </div>
            }
        >
            <Head title="Chat Room - Create" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {/* Form */}
                        <form onSubmit={onSubmit} className='p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg'  >

                            <div className='mt-3'>
                                <InputLabel htmlFor="name" value="Room Name" />
                                <TextInput id="name" type="text" name="name" value={data.name} className={"w-full mt-1 " + (errors.name ? 'border-red-500' : '')} isFocused={true} onChange={e => setData('name', e.target.value)} />
                                <InputError message={errors.name} className='mt-2' />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="type" value="Chat Type" />
                                <SelectInput
                                    name="type"
                                    id="type"
                                    placeholder="Select Type"
                                    className={`block w-full mt-1 cursor-pointer ${errors.type ? 'border-red-500' : ''}`}
                                    options={typeOptions}
                                    onChange={(selectedOption) => setData("type", selectedOption ? selectedOption.value : '')}
                                />
                                <InputError message={errors.type} className="mt-2" />
                            </div>
                            <div className='mt-3'>
                                <InputLabel htmlFor="room_description" value="Room Description" />
                                <TextAreaInput
                                    id="room_description"
                                    name="description"
                                    value={data.description}
                                    className={"block w-full mt-1 " + (errors.description ? 'border-red-500' : '')}
                                    onChange={(e) => setData("description", e.target.value)}
                                />
                                <InputError message={errors.description} className='mt-2' />

                                {/* <TextInput /> */}
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="participants" value="participants" />
                                <SelectInput
                                    name="participants"
                                    id="participants"
                                    isMulti={true}
                                    className={`block w-full mt-1 cursor-pointer ${errors.participants ? 'border-red-500' : ''}`}
                                    placeholder="Select user"
                                    options={users.data.map(user => ({ value: user.id, label: user.name }))}
                                    onChange={(selectedOptions) => {
                                        // If multiple options are selected, map them to their values
                                        const participantIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
                                        setData("participants", participantIds);
                                    }}
                                />

                                <InputError message={errors.user_id} className="mt-2" />
                            </div>

                            <div className="mt-4 text-right">
                                <Link
                                    href={route("chat.index")}
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
