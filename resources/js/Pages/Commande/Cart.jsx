import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const Cart = ({ paniers,
    articles,
    selectedPaniers,
    panierQuantities,
    selectedExtraArticles,
    extraArticleQuantities,
    isCartOpen,
    setIsCartOpen,
    closeCart,
    calculateGrandTotal, calculatePanierTotal,
    calculateExtraArticleTotal,
    handleQuantityChange,
    handleExtraArticleQuantityChange
}) => {
    return (
        <AnimatePresence>
            {isCartOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeCart}
                >
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-lg h-[600px] overflow-auto shadow-lg w-full max-w-4xl mx-4 p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Logo and Header */}
                        <div className="flex items-center justify-center mb-6">
                            <img
                                src="/logo.png" // Replace with your logo path
                                alt="Logo"
                                className="h-20 w-auto"
                            />
                        </div>

                        {/* Display Selected Panier Articles and Quantity Input */}
                        {selectedPaniers.length > 0 && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                                    Détails des Paniers
                                </label>
                                <div className="mt-2">
                                    {/* Mobile View (Stacked Layout) */}
                                    <div className="sm:hidden space-y-4">
                                        {paniers
                                            .filter((panier) => selectedPaniers.includes(panier.id))
                                            .map((panier) => (
                                                <div
                                                    key={panier.id}
                                                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                                >
                                                    {/* Panier Name */}
                                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                        {panier.name}
                                                    </p>

                                                    {/* Unit Price */}
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                        Prix Unitaire: {panier.price} DT
                                                    </p>

                                                    {/* Quantity Input */}
                                                    <div className="mt-2 flex items-center">
                                                        <label className="text-xs text-gray-600 dark:text-gray-400 mr-2">
                                                            Quantité:
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={panierQuantities[panier.id] || 1}
                                                            onChange={(e) =>
                                                                handleQuantityChange(panier.id, parseInt(e.target.value))
                                                            }
                                                            min="1"
                                                            className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                                        />
                                                    </div>

                                                    {/* Total Price */}
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                                        Total: {calculatePanierTotal(panier)} DT
                                                    </p>

                                                    {/* Display Articles for Each Panier */}
                                                    {panier.articles && panier.articles.length > 0 && (
                                                        <div className="mt-2">
                                                            <p className="text-xs font-medium text-gray-900 dark:text-gray-100">
                                                                Articles inclus:
                                                            </p>
                                                            {panier.articles.map((article) => (
                                                                <div key={article.id} className="ml-4">
                                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                                        {article.name} (x{article.pivot.quantity})
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                    </div>

                                    {/* Desktop View (Table Layout) */}
                                    <div className="hidden sm:block overflow-x-auto">
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
                            </div>
                        )}

                        {/* Display Selected Extra Articles and Quantity Input */}
                        {selectedExtraArticles.length > 0 && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                                    Détails des Articles Supplémentaires
                                </label>
                                <div className="mt-2">
                                    {/* Mobile View (Stacked Layout) */}
                                    <div className="sm:hidden space-y-4">
                                        {articles
                                            .filter((article) => selectedExtraArticles.includes(article.id))
                                            .map((article) => (
                                                <div
                                                    key={article.id}
                                                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                                >
                                                    {/* Article Name */}
                                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                        {article.name}
                                                    </p>

                                                    {/* Unit Price */}
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                        Prix Unitaire: {article.price} DT
                                                    </p>

                                                    {/* Quantity Input */}
                                                    <div className="mt-2 flex items-center">
                                                        <label className="text-xs text-gray-600 dark:text-gray-400 mr-2">
                                                            Quantité:
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={extraArticleQuantities[article.id] || 1}
                                                            onChange={(e) =>
                                                                handleExtraArticleQuantityChange(article.id, parseInt(e.target.value))
                                                            }
                                                            min="1"
                                                            className="w-20 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                                        />
                                                    </div>

                                                    {/* Total Price */}
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                                        Total: {calculateExtraArticleTotal(article)} DT
                                                    </p>
                                                </div>
                                            ))}
                                    </div>

                                    {/* Desktop View (Table Layout) */}
                                    <div className="hidden sm:block overflow-x-auto">
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
                            </div>
                        )}

                        {/* Grand Total */}
                        <div className="mt-6 text-right">
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Total: {calculateGrandTotal()} DT
                            </p>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={closeCart}
                            className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500 transition-colors"
                        >
                            Fermer
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Cart;
