import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfilePictureForm({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            picture: user.profile_picture
        });

    const submit = (e) => {
        e.preventDefault();

        post(route('profile.update_picture'), data);
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
                    <TextInput
                        type="file"
                        id="picture"
                        className="block w-full mt-1"
                        onChange={(e) => setData('picture', e.target.files[0])}
                        required
                        isFocused
                    />

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
