import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { FaUsers, FaClipboardList, FaCheck, FaTruck } from 'react-icons/fa';

export default function Dashboard({comliv, uc, users, commandes }) {
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
            <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
                {user.role === 'admin' && (
                    <div className="flex items-center rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                        <div className="mr-4 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900">
                            <FaUsers
                                className="text-blue-500 dark:text-blue-400"
                                aria-label="Users Icon"
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                Utilisateurs
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {users}
                            </p>
                        </div>
                    </div>
                )}

                <div className="flex items-center rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                    <div className="mr-4 flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900">
                        <FaClipboardList
                            className="text-orange-500 dark:text-orange-400"
                            aria-label="Orders Icon"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Commandes
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {commandes}
                        </p>
                    </div>
                </div>
                <div className="flex items-center rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                    <div className="mr-4 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                        <FaTruck
                            className="text-green-500 dark:text-green-400"
                            aria-label="Orders Icon"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Commandes Livré
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {comliv ? comliv : 0}
                        </p>
                    </div>
                </div>
            </div>

            {/* Ranking Table */}
            <div className="p-6">
                <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Classement des utilisateurs par commandes
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse table-auto">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700">
                                    <th className="border px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                                        Rang
                                    </th>
                                    <th className="border px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                                        Nom
                                    </th>
                                    <th className="border px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                                        Email
                                    </th>
                                    <th className="border px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                                        Nombre de Commandes
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {uc
                                    .sort((a, b) => b.commandes_count - a.commandes_count)
                                    .map((user, index) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                        >
                                            <td className="border px-4 py-2 text-gray-700 dark:text-gray-300">
                                                {index + 1}
                                            </td>
                                            <td className="border px-4 py-2 text-gray-700 dark:text-gray-300">
                                                {user.name}
                                            </td>
                                            <td className="border px-4 py-2 text-gray-700 dark:text-gray-300">
                                                {user.email}
                                            </td>
                                            <td className="border px-4 py-2 text-gray-700 dark:text-gray-300">
                                                {user.commandes_count}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
