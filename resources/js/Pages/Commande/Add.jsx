import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const Add = () => {
    const [showProducts, setShowProducts] = useState(false);

    const { data, setData, post, errors, processing } = useForm({
        nbpanier: "",
        date: "",
        description: "",
    });

    const cartProducts = [
        { name: "Dattes", quantity: 3 },
        { name: "Farine", quantity: 2 },
        { name: "Lait en poudre", quantity: 1 },
        { name: "Sucre", quantity: 2 },
        { name: "Chorba Épices", quantity: 1 },
        { name: "Pois chiches", quantity: 1 },
        { name: "Miel", quantity: 1 },
        { name: "Thé vert", quantity: 2 },
        { name: "Semoule", quantity: 2 },
        { name: "Olives", quantity: 1 },
    ];


    const submit = (e) => {
        e.preventDefault();
        post(route("commandes.store"), {
            onSuccess: () => {

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
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800"
                    >
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Product List Section */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    className="flex flex-col items-center mb-8 lg:mb-0 bg-cover bg-center p-6 rounded-lg"
                                    style={{ backgroundImage: 'url(/cmdd.jpg)' }}
                                >
                                    <div className="bg-black bg-opacity-40 p-4 rounded-lg w-full">
                                        <button
                                            onClick={() => setShowProducts((prev) => !prev)}
                                            className="w-full text-left bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-between"
                                        >
                                            <span>Produits dans le Panier</span>
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
                                                    className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                                                >
                                                    {cartProducts.length > 0 ? (
                                                        cartProducts.map((product, index) => (
                                                            <motion.div
                                                                key={index}
                                                                initial={{ x: -20, opacity: 0 }}
                                                                animate={{ x: 0, opacity: 1 }}
                                                                transition={{ delay: index * 0.2 }}
                                                                className="text-sm flex flex-col text-center items-center justify-between p-2 bg-white rounded-lg shadow-sm hover:bg-indigo-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                                                            >
                                                                <span className="font-medium text-indigo-600 dark:text-indigo-400">
                                                                    {product.name || "Produit inconnu"}
                                                                </span>
                                                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                                                    {product.quantity} unité{product.quantity > 1 ? "s" : ""}
                                                                </span>
                                                            </motion.div>
                                                        ))
                                                    ) : (
                                                        <motion.div
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            className="col-span-full text-center text-gray-500 dark:text-gray-400"
                                                        >
                                                            Aucun produit dans le panier.
                                                        </motion.div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>




                                {/* Form Section */}
                                <motion.div
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 1 }}
                                    className="lg:flex-1"
                                >
                                    <form onSubmit={submit}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                                Nombre de paniers
                                            </label>
                                            <input
                                                type="number"
                                                value={data.nbpanier}
                                                onChange={(e) => setData("nbpanier", e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                            />
                                            <span className="text-red-500 text-xs">{errors.nbpanier}</span>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                                Date Prévu
                                            </label>
                                            <input
                                                type="date"
                                                value={data.date}
                                                onChange={(e) => setData("date", e.target.value)}
                                                min={new Date().toISOString().split("T")[0]} // Set today's date as the minimum
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
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AuthenticatedLayout>
    );
};

export default Add;
