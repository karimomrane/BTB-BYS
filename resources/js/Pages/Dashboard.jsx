import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { FaUsers, FaClipboardList, FaTruck, FaChartLine, FaMoneyBill } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Dashboard({ totalRevenue, totalRevenuePrevu, comliv, uc, users, commandes,compay }) {
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
                    <div className="mr-4 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900">
                        <FaTruck
                            className="text-yellow-500 dark:text-yellow-400"
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
                {/*Revenue*/}
                <motion.div
                    className="flex items-center rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
                    variants={cardVariants}
                >
                    <div className="mr-4 flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900">
                        <FaChartLine
                            className="text-purple-500 dark:text-purple-400"
                            aria-label="Revenue Icon"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Revenu Total (Payé)
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {totalRevenue} DT
                        </p>
                    </div>
                </motion.div>
                {/*Revenue prevu*/}
                <motion.div
                    className="flex items-center rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
                    variants={cardVariants}
                >
                    <div className="mr-4 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                        <FaChartLine
                            className="text-green-500 dark:text-green-400"
                            aria-label="Revenue Icon"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Revenu Total Prévu (Payé + Livré)
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {totalRevenue + totalRevenuePrevu} DT
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="flex items-center rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
                    variants={cardVariants}
                >
                    <div className="mr-4 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                        <FaMoneyBill
                            className="text-green-500 dark:text-green-400"
                            aria-label="Orders Icon"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Commandes Payé
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {compay ? compay : 0}
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
                        Classement des utilisateurs
                    </h3>

                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full table-auto border-separate border-spacing-0">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    {["Rang", "Nom", "Email", "Commandes Validé", "Total Revenu"]
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
                                    .sort((a, b) => b.total_revenue - a.total_revenue)
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
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                {user.total_revenue} DT
                                            </td>
                                        </motion.tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile List */}
                    <div className="md:hidden space-y-4">
                        {uc
                            .sort((a, b) => b.total_revenue - a.total_revenue)
                            .map((user, index) => (
                                <motion.div
                                    key={user.id}
                                    className="bg-white shadow-sm rounded-lg p-4 dark:bg-gray-700"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                >
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                Rang: {index + 1}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {user.total_revenue} DT
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-900 dark:text-gray-100">
                                            {user.name}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {user.email}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            Commandes Validé: {user.commandes_count}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                </div>
            </motion.div>

        </AuthenticatedLayout>
    );
}
