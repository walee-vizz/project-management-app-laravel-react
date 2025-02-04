
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, user }) {

    const { data, setData, errors, reset, post } = useForm({
        'name': user.name || '',
        'email': user.email || '',
        'password': '',
        'password_confirmation': '',
        '_method': 'PUT'
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('users.update', user.id), data);
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit User "{user.name}"
                    </h2>
                    <Link
                        href={route("users.index")}
                        className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                    >
                        Back
                    </Link>
                </div>
            }
        >
            <Head title="Users - Edit" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {/* Form */}
                        <form onSubmit={onSubmit} className='p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg'  >
                            <div className='mt-3'>
                                <InputLabel htmlFor="name" value="User Name" />
                                <TextInput id="name" type="text" isFocused={true} name="name" value={data.name} className={"w-full mt-1 " + (errors.name ? 'border-red-500' : '')} isFocused={true} onChange={e => setData('name', e.target.value)} />
                                <InputError message={errors.name} className='mt-2' />
                            </div>
                            <div className='mt-3'>
                                <InputLabel htmlFor="email" value="User Email" />
                                <TextInput id="email" type="email" name="email" value={data.email} className={"w-full mt-1 form-input " + (errors.email ? 'border-red-500' : '')}
                                    onChange={e => setData('email', e.target.value)} />
                                <InputError message={errors.email} className='mt-2' />

                            </div>
                            <div className='mt-3'>
                                <InputLabel htmlFor="desc" value="Password" />
                                <TextInput id="password" type="password" name="password" className={"w-full mt-1 form-input " + (errors.password ? 'border-red-500' : '')}
                                    onChange={e => setData('password', e.target.value)} />
                                <InputError message={errors.password} className='mt-2' />

                                {/* <TextInput /> */}
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="user_status" value="Password Confirmation" />
                                <TextInput id="password_confirmation" type="password" name="password_confirmation" className={"w-full mt-1 form-input " + (errors.password_confirmation ? 'border-red-500' : '')}
                                    onChange={e => setData('password_confirmation', e.target.value)} />


                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                            <div className="mt-4 text-right">
                                <Link
                                    href={route("users.index")}
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
