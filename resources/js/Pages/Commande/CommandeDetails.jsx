import React from "react";
import { usePage } from "@inertiajs/react";
import PanierTable from "./PanierTable";
import CModal from "@/Components/CModal";
import { generateCommandePDF } from "./pdfUtils";
import { FaXmark } from "react-icons/fa6";

const CommandeDetails = ({ commande, panierCommandes, articleCommandes, isOpen, onClose }) => {
    const user = usePage().props.auth.user;

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

    // Calculate the total for the current commande
    const total = calculateTotal(commande.id).toFixed(2);

    // Handle PDF download
    const handleDownloadPDF = async () => {
        try {
            const pdfUrl = await generateCommandePDF(commande, panierCommandes, articleCommandes, calculateTotal(commande.id));
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = `Commande_${commande.id}.pdf`;
            link.click();
        } catch (error) {
            console.error('Failed to generate PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    return (
        <CModal isOpen={isOpen} onClose={onClose}>
            {/* Close Button */}
            <div className="flex justify-end">
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <FaXmark className="w-8 h-8 hover:text-red-600" />
                </button>
            </div>
            <div className="space-y-4 overflow-y-auto max-h-[550px]">


                {/* Invoice Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">Bon de Commande</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Commande N°{commande.id}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Date:</strong> {new Date(commande.created_at).toLocaleDateString("fr-FR")}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Statut:</strong> {commande.status}
                        </p>
                    </div>
                </div>

                {/* Client Information */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Informations du Client</h3>
                    <div className="grid grid-cols-2 gap-x-96">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                <strong>Nom:</strong> {commande.user.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                <strong>Email:</strong> {commande.user.email}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                <strong>Date de Commande:</strong> {new Date(commande.created_at).toLocaleDateString("fr-FR")}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                <strong>Date Prévue:</strong> {commande.date}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Display Commande Description if it exists */}
                {commande.description && (
                    <div className="mb-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong> Observation : </strong> {commande.description}
                        </p>
                    </div>
                )}

                {/* Panier Table */}
                <PanierTable panierCommandes={panierCommandes.filter((pc) => pc.commande_id === commande.id)} />

                {/* Extra Articles Table */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Articles Supplémentaires</h3>
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                    Article
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
                            {articleCommandes
                                .filter((ac) => ac.commande_id === commande.id)
                                .map((ac) => (
                                    <tr key={ac.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            {ac.article?.name}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            {ac.quantity}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            {ac.article?.price} DT
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                            {(ac.article?.price || 0) * ac.quantity} DT
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                {/* Total Section */}
                <div className="mt-6 flex justify-end">
                    <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Sous-Total:</strong> {total} DT
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>TVA (0%):</strong> 0.00 DT
                        </p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            <strong>Total:</strong> {total} DT
                        </p>
                    </div>
                </div>

                {/* Download PDF Button */}
                {user.role === "admin" && (
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleDownloadPDF}
                            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                        >
                            Télécharger la Commande (PDF)
                        </button>
                    </div>
                )}
            </div>
        </CModal>
    );
};

export default CommandeDetails;
