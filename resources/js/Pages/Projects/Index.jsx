import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@headlessui/react';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, projects, queryParams = null }) {

    queryParams = queryParams || {};
    const searchFieldChanged = async (name, value) => {
        console.log('Search field changed :' + name + ' -> ' + value);
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route('projects.index', queryParams));
    };


    const onKeyPress = async (name, e) => {
        if (e.key == 'Enter') {
            searchFieldChanged(name, e.target.value);
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="flex flex-col items-center justify-between gap-4 p-6 mb-6 bg-white rounded-lg shadow-md sm:flex-row dark:bg-gray-800">
                            {/* Search Field */}
                            <div className="flex items-center w-full sm:w-auto">
                                <label htmlFor="search" className="sr-only">Search</label>
                                {/* <input
                                    type="text"
                                    id="search"
                                    placeholder="Search by name..."
                                    className="block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg sm:w-64 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                                /> */}
                                <TextInput type="text" id="search" placeholder="Search by name..."
                                    defaultValue={queryParams.name}
                                    className={"block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg sm:w-64 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"}
                                    onBlur={e => searchFieldChanged('name', e.target.value)}
                                    onKeyPress={e => onKeyPress('name', e)}

                                />
                            </div>

                            {/* Filter by Status */}
                            <div className="flex items-center w-full sm:w-auto">
                                <label htmlFor="status" className="sr-only">Status</label>
                                <SelectInput id="status" className="block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer sm:w-48 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                                    defaultValue={queryParams.status}
                                    onChange={e => searchFieldChanged('status', e.target.value)}
                                >
                                    <option value="">All Statuses</option>
                                    {Object.entries(PROJECT_STATUS_TEXT_MAP).map(([status, text]) => (
                                        <option key={status} value={status}>
                                            {text}
                                        </option>
                                    ))}
                                </SelectInput>
                            </div>

                            {/* Filter by Date Range */}
                            <div className="flex items-center w-full gap-4 sm:w-auto">
                                <div>
                                    <label htmlFor="start-date" className="sr-only">Start Date</label>
                                    <TextInput type="date" id="start-date" placeholder="Search by name..."
                                        defaultValue={queryParams.start_date}
                                        className={"block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg sm:w-64 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"}
                                        onBlur={e => searchFieldChanged('start_date', e.target.value)}
                                        onKeyPress={e => onKeyPress('start_date', e)}

                                    />
                                </div>
                                <span className="text-gray-500 dark:text-gray-400">to</span>
                                <div>
                                    <label htmlFor="end-date" className="sr-only">End Date</label>
                                    <TextInput type="date" id="end-date" placeholder="Search by name..."
                                        defaultValue={queryParams.end_date}
                                        className={"block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg sm:w-64 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"}
                                        onBlur={e => searchFieldChanged('end_date', e.target.value)}
                                        onKeyPress={e => onKeyPress('end_date', e)}

                                    />
                                </div>
                            </div>

                            {/* Search Button */}

                            <Button className={"px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"}
                                onClick={e => searchFieldChanged('submit', 'submit')}>
                                Search
                            </Button>
                        </div>

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            ID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Image
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center">
                                                Name
                                                <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg></a>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center">
                                                Status
                                                <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg></a>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center">
                                                Created At
                                                <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg></a>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center">
                                                Due Date
                                                <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg></a>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <div className="flex items-center">
                                                Created By
                                                <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg></a>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right">
                                            <span className="">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map((project) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={project.id}>
                                            <td className="px-6 py-4">
                                                {project.id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <img src={project.image_path} alt={project.name} />
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {project.name}
                                            </th>
                                            <td className="px-6 py-4">

                                                <span className={'px-2 py-1 rounded text-gray-900 dark:text-white ' + PROJECT_STATUS_CLASS_MAP[project.status]}>{PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {project.created_at}
                                            </td>
                                            <td className="px-6 py-4">
                                                {project.due_date}
                                            </td>
                                            <td className="px-6 py-4">
                                                {project.created_by.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link href={route('projects.edit', { project: project.id })} className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline" >
                                                    Edit
                                                </Link>
                                                <Link href={route('projects.destroy', { project: project.id })} className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline" >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>

                                    ))}

                                </tbody>
                            </table>
                            <Pagination Links={projects.meta.links} className="mx-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
