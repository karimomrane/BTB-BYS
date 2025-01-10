import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";

const Index = ({ commandes, status }) => {
    const user = usePage().props.auth.user;

    // Show toast notification for status
    if (status) {
        toast.success(status);
    }

    // Status styles mapping
    const statusStyles = {
        "Commandé": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        "En cours de préparation": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        "Préparé": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
        "En cours de livraison": "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
        "Livré": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        "Payé": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
        "Annulé": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Liste des commandes
                </h2>
            }
        >
            <Head title="Liste des commandes" />
            <Toaster />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900">
                                        <tr>
                                            {["ID", "Nombre de paniers", "Date Prévu", "Status", "Créé par", "Créé le", user.role === 'admin' && "Action"]
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
                                        {commandes.map((commande) => (
                                            <tr
                                                key={commande.id}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {commande.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {commande.nbpanier}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {commande.date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span
                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[commande.status]}`}
                                                    >
                                                        {commande.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {commande.user.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {new Date(commande.created_at).toLocaleDateString("fr-FR")}
                                                </td>
                                                {user.role === "admin" && (
                                                    <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                                                        <Link
                                                            href={route("commandes.edit", commande.id)}
                                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400 transition"
                                                        >
                                                            Editer
                                                        </Link>
                                                        <Link
                                                            href={route("commandes.destroy", commande.id)}
                                                            method="delete"
                                                            as="button"
                                                            type="button"
                                                            className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400 transition"
                                                        >
                                                            Supprimer
                                                        </Link>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {commandes.length === 0 && (
                                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                                    Aucune commande disponible.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
