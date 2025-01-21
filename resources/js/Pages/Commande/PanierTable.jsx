// components/PanierTable.jsx
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
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {panierCommandes.map((pc) => (
                        <React.Fragment key={pc.id}>
                            <tr
                                onClick={() => handlePanierClick(pc.panier)}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
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
                            </tr>
                            {/* Show Articles for Selected Panier */}
                            {selectedPanier?.id === pc.panier?.id && (
                                <tr>
                                    <td colSpan={4} className="px-4 py-2">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-900">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                        Article
                                                    </th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                        Quantité
                                                    </th>
                                                    {/* <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                        Ready
                                                    </th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                        Extra
                                                    </th> */}
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
                                                        {/* <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                            {article.pivot.ready ? "Oui" : "Non"}
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                            {article.pivot.extra ? "Oui" : "Non"}
                                                        </td> */}
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
    );
};

export default PanierTable;
