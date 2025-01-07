import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';
import { Link, router } from '@inertiajs/react';
import { Button } from '@headlessui/react';

export default function TasksTable({ tasks, queryParams, showProject = true }) {

    queryParams = queryParams || {};
    const sortByField = queryParams.sortBy || 'created_at';
    const sortDir = queryParams.sortDir || 'DESC';

    const searchFieldChanged = async (name, value) => {
        console.log('Search field changed :' + name + ' -> ' + value);
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route('tasks.index', queryParams));
    };


    const onKeyPress = async (name, e) => {
        if (e.key == 'Enter') {
            searchFieldChanged(name, e.target.value);
        }
    };

    const sortBy = async (name) => {

        console.log('Sort by :' + name, queryParams.sortBy);
        if (name == queryParams.sortBy) {
            queryParams.sortDir = queryParams.sortDir == 'ASC' ? 'DESC' : 'ASC';
        } else {
            queryParams.sortBy = name;
            queryParams.sortDir = 'ASC';
        }
        console.log('Sort Dir :' + queryParams.sortDir);

        router.get(route('tasks.index', queryParams));

    }
    return (

        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="flex flex-col items-center justify-between gap-4 p-6 mb-6 bg-white rounded-lg shadow-md sm:flex-row dark:bg-gray-800">
                {/* Search Field */}
                <div className="flex items-center w-full sm:w-auto">
                    <label htmlFor="search" className="sr-only">Search</label>
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
                        {Object.entries(TASK_STATUS_TEXT_MAP).map(([status, text]) => (
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
                            <TableHeading onClick={() => sortBy('id')} sortByField={sortByField} currentField="id" sortDir={sortDir} >
                                ID
                            </TableHeading>

                            <TableHeading sortable={false} sortByField={sortByField} currentField="id" sortDir={sortDir} >
                                Image
                            </TableHeading>
                            <TableHeading onClick={() => sortBy('name')} sortByField={sortByField} currentField="name" sortDir={sortDir} >Name</TableHeading>
                            <TableHeading onClick={() => sortBy('status')} sortByField={sortByField} currentField="status" sortDir={sortDir} >Status</TableHeading>
                            {
                                showProject ? <TableHeading onClick={() => sortBy('project')} sortByField={sortByField} currentField="project" sortDir={sortDir} >Project Name</TableHeading> : null
                            }

                            <TableHeading sortable={false} >Priority</TableHeading>
                            <TableHeading sortable={false} >
                                Assigned To
                            </TableHeading>
                            <TableHeading onClick={() => sortBy('created_at')} sortByField={sortByField} currentField="created_at" sortDir={sortDir} >Created At</TableHeading>
                            <TableHeading sortable={false} sortByField={sortByField} currentField="created_by" sortDir={sortDir} >
                                Created By
                            </TableHeading>
                            <TableHeading sortable={false} className="text-right">
                                Actions
                            </TableHeading>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.data.map((task) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={task.id}>
                                <td className="px-6 py-4">
                                    {task.id}
                                </td>
                                <td className="px-6 py-4">
                                    <img src={task.image_path} alt={task.name} />
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {task.name}
                                </th>
                                <td className="px-6 py-4">

                                    <span className={'px-2 py-1 rounded text-gray-900 dark:text-white ' + TASK_STATUS_CLASS_MAP[task.status]}>{TASK_STATUS_TEXT_MAP[task.status]}</span>
                                </td>
                                {
                                    showProject ?
                                        <td className="px-6 py-4">
                                            {task.project.name}
                                        </td>
                                        : null
                                }
                                <td className="px-6 py-4">
                                    {task.priority}
                                </td>
                                <td className="px-6 py-4">
                                    {task.assigned_user.name}
                                </td>
                                <td className="px-6 py-4">
                                    {task.created_at}
                                </td>
                                <td className="px-6 py-4">
                                    {task.created_by.name}
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={route('tasks.edit', { task: task.id })} className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline" >
                                        Edit
                                    </Link>
                                    <Link href={route('tasks.destroy', { task: task.id })} className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline" >
                                        Delete
                                    </Link>
                                </td>
                            </tr>

                        ))}

                    </tbody>
                </table>
                <Pagination Links={tasks.meta.links} className="mx-auto" />
            </div>
        </div>
    )
}
