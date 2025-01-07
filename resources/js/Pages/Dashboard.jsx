import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { FaUsers, FaClipboardList } from 'react-icons/fa'; // Importing icons from react-icons

export default function Dashboard({ uc, users, commandes }) {
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

            {/* Stats Cards */}
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

            {/* Ranking Table */}
            <div className="px-10">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 mb-4">
                        Classement des utilisateurs par commandes
                    </h3>
                    <table className="w-full table-auto border-collapse border border-gray-200 dark:border-gray-700">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700">
                                <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                                    Rang
                                </th>
                                <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                                    Nom
                                </th>
                                <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                                    Email
                                </th>
                                <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                                    Nombre de Commandes
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {uc
                                .sort((a, b) => b.commandes_count - a.commandes_count)
                                .map((user, index) => (
                                    <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300">
                                            {index + 1}
                                        </td>
                                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300">
                                            {user.name}
                                        </td>
                                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300">
                                            {user.email}
                                        </td>
                                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300">
                                            {user.commandes_count}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
