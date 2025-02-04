
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ auth, user, queryParams }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        User - {user.name}
                    </h2>
                    <div>
                        <Link
                            href={route("users.edit", user.id)}
                            className="px-3 py-1 mx-2 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                        >
                            Edit
                        </Link>
                        <Link
                            href={route("users.index")}
                            className="px-3 py-1 mx-2 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                        >
                            Back
                        </Link>
                    </div>

                </div>
            }>
            <Head title={`User - ${user.name}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid grid-cols-2 gap-1 mt-2">
                                <div>
                                    <div>
                                        <label className="text-lg font-bold">User ID</label>
                                        <p className="mt-1">{user.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">User Name</label>
                                        <p className="mt-1">{user.name}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Create Date</label>
                                        <p className="mt-1">{user.created_at}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">Email Verified At</label>
                                        <p className="mt-1">{user.email_verified_at}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
