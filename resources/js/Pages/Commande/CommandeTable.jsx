import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import CommandeDetails from "./CommandeDetails";
import { FaEdit, FaTrash } from "react-icons/fa";

const CommandeTable = ({
    commandes,
    selectedCommande,
    panierCommandes,
    articleCommandes, // Add articleCommandes prop
    handleCommandeClick,
    user,
    STATUS_STYLES,
}) => {
    // Calculate the total for a commande (including paniers and extra articles)
    const calculateTotal = (commandeId) => {
        // Calculate total for paniers
        const associatedPaniers = panierCommandes.filter((pc) => pc.commande_id === commandeId);
        const paniersTotal = associatedPaniers.reduce((total, pc) => {
            return total + (pc.panier?.price || 0) * pc.quantity;
        }, 0);

        // Calculate total for extra articles
        const associatedArticles = articleCommandes.filter((ac) => ac.commande_id === commandeId);
        const articlesTotal = associatedArticles.reduce((total, ac) => {
            return total + (ac.article?.price || 0) * ac.quantity;
        }, 0);

        // Return the combined total
        return paniersTotal + articlesTotal;
    };

    return (
        <div>
            {/* Table */}
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                        {["ID", "Date Prévu", "Status", "Créé par", "Créé le", "Total", user.role === "admin" && "Action"]
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
                    {commandes.data.length > 0 ? (
                        commandes.data.map((commande) => (
                            <React.Fragment key={commande.id}>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td
                                        onClick={() => handleCommandeClick(commande)}
                                        className="cursor-pointer px-6 py-4 underline hover:text-indigo-600 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                                    >
                                        N°{commande.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {commande.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${STATUS_STYLES[commande.status]}`}
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {calculateTotal(commande.id).toFixed(2)} DT
                                    </td>
                                    {user.role === "admin" && (
                                        <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                                            <Link
                                                href={route("commandes.edit", commande.id)}
                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400 transition"
                                            >
                                                <FaEdit />
                                            </Link>
                                            <Link
                                                href={route("commandes.destroy", commande.id)}
                                                method="delete"
                                                as="button"
                                                type="button"
                                                className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400 transition"
                                            >
                                                <FaTrash/>
                                            </Link>
                                        </td>
                                    )}
                                </tr>
                                {/* Animated Details Section */}
                                <AnimatePresence>
                                    {selectedCommande?.id === commande.id && (
                                        <motion.tr
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="bg-gray-50 dark:bg-gray-700"
                                        >
                                            <td colSpan={7} className="px-6 py-4">
                                                {/* Commande Details */}
                                                <div className="p-4">
                                                    <CommandeDetails
                                                        commande={commande}
                                                        panierCommandes={panierCommandes}
                                                        articleCommandes={articleCommandes} // Pass articleCommandes
                                                        isOpen={selectedCommande?.id === commande.id}
                                                        onClose={() => handleCommandeClick(null)}
                                                    />
                                                </div>
                                            </td>
                                        </motion.tr>
                                    )}
                                </AnimatePresence>
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                Aucune commande trouvée.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal (Rendered Outside the Table) */}
            <AnimatePresence>
                {selectedCommande && (
                    <CommandeDetails
                        commande={selectedCommande}
                        panierCommandes={panierCommandes}
                        articleCommandes={articleCommandes} // Pass articleCommandes
                        isOpen={!!selectedCommande}
                        onClose={() => handleCommandeClick(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default CommandeTable;
