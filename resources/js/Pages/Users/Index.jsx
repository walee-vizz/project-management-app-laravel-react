import Alert from '@/Components/Alert';
import Pagination from '@/Components/Pagination';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@headlessui/react';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, sessionParams, users, queryParams = null, session = null }) {

    sessionParams = sessionParams || {};
    queryParams = queryParams || {};
    const sortByField = queryParams.sortBy || 'created_at';
    const sortDir = queryParams.sortDir || 'DESC';

    const searchFieldChanged = async (name, value) => {
        console.log('Search field changed :' + name + ' -> ' + value);
        if (name == 'clear' && value == 'clear') {
            queryParams = {};
            router.get(route('users.index'));
            return;
        }
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route('users.index', queryParams));
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

        router.get(route('users.index', queryParams));

    }


    const deleteUser = (user) => {
        if (confirm('Are you sure you want to delete this user?')) {
            console.log(`deleting user : ${user.id}`);
            // router.delete(route('users.destroy', user.id));
            router.delete(route('users.destroy', user.id));
        }

    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Users
                    </h2>
                    <Link
                        href={route("users.create")}
                        className="px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600"
                    >
                        Add new
                    </Link>
                </div>
            }
        >
            <Head title="Users" />

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
                                <TextInput type="text" id="search" placeholder="Search ..."
                                    defaultValue={queryParams.search}
                                    className={"block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg sm:w-64 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"}
                                    onBlur={e => searchFieldChanged('search', e.target.value)}
                                    onKeyPress={e => onKeyPress('search', e)}

                                />
                            </div>

                            {/* Filter by Date Range */}
                            <div className="flex items-center w-full gap-4 sm:w-auto">
                                <div>
                                    <label htmlFor="from-date" className="sr-only">From Date</label>
                                    <TextInput type="date" id="from-date" placeholder="Search by name..."
                                        defaultValue={queryParams.from_date}
                                        className={"block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg sm:w-64 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"}
                                        onBlur={e => searchFieldChanged('from_date', e.target.value)}
                                        onKeyPress={e => onKeyPress('from_date', e)}

                                    />
                                </div>
                                <span className="text-gray-500 dark:text-gray-400">To</span>
                                <div>
                                    <label htmlFor="to-date" className="sr-only">To Date</label>
                                    <TextInput type="date" id="to-date" placeholder="Search by name..."
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
                                queryParams.search || queryParams.from_date || queryParams.to_date ?

                                    <Button className={"px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"}
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
                                        <TableHeading onClick={() => sortBy('id')} sortByField={sortByField} currentField="id" sortDir={sortDir} >
                                            ID
                                        </TableHeading>
                                        <TableHeading onClick={() => sortBy('name')} sortByField={sortByField} currentField="name" sortDir={sortDir} >Name</TableHeading>
                                        <TableHeading onClick={() => sortBy('email')} sortByField={sortByField} currentField="email" sortDir={sortDir} >Email</TableHeading>
                                        <TableHeading onClick={() => sortBy('created_at')} sortByField={sortByField} currentField="created_at" sortDir={sortDir} >Created At</TableHeading>

                                        <TableHeading sortable={false} className="text-right">
                                            Actions
                                        </TableHeading>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map((user) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user.id}>
                                            <td className="px-6 py-4">
                                                {user.id}
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 hover:underline whitespace-nowrap dark:text-white">
                                                <Link href={route('users.show', user.id)} >
                                                    {user.name}
                                                </Link>
                                            </th>
                                            <td className="px-6 py-4">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.created_at}
                                            </td>
                                            <td className="px-6 py-4 text-nowrap">
                                                <Link href={route('users.edit', { user: user.id })} className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline" >
                                                    Edit
                                                </Link>
                                                <Link onClick={e => deleteUser(user)} className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline" >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>

                                    ))}

                                </tbody>
                            </table>
                            <Pagination Links={users.meta.links} className="mx-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
