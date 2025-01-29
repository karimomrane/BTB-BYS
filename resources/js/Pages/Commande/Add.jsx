import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import ExtraArticlesSection from "./ExtraArticlesSection";
import PanierSelectionSection from "./PanierSelectionSection";
import Cart from "./Cart";
import { FaBagShopping, FaProductHunt, FaShop } from "react-icons/fa6";

const Add = ({ paniers, articles }) => {
    const [selectedPaniers, setSelectedPaniers] = useState([]);
    const [panierQuantities, setPanierQuantities] = useState({});
    const [selectedExtraArticles, setSelectedExtraArticles] = useState([]);
    const [extraArticleQuantities, setExtraArticleQuantities] = useState({});
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [animatingItem, setAnimatingItem] = useState(null); // Track the item being animated

    const { data, setData, post, errors, processing } = useForm({
        date: "",
        description: "",
        paniers: [],
        articles_commandes: [],
    });

    // Handle panier selection
    const handlePanierSelection = (panierId) => {
        const panier = paniers.find((p) => p.id === panierId);
        const isDeselecting = selectedPaniers.includes(panierId);

        setAnimatingItem({
            id: panierId,
            type: "panier",
            name: panier.name,
            direction: isDeselecting ? "reverse" : "forward", // Add direction
        });

        setSelectedPaniers((prev) => {
            let updatedPaniers;
            if (isDeselecting) {
                updatedPaniers = prev.filter((id) => id !== panierId);
                const updatedQuantities = { ...panierQuantities };
                delete updatedQuantities[panierId];
                setPanierQuantities(updatedQuantities);
            } else {
                updatedPaniers = [...prev, panierId];
                setPanierQuantities((prevQuantities) => ({
                    ...prevQuantities,
                    [panierId]: 1,
                }));
            }

            const paniersData = updatedPaniers.map((id) => ({
                panier_id: id,
                quantity: panierQuantities[id] || 1,
            }));
            setData("paniers", paniersData);

            return updatedPaniers;
        });
    };

    // Handle extra article selection
    const handleExtraArticleSelection = (articleId) => {
        const article = articles.find((a) => a.id === articleId);
        const isDeselecting = selectedExtraArticles.includes(articleId);

        setAnimatingItem({
            id: articleId,
            type: "article",
            name: article.name,
            direction: isDeselecting ? "reverse" : "forward", // Add direction
        });

        setSelectedExtraArticles((prev) => {
            let updatedArticles;
            if (isDeselecting) {
                updatedArticles = prev.filter((id) => id !== articleId);
                const updatedQuantities = { ...extraArticleQuantities };
                delete updatedQuantities[articleId];
                setExtraArticleQuantities(updatedQuantities);
            } else {
                updatedArticles = [...prev, articleId];
                setExtraArticleQuantities((prevQuantities) => ({
                    ...prevQuantities,
                    [articleId]: 1,
                }));
            }

            const articlesData = updatedArticles.map((id) => ({
                article_id: id,
                quantity: extraArticleQuantities[id] || 1,
            }));
            setData("articles_commandes", articlesData);

            return updatedArticles;
        });
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

    // Handle animation completion
    const handleAnimationComplete = () => {
        setAnimatingItem(null); // Clear the animating item after the animation is done
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
    // Calculate total number of selected items
    const totalSelectedItems = selectedPaniers.length + selectedExtraArticles.length;

    // Open cart modal
    const openCart = () => {
        setIsCartOpen(true);
    };

    // Close cart modal
    const closeCart = () => {
        setIsCartOpen(false);
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

            {/* Cart Icon with Badge */}
            <div className="fixed top-20 right-4 z-50">
                <button
                    onClick={openCart}
                    className="relative p-3 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 focus:outline-none"
                >
                    <FaShoppingCart className="w-6 h-6" />
                    {totalSelectedItems > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                            {totalSelectedItems}
                        </span>
                    )}
                </button>
            </div>



            {/* Cart Modal */}
            <Cart
                {...{
                    paniers,
                    articles,
                    selectedPaniers,
                    panierQuantities,
                    selectedExtraArticles,
                    extraArticleQuantities,
                    isCartOpen,
                    setIsCartOpen,
                    closeCart,
                    calculateGrandTotal,
                    calculatePanierTotal,
                    calculateExtraArticleTotal,
                    handleExtraArticleQuantityChange,
                    handleQuantityChange,
                }}
            />
            {/* Animate Item to Cart */}
            <AnimatePresence>
                {animatingItem && (
                    <motion.div
                        key={animatingItem.id}
                        initial={{
                            opacity: 1,
                            scale: 1,
                            position: "fixed",
                            top: animatingItem.direction === "forward" ? "50%" : "5rem", // Adjust initial position
                            left: animatingItem.direction === "forward" ? "50%" : "calc(100% - 4rem)", // Adjust initial position
                            zIndex: 1000,
                        }}
                        animate={{
                            opacity: 0,
                            scale: 0.5,
                            top: animatingItem.direction === "forward" ? "5rem" : "50%", // Reverse the animation
                            left: animatingItem.direction === "forward" ? "calc(100% - 4rem)" : "50%", // Reverse the animation
                            zIndex: 1000,
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        onAnimationComplete={handleAnimationComplete}
                        className="z-50"
                        style={{ zIndex: 1000 }} // Ensure it's on top
                    >
                        <div className=" text-green-500 px-3 py-1 rounded-full text-5xl">
                            <FaBagShopping />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Main Content */}
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
                                        Date de livraison prévu
                                    </label>
                                    <input
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData("date", e.target.value)}
                                        onBlur={(e) => {
                                            const selectedDate = new Date(e.target.value);
                                            const currentDate = new Date();
                                            if (selectedDate < currentDate) {
                                                setData("date", currentDate.toISOString().split("T")[0]);
                                            }
                                        }}
                                        min={new Date().toISOString().split("T")[0]}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    />
                                    <span className="text-red-500 text-xs">{errors.date}</span>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Commentaire
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    />
                                    <span className="text-red-500 text-xs">{errors.description}</span>
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
