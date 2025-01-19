import React, { useEffect, useState } from "react";
import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable"; // Import the autoTable plugin

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

const Index = ({ commandes, panierCommandes, status }) => {
    const user = usePage().props.auth.user;
    const [selectedCommande, setSelectedCommande] = useState(null); // Track selected commande
    const [selectedPanier, setSelectedPanier] = useState(null); // Track selected panier

    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);

    // Handle commande click
    const handleCommandeClick = (commande) => {
        if (selectedCommande?.id === commande.id) {
            setSelectedCommande(null); // Collapse if already selected
        } else {
            setSelectedCommande(commande); // Expand the selected commande
        }
    };

    // Handle panier click
    const handlePanierClick = (panier) => {
        if (selectedPanier?.id === panier.id) {
            setSelectedPanier(null); // Collapse if already selected
        } else {
            setSelectedPanier(panier); // Expand the selected panier
        }
    };

    // Calculate the total for a commande
    const calculateTotal = (commandeId) => {
        const associatedPaniers = panierCommandes.filter((pc) => pc.commande_id === commandeId);
        return associatedPaniers.reduce((total, pc) => {
            return total + (pc.panier?.price || 0) * pc.quantity;
        }, 0);
    };

    // // Generate and download PDF
    // const downloadCommandePDF = (commande) => {
    //     const doc = new jsPDF();

    //     // Add company logo (50px width and height)
    //     const logoUrl = "/logo.png"; // Replace with the path to your logo
    //     doc.addImage(logoUrl, "PNG", 10, 10, 20, 20); // 50px width and height

    //     // Add company information on the left
    //     doc.setFontSize(9);
    //     doc.setTextColor(100); // Gray color for company info
    //     doc.text("STE CENTRALE COMMERCIALE", 140, 20);
    //     doc.text("123 OUED ELLIL ,MANOUBA", 140, 26);
    //     doc.text("MANOUBA, TUNIS, 2036", 140, 32);
    //     doc.text("Phone: +216 29 613 714", 140, 38);
    //     doc.text("Email: info@benyaghlaneshops.com", 140, 44);

    //     // Add client information on the right
    //     doc.setFontSize(9);
    //     doc.setTextColor(100); // Gray color for client info
    //     const clientInfoX = 140; // X position for client info (right side)
    //     doc.text(`Nom: ${commande.user.name}`, clientInfoX, 80);
    //     doc.text(`Email: ${commande.user.email}`, clientInfoX, 86);
    //     doc.text(`Date de Commande: ${new Date(commande.created_at).toLocaleDateString("fr-FR")}`, clientInfoX, 92);
    //     doc.text(`Date Prévue: ${commande.date}`, clientInfoX, 98);

    //     // Add invoice title
    //     doc.setFontSize(18);
    //     doc.setTextColor(0); // Black color for title
    //     doc.text(`Bon de Commande N°  ${commande.id}`, 10, 70);

    //     // Add invoice details
    //     doc.setFontSize(12);
    //     doc.text(`Date: ${new Date(commande.created_at).toLocaleDateString("fr-FR")}`, 10, 86);
    //     doc.text(`Statut: ${commande.status}`, 10, 92);

    //     // Add commande details table
    //     doc.setFontSize(14);
    //     doc.text("Détails de la Commande", 10, 110);
    //     const headers = ["Produit", "Quantité", "Prix Unitaire", "Total"];
    //     const data = panierCommandes
    //         .filter((pc) => pc.commande_id === commande.id)
    //         .map((pc) => [
    //             pc.panier?.name || "N/A",
    //             pc.quantity,
    //             `${(pc.panier?.price || 0).toFixed(2)} DT`,
    //             `${((pc.panier?.price || 0) * pc.quantity).toFixed(2)} DT`,
    //         ]);

    //     // Generate the table
    //     doc.autoTable({
    //         startY: 120, // Start the table below the header sections
    //         startX: 10,
    //         head: [headers], // Table headers
    //         body: data, // Table data
    //         theme: "striped", // Use a striped theme for better styling
    //         headStyles: {
    //             fillColor: [128, 128, 128], // Grey header background color
    //             textColor: [255, 255, 255], // Header text color (white)
    //             fontStyle: "bold", // Bold header text
    //             halign: "center", // Center-align header text
    //         },
    //         columnStyles: {
    //             0: { cellWidth: 80 }, // Product column (left-aligned)
    //             1: { cellWidth: 30 }, // Quantity column (center-aligned)
    //             2: { cellWidth: 40 }, // Unit Price column (right-aligned)
    //             3: { cellWidth: 40 }, // Total column (right-aligned)
    //         },
    //     });

    //     // Add total section
    //     const total = calculateTotal(commande.id).toFixed(2);
    //     doc.setFontSize(10);
    //     doc.text("Sous-Total", 150, doc.autoTable.previous.finalY + 10);
    //     doc.text(`${total} DT`, 170, doc.autoTable.previous.finalY + 10);

    //     doc.setFontSize(10);
    //     doc.text("TVA 0%", 150, doc.autoTable.previous.finalY + 16);
    //     doc.text(`${0} DT`, 170, doc.autoTable.previous.finalY + 16);

    //     doc.setFontSize(14);
    //     doc.text("Total", 150, doc.autoTable.previous.finalY + 22);
    //     doc.text(`${total} DT`, 170, doc.autoTable.previous.finalY + 22);

    //     // Add footer
    //     doc.setFontSize(10);
    //     doc.setTextColor(100); // Gray color for footer
    //     doc.text("Merci pour votre confiance !", 40 + 40, 0 + 280);
    //     doc.text("Pour toute question, contactez-nous à info@benyaghlaneshops.com.", 15 + 40, 6 + 280);

    //     // Save the PDF
    //     doc.save(`Commande_Commande_${commande.id}.pdf`);
    // };

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
                    {/* Commandes Table */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900">
                                        <tr>
                                            {COMMANDES_HEADERS.map((header) => (
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
                                            <AnimatePresence key={commande.id}>
                                                <tr
                                                    onClick={() => handleCommandeClick(commande)}
                                                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                        {commande.id}
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
                                                            <td colSpan={COMMANDES_HEADERS.length} className="px-6 py-4">
                                                                <div className="space-y-4">
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

                                                                    {/* Invoice Table */}
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
                                                                                {panierCommandes
                                                                                    .filter((pc) => pc.commande_id === commande.id)
                                                                                    .map((pc) => (
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
                                                                                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                                                                                        Ready
                                                                                                                    </th>
                                                                                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                                                                                        Extra
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
                                                                                                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                                                                                            {/* Add logic for "Ready" column */}
                                                                                                                            {article.pivot.ready ? "Oui" : "Non"}
                                                                                                                        </td>
                                                                                                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                                                                                            {/* Add logic for "Extra" column */}
                                                                                                                            {article.pivot.extra ? "Oui" : "Non"}
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

                                                                    {/* Total Section */}
                                                                    <div className="flex justify-end">
                                                                        <div className="w-1/3">
                                                                            <div className="flex justify-between mb-2">
                                                                                <p className="text-sm text-gray-600 dark:text-gray-400">Sous-Total:</p>
                                                                                <p className="text-sm text-gray-900 dark:text-gray-100">
                                                                                    {calculateTotal(commande.id).toFixed(2)} DT
                                                                                </p>
                                                                            </div>
                                                                            <div className="flex justify-between mb-2">
                                                                                <p className="text-sm text-gray-600 dark:text-gray-400">Taxes (0%):</p>
                                                                                <p className="text-sm text-gray-900 dark:text-gray-100">0.00 DT</p>
                                                                            </div>
                                                                            <div className="flex justify-between">
                                                                                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">Total:</p>
                                                                                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                                                    {calculateTotal(commande.id).toFixed(2)} DT
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/* Footer */}
                                                                    <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                                                                        <p>Merci pour votre confiance !</p>
                                                                        <p>Pour toute question, contactez-nous à support@example.com.</p>
                                                                    </div>

                                                                    {/* Download PDF Button
                                                                    {user.role === 'admin' && (
                                                                        <div className="mt-6 flex justify-end">
                                                                            <button
                                                                                onClick={() => downloadCommandePDF(commande)}
                                                                                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                                                                            >
                                                                                Télécharger la Commande (PDF)
                                                                            </button>
                                                                        </div>
                                                                    )} */}
                                                                </div>
                                                            </td>
                                                        </motion.tr>
                                                    )}
                                                </AnimatePresence>
                                            </AnimatePresence>
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
