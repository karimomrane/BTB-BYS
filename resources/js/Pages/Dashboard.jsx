import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { FaUsers, FaClipboardList, FaTruck } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Dashboard({ comliv, uc, users, commandes }) {
    const user = usePage().props.auth.user;

    // Animation variants for cards
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    // Animation variants for the table
    const tableVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    };

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
            <motion.div
                className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.2 } },
                }}
            >
                {user.role === 'admin' && (
                    <motion.div
                        className="flex items-center rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
                        variants={cardVariants}
                    >
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
                    </motion.div>
                )}

                <motion.div
                    className="flex items-center rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
                    variants={cardVariants}
                >
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
                </motion.div>

                <motion.div
                    className="flex items-center rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
                    variants={cardVariants}
                >
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
                </motion.div>
            </motion.div>

            {/* Ranking Table */}
            <motion.div
                className="p-6"
                initial="hidden"
                animate="visible"
                variants={tableVariants}
            >
                <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Classement des utilisateurs par commandes
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-separate border-spacing-0">
                            <thead className='bg-gray-50 dark:bg-gray-900'>
                                <tr>
                                    {["Rang", "Nom", "Email", "Nombre de Commandes"]
                                        .filter(Boolean)
                                        .map((header) => (
                                            <th
                                                key={header}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                {uc
                                    .sort((a, b) => b.commandes_count - a.commandes_count)
                                    .map((user, index) => (
                                        <motion.tr
                                            key={user.id}
                                            className="group hover:bg-gray-50 dark:hover:bg-gray-700"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.1, duration: 0.3 }}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                {user.commandes_count}
                                            </td>
                                        </motion.tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>

        </AuthenticatedLayout>
    );
}
