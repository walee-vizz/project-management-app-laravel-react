import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TasksTable from './TasksTable';

export default function Index({ auth, tasks, queryParams = null }) {

    queryParams = queryParams || {};

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tasks
                </h2>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <TasksTable tasks={tasks} queryParams={queryParams} />
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
