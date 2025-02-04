import Alert from '@/Components/Alert';
import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@headlessui/react';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, sessionParams, projects, queryParams = null, session = null }) {

    sessionParams = sessionParams || {};
    queryParams = queryParams || {};
    const sortByField = queryParams.sortBy || 'created_at';
    const sortDir = queryParams.sortDir || 'DESC';

    const searchFieldChanged = async (name, value) => {
        if (name == 'submit' && value == 'submit') {
            router.get(route('projects.index'), queryParams);
            return;
        } else if (name == 'clear' && value == 'clear') {
            if (queryParams?.page && queryParams.page > 0) {
                router.get(route('projects.index'), { page: queryParams.page });
                return;
            }
            queryParams = {};
            router.get(route('projects.index'));
            return;
        } else if (value) {
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

    const sortBy = async (name) => {

        if (name == queryParams.sortBy) {
            queryParams.sortDir = queryParams.sortDir == 'ASC' ? 'DESC' : 'ASC';
        } else {
            queryParams.sortBy = name;
            queryParams.sortDir = 'ASC';
        }

        router.get(route('projects.index', queryParams));

    }


    const deleteProject = (project) => {
        if (confirm('Are you sure you want to delete this project?')) {
            router.delete(route('projects.destroy', project.id));
        }

    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Projects
                    </h2>
                    <Link
                        href={route("projects.create")}
                        className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
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

                                <TextInput type="text" id="search" placeholder="Search by name..."
                                    defaultValue={queryParams.search}
                                    className={"block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg sm:w-64 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"}
                                    onBlur={e => searchFieldChanged('search', e.target.value)}
                                    onKeyPress={e => onKeyPress('search', e)}

                                />
                            </div>

                            {/* Filter by Status */}
                            <div className="flex items-center w-full sm:w-auto">
                                <label htmlFor="status" className="sr-only">Status</label>
                                <SelectInput
                                    name="status"
                                    id="status"
                                    placeholder="Select Status"
                                    className={`block w-full mt-1 cursor-pointer `}
                                    defaultValue={queryParams.status}
                                    options={Object.entries(PROJECT_STATUS_TEXT_MAP).map(([status, text]) => ({
                                        value: status,
                                        label: text
                                    }))}
                                    value={queryParams.status}
                                    onChange={(selectedOption) => searchFieldChanged("status", selectedOption ? selectedOption.value : '')}
                                />
                            </div>

                            {/* Filter by Date Range */}
                            <div className="flex items-center w-full gap-4 sm:w-auto">
                                <div>
                                    <label htmlFor="from-date" className="sr-only">From Date</label>
                                    <TextInput type="date" id="from-date"
                                        defaultValue={queryParams.from_date}
                                        className={"block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg sm:w-64 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"}
                                        onBlur={e => searchFieldChanged('from_date', e.target.value)}
                                        onKeyPress={e => onKeyPress('from_date', e)}

                                    />
                                </div>
                                <span className="text-gray-500 dark:text-gray-400">to</span>
                                <div>
                                    <label htmlFor="to-date" className="sr-only">To Date</label>
                                    <TextInput type="date" id="to-date"
                                        defaultValue={queryParams.to_date}
                                        className={"block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg sm:w-64 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"}
                                        onBlur={e => searchFieldChanged('to_date', e.target.value)}
                                        onKeyPress={e => onKeyPress('to_date', e)}

                                    />
                                </div>
                            </div>

                            {/* Search Button */}

                            <Button className={"px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"}
                                onClick={e => searchFieldChanged('submit', 'submit')}>
                                Search
                            </Button>
                            {
                                queryParams.search || queryParams.from_date || queryParams.to_date || queryParams.status ?

                                    <Button className={"px-4 py-2 text-sm font-sm text-white bg-gray-600 rounded-lg shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"}
                                        onClick={e => searchFieldChanged('clear', 'clear')}>
                                        Clear Search
                                    </Button>
                                    : null
                            }
                        </div>

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <TableHeading sortable={false} >
                                            Sr. No
                                        </TableHeading>

                                        <TableHeading sortable={false} sortByField={sortByField} currentField="id" sortDir={sortDir} >
                                            Image
                                        </TableHeading>
                                        <TableHeading onClick={() => sortBy('name')} sortByField={sortByField} currentField="name" sortDir={sortDir} >Name</TableHeading>
                                        <TableHeading onClick={() => sortBy('status')} sortByField={sortByField} currentField="status" sortDir={sortDir} >Status</TableHeading>
                                        <TableHeading onClick={() => sortBy('created_at')} sortByField={sortByField} currentField="created_at" sortDir={sortDir} >Created At</TableHeading>
                                        <TableHeading onClick={() => sortBy('due_date')} sortByField={sortByField} currentField="due_date" sortDir={sortDir} >Due Date</TableHeading>
                                        <TableHeading sortable={false} sortByField={sortByField} currentField="created_by" sortDir={sortDir} >
                                            Created By
                                        </TableHeading>
                                        <TableHeading sortable={false} className="text-right">
                                            Actions
                                        </TableHeading>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map((project, index) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={project.id}>
                                            <td className="px-6 py-4">
                                                {/* {project.id} */}
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                <img src={project.image_path} alt={project.name} className="w-20 h-20 rounded-half" />
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 hover:underline whitespace-nowrap dark:text-white">
                                                <Link href={route('projects.show', project.id)} >
                                                    {project.name}
                                                </Link>
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
                                            <td className="px-6 py-4 text-nowrap">
                                                <Link href={route('projects.edit', { project: project.id })} className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline" >
                                                    Edit
                                                </Link>
                                                <Link onClick={e => deleteProject(project)} className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline" >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>

                                    ))}

                                </tbody>
                            </table>
                            <Pagination Links={projects.meta.links} className="mx-auto" queryParams={queryParams} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
