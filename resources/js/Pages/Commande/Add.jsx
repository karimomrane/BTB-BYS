import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';

const Add = () => {
    const { data, setData, post, errors, processing } = useForm({
        nbpanier: "",
        date: "",
        description: "",
    });

    const cartProducts = [
        { name: "Sucre", quantity: 2 },
        { name: "Farine", quantity: 1 },
        { name: "Dattes", quantity: 3 },
    ];

    const submit = (e) => {
        e.preventDefault();
        post(route("commandes.store"), {
            onSuccess: () => {
                toast('Here is your toast.');
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
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
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
                                {/* Form Section */}
                                <motion.div
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
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

                                {/* Image and Product List Section */}
                                <motion.div
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col items-center"
                                >
                                    <img
                                        src="/carttt.png"
                                        alt="Ramadhan Cart"
                                        className="w-1/2 rounded-lg shadow-md"
                                    />
                                    <div className="mt-4 text-center">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                            Produits dans le Panier
                                        </h3>
                                        <motion.ul
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 1 }}
                                            className="mt-2 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside"
                                        >
                                            {cartProducts.length > 0 ? (
                                                cartProducts.map((product, index) => (
                                                    <motion.li
                                                        key={index}
                                                        initial={{ x: -20, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ delay: index * 0.2 }}
                                                    >
                                                        <span className="font-medium text-gray-800 dark:text-gray-200">
                                                            {product.name}
                                                        </span>{" "}
                                                        - {product.quantity} unité
                                                        {product.quantity > 1 ? "s" : ""}
                                                    </motion.li>
                                                ))
                                            ) : (
                                                <li>Aucun produit dans le panier.</li>
                                            )}
                                        </motion.ul>
                                    </div>
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
