import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, projects, tasks }) {
    const { completedTasks, inProgressTasks, pendingTasks, totalTasksCount } = tasks;
    const { pendingProjects, inProgressProjects, completedProjects, totalProjectsCount } = projects;

    Echo.channel('chat').listen('SendMessageEvent', (e) => {
        console.log('Message Recieved :', e);
        // Handle the event
    });
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                {/* Projects Overview */}
                <div className="grid grid-cols-3 gap-2 mx-auto my-3 max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-2xl font-semibold text-amber-500">
                                Pending Projects
                            </h3>
                            <p className="mt-4 text-xl">
                                <span className="mr-2">{pendingProjects}</span>
                                /
                                <span className="ml-2">{totalProjectsCount}</span>
                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-2xl font-semibold text-blue-500">
                                In Progress Projects
                            </h3>
                            <p className="mt-4 text-xl">
                                <span className="mr-2">{inProgressProjects}</span>
                                /
                                <span className="ml-2">{totalProjectsCount}</span>
                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-2xl font-semibold text-green-500">
                                Completed Projects
                            </h3>
                            <p className="mt-4 text-xl">
                                <span className="mr-2">{completedProjects}</span>
                                /
                                <span className="ml-2">{totalProjectsCount}</span>
                            </p>
                        </div>
                    </div>
                </div>
                {/* Tasks Overview */}
                <div className="grid grid-cols-3 gap-2 mx-auto my-3 max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-2xl font-semibold text-amber-500">
                                Pending Tasks
                            </h3>
                            <p className="mt-4 text-xl">
                                <span className="mr-2">{pendingTasks}</span>
                                /
                                <span className="ml-2">{totalTasksCount}</span>
                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-2xl font-semibold text-blue-500">
                                In Progress Tasks
                            </h3>
                            <p className="mt-4 text-xl">
                                <span className="mr-2">{inProgressTasks}</span>
                                /
                                <span className="ml-2">{totalTasksCount}</span>
                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-2xl font-semibold text-green-500">
                                Completed Tasks
                            </h3>
                            <p className="mt-4 text-xl">
                                <span className="mr-2">{completedTasks}</span>
                                /
                                <span className="ml-2">{totalTasksCount}</span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
