import React from "react";
import { usePage } from "@inertiajs/react";
import PanierTable from "./PanierTable";
import CModal from "@/Components/CModal";
import { generateCommandePDF } from "./pdfUtils";

const CommandeDetails = ({ commande, panierCommandes, isOpen, onClose }) => {
    const user = usePage().props.auth.user;

    // Calculate the total for a commande
    const calculateTotal = (commandeId) => {
        const associatedPaniers = panierCommandes.filter((pc) => pc.commande_id === commandeId);
        return associatedPaniers.reduce((total, pc) => {
            return total + (pc.panier?.price || 0) * pc.quantity;
        }, 0);
    };

    // Calculate the total for the current commande
    const total = calculateTotal(commande.id).toFixed(2);

    // Handle PDF download
    const handleDownloadPDF = () => {
        generateCommandePDF(commande, panierCommandes, calculateTotal);
    };

    return (
        <CModal isOpen={isOpen} onClose={onClose}>
            <div className="space-y-4 overflow-y-auto max-h-[550px]">
                {/* Close Button */}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

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
                {user.role === 'admin' && (
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
