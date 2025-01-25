import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PanierTable = ({ panierCommandes }) => {
    const [selectedPanier, setSelectedPanier] = useState(null);

    const handlePanierClick = (panier) => {
        if (selectedPanier?.id === panier.id) {
            setSelectedPanier(null); // Collapse if already selected
        } else {
            setSelectedPanier(panier); // Expand the selected panier
        }
    };

    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Détails de la Commande</h3>

            {/* Mobile View (Stacked Layout) */}
            <div className="sm:hidden space-y-4">
                {panierCommandes.map((pc) => (
                    <div key={pc.id} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
                        {/* Main Panier Row */}
                        <div
                            onClick={() => handlePanierClick(pc.panier)}
                            className="cursor-pointer space-y-2 group" // Added `group` for hover effects
                        >
                            {/* Flex container for name and chevron */}
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {pc.panier?.name || "N/A"}
                                </p>
                                {/* Chevron icon to indicate expandability */}
                                <svg
                                    className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${selectedPanier?.id === pc.panier?.id ? "rotate-180" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Quantité: {pc.quantity}
                            </p>
                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                Prix Unitaire: {(pc.panier?.price || 0).toFixed(2)} DT
                            </p>
                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                Total: {((pc.panier?.price || 0) * pc.quantity).toFixed(2)} DT
                            </p>
                        </div>

                        {/* Nested Articles for Selected Panier */}
                        <AnimatePresence>
                            {selectedPanier?.id === pc.panier?.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-4 space-y-2"
                                >
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        Articles inclus:
                                    </p>
                                    {selectedPanier.articles.map((article) => (
                                        <div
                                            key={article.id}
                                            className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                                        >
                                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                                {article.name}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                Quantité: {article.pivot.quantity}
                                            </p>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {/* Desktop View (Original Table Layout) */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-900">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                Produit
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                Quantité
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                Prix Unitaire
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                Total
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                {/* Empty header for chevron */}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {panierCommandes.map((pc) => (
                            <React.Fragment key={pc.id}>
                                <tr
                                    onClick={() => handlePanierClick(pc.panier)}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer group"
                                >
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {pc.panier?.name || "N/A"}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {pc.quantity}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {(pc.panier?.price || 0).toFixed(2)} DT
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {((pc.panier?.price || 0) * pc.quantity).toFixed(2)} DT
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {/* Chevron icon to indicate expandability */}
                                        <svg
                                            className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${selectedPanier?.id === pc.panier?.id ? "rotate-180" : ""}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </td>
                                </tr>
                                {/* Show Articles for Selected Panier */}
                                {selectedPanier?.id === pc.panier?.id && (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-2">
                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                <thead className="bg-gray-50 dark:bg-gray-900">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                            Article
                                                        </th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                            Quantité
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                                    {selectedPanier.articles.map((article) => (
                                                        <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                                {article.name}
                                                            </td>
                                                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                                {article.pivot.quantity}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PanierTable;
