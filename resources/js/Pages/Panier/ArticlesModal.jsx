import { motion } from 'framer-motion';
import { FaTimes } from "react-icons/fa"; // Import the X icon
import { useForm } from "@inertiajs/react"; // Import useForm for delete and patch requests
import { router } from '@inertiajs/react';
import { useState } from 'react'; // Import useState for local state management
import './styles.css';
import toast from 'react-hot-toast';

const ArticlesModal = ({ panier: initialPanier, onClose }) => {
    const { delete: deleteArticle } = useForm(); // Use Inertia's delete method
    const [panier, setPanier] = useState(initialPanier); // Local state for panier

    // Calculate totals based on quantity
    const totalNonExtra = panier.articles
        .filter((article) => article.pivot.extra === 0)
        .reduce((sum, article) => sum + article.price * article.pivot.quantity, 0);

    const totalExtra = panier.articles
        .filter((article) => article.pivot.extra === 1)
        .reduce((sum, article) => sum + article.price * article.pivot.quantity, 0);

    const grandTotal = totalNonExtra + totalExtra;

    // Calculate margin
    const margin = panier.price - grandTotal;

    // Function to handle article deletion
    const handleDeleteArticle = (articleId) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet article du panier ?")) {
            deleteArticle(route("article_paniers.destroy", { panier: panier.id, article: articleId }), {
                onSuccess: () => {
                    // Update the local state by removing the deleted article
                    const updatedArticles = panier.articles.filter((article) => article.id !== articleId);
                    setPanier({
                        ...panier,
                        articles: updatedArticles,
                    });
                },
                onError: () => {
                    alert("Une erreur s'est produite lors de la suppression de l'article.");
                },
            });
        }
    };

    // Handle toggling extra/ready fields
    const handleToggle = (articleId, field, value) => {
        console.log(articleId, field, value);

        router.patch(route("article_paniers.update", { panier: panier.id, article: articleId }), {
            [field]: value ? 1 : 0,
        }, {
            onSuccess: () => {
                toast.success(`Champ ${field} mis à jour avec succès!`);

                // Update the local state
                const updatedArticles = panier.articles.map((article) => {
                    if (article.id === articleId) {
                        return {
                            ...article,
                            pivot: {
                                ...article.pivot,
                                [field]: value ? 1 : 0, // Update the field
                            },
                        };
                    }
                    return article;
                });

                setPanier({
                    ...panier,
                    articles: updatedArticles, // Update the articles array
                });
            },
            onError: (errors) => {
                console.log("Erreur lors de la mise à jour:", errors);
                toast.error("Une erreur s'est produite lors de la mise à jour.");
            },
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-auto w-[90%] max-h-[90%] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">Articles in {panier.name}</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                    Nom
                                </th>
                                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                    Description
                                </th> */}
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                    Quantité
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                    Prix Unitaire
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                    Image
                                </th>
                                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                    Extra
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                    Prét
                                </th> */}
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            {panier.articles.map((article) => (
                                <tr
                                    key={`${panier.id}-${article.id}`}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {article.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {article.name}
                                    </td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {article.description}
                                    </td> */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {article.pivot.quantity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {article.price} DT
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {article.image ? (
                                            <img
                                                src={`/storage/${article.image}`}
                                                alt={article.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                        ) : (
                                            <span className="text-gray-500">Aucune image</span>
                                        )}
                                    </td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">

                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={article.pivot.extra === 1}
                                                onChange={(e) =>
                                                    handleToggle(article.id, "extra", e.target.checked)
                                                }
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={article.pivot.ready === 1}
                                                onChange={(e) =>
                                                    handleToggle(article.id, "ready", e.target.checked)
                                                }
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </td> */}


                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        <button
                                            onClick={() => handleDeleteArticle(article.id)}
                                            className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400 transition"
                                        >
                                            <FaTimes /> {/* X icon */}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr className="bg-gray-50 dark:bg-gray-700">
                                <td colSpan={4} className="bg-gray-100 dark:bg-gray-900 px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900 dark:text-gray-100">
                                    <span className="font-semibold">Totals :</span>
                                </td>
                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                    <span className="font-semibold">Total Non-Extra:</span> {totalNonExtra.toFixed(2)} DT
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                    <span className="font-semibold">Total Extra:</span> {totalExtra.toFixed(2)} DT
                                </td> */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                    <span className="font-semibold">Total:</span> {grandTotal.toFixed(2)} DT
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Summary List */}
                <div className="mt-6 space-y-2">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Prix Panier:</span> {panier.price.toFixed(2)} DT
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Marge:</span> {margin.toFixed(2)} DT
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                    Fermer
                </button>
            </motion.div>
        </motion.div>
    );
};

export default ArticlesModal;
