import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { FaUsers, FaClipboardList } from 'react-icons/fa'; // Importing icons from react-icons

export default function Dashboard({ users, commandes }) {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 p-10">
                {user.role === 'admin' && (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
                        <div className="mr-4">
                            <FaUsers className="text-3xl text-blue-500 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                                Utilisateurs
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {users}
                            </p>
                        </div>
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
                    <div className="mr-4">
                        <FaClipboardList className="text-3xl text-green-500 dark:text-green-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                            Commandes
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {commandes}
                        </p>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
