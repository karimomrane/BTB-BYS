import React, { useEffect, useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import toast, { Toaster } from "react-hot-toast";
import CommandeTable from "./CommandeTable";
import NavLink from "@/Components/NavLink";
import Pagination from "@/Components/Pagination";

// Define status styles as a constant
const STATUS_STYLES = {
    "Commandé": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "En cours de préparation": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    "Préparé": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    "En cours de livraison": "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    "Livré": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    "Payé": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    "Annulé": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

// Define table headers as constants
const COMMANDES_HEADERS = ["ID", "Date Prévu", "Status", "Créé par", "Créé le", "Action"];
const PANIER_COMMANDES_HEADERS = ["ID", "Panier", "Commande", "Quantité", "Actions"];
const Index = ({ commandes, panierCommandes, articleCommandes, status, filters }) => {
    const user = usePage().props.auth.user;
    const [selectedCommande, setSelectedCommande] = useState(null);
    const [startDate, setStartDate] = useState(filters.start_date || "");
    const [endDate, setEndDate] = useState(filters.end_date || "");



    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    const handleCommandeClick = (commande) => {
        if (selectedCommande) {
            setSelectedCommande(null); // Collapse if already selected
        } else {
            setSelectedCommande(commande); // Expand the selected commande
        }
    };


    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('commandes.index'), { start_date: startDate, end_date: endDate }, {
            preserveState: true,
            replace: true,
        });
    };

    const resetFilter = () => {
        setStartDate("");
        setEndDate("");
        router.get(route('commandes.index'), {}, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    <NavLink
                        href={route('commandes.create')}
                        active={route().current('commandes.create')}
                        className="px-4 py-2 rounded border-b-2 border-indigo-600"
                    >
                        Nouvelle Commande
                    </NavLink>

                    {user.role === "admin" && (
                        <NavLink
                            href={route('panier_commandes.create')}
                            active={route().current('panier_commandes.create')}
                            className="px-4 py-2 ml-4 rounded border-b-2 border-indigo-600"
                        >
                            Ajouter Panier Commande
                        </NavLink>
                    )}
                </h2>
            }
        >
            <Head title="Liste des commandes" />
            <Toaster />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Date Filter Form */}
                    <div className="mb-6 p-4 bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form onSubmit={handleFilter} className="flex gap-4 items-end">
                            <div>
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Date de début
                                </label>
                                <input
                                    type="date"
                                    id="start_date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                />
                            </div>
                            <div>
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Date de fin
                                </label>
                                <input
                                    type="date"
                                    id="end_date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Filtrer
                            </button>
                            <button
                                type="button"
                                onClick={resetFilter}
                                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                            >
                                Réinitialiser
                            </button>
                        </form>
                    </div>

                    {/* Commande Table */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <CommandeTable
                                commandes={commandes}
                                panierCommandes={panierCommandes}
                                articleCommandes={articleCommandes}
                                selectedCommande={selectedCommande}
                                handleCommandeClick={handleCommandeClick}
                                user={user}
                                STATUS_STYLES={STATUS_STYLES}
                            />
                            {commandes.length === 0 && (
                                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                                    Aucune commande disponible.
                                </div>
                            )}
                            {/* Pagination */}
                            {commandes.links && (
                                <Pagination links={commandes.links} className="mt-6" />
                            )}
                        </div>

                    </div>


                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
