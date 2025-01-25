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
            <div className="space-y-4 overflow-y-auto max-h-[550px] p-4">

                {/* Invoice Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
                    <div className="mb-4 sm:mb-0">
                        <h2 className="text-xl sm:text-2xl font-bold text-center">Bon de Commande</h2>

                    </div>
                    <div className="text-left">
                        <p className="text-sm text-gray-600 dark:text-gray-400"> <strong>N°</strong>{commande.id}</p>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="overflow-x-auto">
                    <PanierTable panierCommandes={panierCommandes.filter((pc) => pc.commande_id === commande.id)} />
                </div>

                {articleCommandes.filter((ac) => ac.commande_id === commande.id).length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Articles Supplémentaires</h3>

                        {/* Mobile View (Stacked Layout) */}
                        <div className="sm:hidden space-y-4">
                            {articleCommandes
                                .filter((ac) => ac.commande_id === commande.id)
                                .map((ac) => (
                                    <div key={ac.id} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {ac.article?.name}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                Quantité: {ac.quantity}
                                            </p>
                                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                                Prix Unitaire: {ac.article?.price} DT
                                            </p>
                                            <p className="text-sm text-gray-900 dark:text-gray-100">
                                                Total: {(ac.article?.price || 0) * ac.quantity} DT
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {/* Desktop View (Original Table Layout) */}
                        <div className="hidden sm:block overflow-x-auto">
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
                    </div>
                )}

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
