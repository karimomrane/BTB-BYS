import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Add = ({ paniers }) => {
    const [selectedPaniers, setSelectedPaniers] = useState([]);
    const [panierQuantities, setPanierQuantities] = useState({}); // Track quantity for each panier
    const [showProducts, setShowProducts] = useState(false);

    const { data, setData, post, errors, processing } = useForm({
        date: "",
        description: "",
        paniers: [], // Array to store selected panier IDs and quantities
    });

    const handlePanierSelection = (panierId) => {
        setSelectedPaniers((prev) => {
            let updatedPaniers;
            if (prev.includes(panierId)) {
                // Deselect panier
                updatedPaniers = prev.filter((id) => id !== panierId);
                const updatedQuantities = { ...panierQuantities };
                delete updatedQuantities[panierId]; // Remove quantity for deselected panier
                setPanierQuantities(updatedQuantities);
            } else {
                // Select panier
                updatedPaniers = [...prev, panierId];
                setPanierQuantities((prevQuantities) => ({
                    ...prevQuantities,
                    [panierId]: 1, // Default quantity to 1
                }));
            }

            // Update the `data` object with the new paniers and quantities
            const paniersData = updatedPaniers.map((id) => ({
                panier_id: id,
                quantity: panierQuantities[id] || 1,
            }));
            setData("paniers", paniersData);

            return updatedPaniers;
        });
    };

    // Handle quantity change for a panier
    const handleQuantityChange = (panierId, quantity) => {
        setPanierQuantities((prevQuantities) => {
            const updatedQuantities = {
                ...prevQuantities,
                [panierId]: quantity,
            };

            // Update the `data` object with the new quantities
            const paniersData = selectedPaniers.map((id) => ({
                panier_id: id,
                quantity: updatedQuantities[id] || 1,
            }));
            setData("paniers", paniersData);

            return updatedQuantities;
        });
    };

    // Calculate total price for a panier
    const calculatePanierTotal = (panier) => {
        const quantity = panierQuantities[panier.id] || 1;
        return panier.price * quantity;
    };

    // Calculate grand total for all selected paniers
    const calculateGrandTotal = () => {
        return selectedPaniers.reduce((total, panierId) => {
            const panier = paniers.find((p) => p.id === panierId);
            return total + calculatePanierTotal(panier);
        }, 0);
    };

    // Handle form submission
    const submit = (e) => {
        e.preventDefault();

        // Prepare paniers data with quantities
        const paniersData = selectedPaniers.map((panierId) => ({
            panier_id: panierId,
            quantity: panierQuantities[panierId] || 1, // Default to 1 if quantity is not set
        }));

        // Update form data
        setData("paniers", paniersData);

        // Submit the form
        post(route("commandes.store"), {
            onSuccess: () => {
            },
            onError: () => {
                toast.error("Une erreur s'est produite lors de la création de la commande.");
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Ajouter une commande
                </h2>
            }
        >
            <Head title="Ajouter une commande" />
            <Toaster position="bottom-center" reverseOrder={false} />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="py-5"
            >
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Panier Selection Section with Background Image */}
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative overflow-hidden bg-cover bg-center h-64 rounded-lg mb-8"
                        style={{ backgroundImage: 'url(/cmdd.jpg)' }} // Replace with your image path
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-6">
                            <div className="w-full max-w-2xl">
                                <button
                                    onClick={() => setShowProducts((prev) => !prev)}
                                    className="w-full text-left bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-between"
                                >
                                    <span>Sélectionner des Paniers</span>
                                    <motion.span
                                        initial={{ rotate: 0 }}
                                        animate={{ rotate: showProducts ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="ml-2 transform"
                                    >
                                        ▼
                                    </motion.span>
                                </button>
                                <AnimatePresence>
                                    {showProducts && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="mt-4 space-y-4"
                                        >
                                            {paniers.map((panier) => (
                                                <motion.div
                                                    key={panier.id}
                                                    initial={{ x: -20, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:bg-indigo-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                                                >
                                                    <div className="flex items-center space-x-4">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedPaniers.includes(panier.id)}
                                                            onChange={() => handlePanierSelection(panier.id)}
                                                            className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                                        />
                                                        <span className="font-medium text-indigo-600 dark:text-indigo-400">
                                                            {panier.name}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                                        {panier.price} DT
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                    {/* Create Commande Form Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800"
                    >
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Date Prévu
                                    </label>
                                    <input
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData("date", e.target.value)}
                                        min={new Date().toISOString().split("T")[0]}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    />
                                    <span className="text-red-500 text-xs">{errors.date}</span>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Description (optionnel)
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    />
                                    <span className="text-red-500 text-xs">{errors.description}</span>
                                </div>

                                {/* Display Selected Panier Articles and Quantity Input */}
                                {selectedPaniers.length > 0 && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                            Détails de la Commande
                                        </label>
                                        <div className="mt-2">
                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                <thead className="bg-gray-50 dark:bg-gray-900">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                            Produit
                                                        </th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                            Prix Unitaire
                                                        </th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                            Quantité
                                                        </th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                            Total
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                                    {paniers
                                                        .filter((panier) => selectedPaniers.includes(panier.id))
                                                        .map((panier) => (
                                                            <React.Fragment key={panier.id}>
                                                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                                        {panier.name}
                                                                    </td>
                                                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                                        {panier.price} DT
                                                                    </td>
                                                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                                        <input
                                                                            type="number"
                                                                            value={panierQuantities[panier.id] || 1}
                                                                            onChange={(e) =>
                                                                                handleQuantityChange(panier.id, parseInt(e.target.value))
                                                                            }
                                                                            min="1"
                                                                            className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                                                        />
                                                                    </td>
                                                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                                        {calculatePanierTotal(panier)} DT
                                                                    </td>
                                                                </tr>
                                                                {/* Display Articles for Each Panier */}
                                                                {panier.articles && panier.articles.length > 0 && (
                                                                    <tr>
                                                                        <td colSpan={4} className="px-4 py-2">
                                                                            <div className="pl-8">
                                                                                <table className="w-full">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                                                                Article
                                                                                            </th>
                                                                                            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                                                                Quantité
                                                                                            </th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {panier.articles.map((article) => (
                                                                                            <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                                                                <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                                                                                                    {article.name}
                                                                                                </td>
                                                                                                <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                                                                                                    {article.pivot.quantity}
                                                                                                </td>
                                                                                            </tr>
                                                                                        ))}
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </React.Fragment>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="mt-4 text-right">
                                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                Total: {calculateGrandTotal()} DT
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                                >
                                    Ajouter
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AuthenticatedLayout>
    );
};

export default Add;
