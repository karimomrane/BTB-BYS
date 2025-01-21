import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ExtraArticlesSection from "./ExtraArticlesSection";
import PanierSelectionSection from "./PanierSelectionSection";

const Add = ({ paniers, articles }) => {
    const [selectedPaniers, setSelectedPaniers] = useState([]);
    const [panierQuantities, setPanierQuantities] = useState({}); // Track quantity for each panier
    const [showProducts, setShowProducts] = useState(false);
    const [showExtraArticles, setShowExtraArticles] = useState(false);
    const [selectedExtraArticles, setSelectedExtraArticles] = useState([]);
    const [extraArticleQuantities, setExtraArticleQuantities] = useState({}); // Track quantity for each extra article

    const { data, setData, post, errors, processing } = useForm({
        date: "",
        description: "",
        paniers: [], // Array to store selected panier IDs and quantities
        articles_commandes: [], // Array to store selected extra articles and quantities
    });

    // Handle panier selection
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

    // Handle extra article selection
    const handleExtraArticleSelection = (articleId) => {
        setSelectedExtraArticles((prev) => {
            let updatedArticles;
            if (prev.includes(articleId)) {
                // Deselect article
                updatedArticles = prev.filter((id) => id !== articleId);
                const updatedQuantities = { ...extraArticleQuantities };
                delete updatedQuantities[articleId]; // Remove quantity for deselected article
                setExtraArticleQuantities(updatedQuantities);
            } else {
                // Select article
                updatedArticles = [...prev, articleId];
                setExtraArticleQuantities((prevQuantities) => ({
                    ...prevQuantities,
                    [articleId]: 1, // Default quantity to 1
                }));
            }

            // Update the `data` object with the new articles and quantities
            const articlesData = updatedArticles.map((id) => ({
                article_id: id,
                quantity: extraArticleQuantities[id] || 1,
            }));
            setData("articles_commandes", articlesData);

            return updatedArticles;
        });
    };

    // Handle quantity change for an extra article
    const handleExtraArticleQuantityChange = (articleId, quantity) => {
        setExtraArticleQuantities((prevQuantities) => {
            const updatedQuantities = {
                ...prevQuantities,
                [articleId]: quantity,
            };

            // Update the `data` object with the new quantities
            const articlesData = selectedExtraArticles.map((id) => ({
                article_id: id,
                quantity: updatedQuantities[id] || 1,
            }));
            setData("articles_commandes", articlesData);

            return updatedQuantities;
        });
    };

    // Calculate total price for a panier
    const calculatePanierTotal = (panier) => {
        const quantity = panierQuantities[panier.id] || 1;
        return panier.price * quantity;
    };

    // Calculate total price for an extra article
    const calculateExtraArticleTotal = (article) => {
        const quantity = extraArticleQuantities[article.id] || 1;
        return article.price * quantity;
    };

    // Calculate grand total for all selected paniers and extra articles
    const calculateGrandTotal = () => {
        const paniersTotal = selectedPaniers.reduce((total, panierId) => {
            const panier = paniers.find((p) => p.id === panierId);
            return total + calculatePanierTotal(panier);
        }, 0);

        const articlesTotal = selectedExtraArticles.reduce((total, articleId) => {
            const article = articles.find((a) => a.id === articleId);
            return total + calculateExtraArticleTotal(article);
        }, 0);

        return paniersTotal + articlesTotal;
    };

    // Handle form submission
    const submit = (e) => {
        e.preventDefault();

        // Prepare paniers data with quantities
        const paniersData = selectedPaniers.map((panierId) => ({
            panier_id: panierId,
            quantity: panierQuantities[panierId] || 1,
        }));

        // Prepare extra articles data with quantities
        const articlesData = selectedExtraArticles.map((articleId) => ({
            article_id: articleId,
            quantity: extraArticleQuantities[articleId] || 1,
        }));

        // Update form data
        setData("paniers", paniersData);
        setData("articles_commandes", articlesData);

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
                    {/* Panier Selection Section */}
                    <PanierSelectionSection
                        paniers={paniers}
                        selectedPaniers={selectedPaniers}
                        handlePanierSelection={handlePanierSelection}
                    />

                    {/* Extra Articles Selection Section */}
                    <ExtraArticlesSection
                        articles={articles}
                        selectedExtraArticles={selectedExtraArticles}
                        handleExtraArticleSelection={handleExtraArticleSelection}
                    />

                    {/* Create Commande Form Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800"
                    >
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit}>
                                {/* Date and Description Fields */}
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
                                            Détails des Paniers
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
                                    </div>
                                )}

                                {/* Display Selected Extra Articles and Quantity Input */}
                                {selectedExtraArticles.length > 0 && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                            Détails des Articles Supplémentaires
                                        </label>
                                        <div className="mt-2">
                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                <thead className="bg-gray-50 dark:bg-gray-900">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                            Article
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
                                                    {articles
                                                        .filter((article) => selectedExtraArticles.includes(article.id))
                                                        .map((article) => (
                                                            <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                                    {article.name}
                                                                </td>
                                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                                    {article.price} DT
                                                                </td>
                                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                                    <input
                                                                        type="number"
                                                                        value={extraArticleQuantities[article.id] || 1}
                                                                        onChange={(e) =>
                                                                            handleExtraArticleQuantityChange(article.id, parseInt(e.target.value))
                                                                        }
                                                                        min="1"
                                                                        className="w-20 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                                                    />
                                                                </td>
                                                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                                    {calculateExtraArticleTotal(article)} DT
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Grand Total */}
                                <div className="mt-4 text-right">
                                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        Total: {calculateGrandTotal()} DT
                                    </p>
                                </div>

                                {/* Submit Button */}
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
