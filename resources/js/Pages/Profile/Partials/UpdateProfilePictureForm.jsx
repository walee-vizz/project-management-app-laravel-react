import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast'; // Import toast
export default function UpdateProfilePictureForm({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            picture: user.profile_picture,
            user_id: user.id,
            user_name: user.name,
        });

    const submit = (e) => {
        e.preventDefault();
        console.log(data); // Log the data being sent
        // post(route('profile.update_picture'), data);
        post(route('profile.update_picture'), {
            ...data,
            onSuccess: () => {
                // Show success toast
                toast.success('Profile picture updated successfully!');
            },
            onError: (errors) => {
                console.log(errors);
                // Show error toast
                toast.error('Failed to update profile picture. Please try again.');
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Picture
                </h2>
                <div className="mb-1">
                    {user.profile_picture &&
                        <img
                            className="object-cover w-20 h-20 rounded-full"
                            src={user.profile_picture}
                            alt={user.name}
                        />
                    }
                </div>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    {/* <TextInput
                        type="file"
                        id="picture"
                        className="block w-full mt-1"
                        onChange={(e) => setData('picture', e.target.files[0])}
                    /> */}
                    <TextInput id="picture" type="file" name="picture" className={"w-full mt-1 form-input " + (errors.picture ? 'border-red-500' : '')}
                        onChange={e => setData('picture', e.target.files[0])} />
                    <InputError className="mt-2" message={errors.picture} />
                </div>


                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
