import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Head, Link, usePage } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ArticlesModal from './ArticlesModal';

const Index = ({ paniers, status }) => {
    const user = usePage().props.auth.user;
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPanier, setSelectedPanier] = useState(null);

    if (status) {
        toast.success(status);
    }

    const openImage = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeImage = () => {
        setSelectedImage(null);
    };

    const handleViewArticles = (panier) => {
        setSelectedPanier(panier);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {user.role === "admin" && (
                        <NavLink
                            href={route("paniers.create")}
                            active={route().current("paniers.create")}
                            className="px-4 py-2 mr-5 rounded border-b-2 border-indigo-600"
                        >
                            Ajouter Panier
                        </NavLink>
                    )}
                    {user.role === "admin" && (
                        <NavLink
                            href={route("article_paniers.create")}
                            active={route().current("article_paniers.create")}
                            className="px-4 py-2 rounded border-b-2 border-indigo-600"
                        >
                            Affecter Articles
                        </NavLink>
                    )}
                </h2>
            }
        >
            <Head title="Liste des Paniers" />
            <Toaster />
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
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
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Description
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Prix
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Image
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {paniers.map((panier) => (
                                            <tr key={panier.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {panier.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {panier.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {panier.description}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {panier.price} DT
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {panier.image ? (
                                                        <button
                                                            onClick={() => openImage(`/storage/${panier.image}`)}
                                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400 transition"
                                                        >
                                                            Afficher
                                                        </button>
                                                    ) : (
                                                        <span className="text-gray-500">Aucune image</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                                                    <button
                                                        onClick={() => handleViewArticles(panier)}
                                                        className="text-green-600 hover:text-green-900 dark:text-green-500 dark:hover:text-green-400 transition"
                                                    >
                                                        Voir Articles
                                                    </button>
                                                    {user.role === "admin" && (
                                                        <>
                                                            <Link
                                                                href={route("paniers.edit", panier.id)}
                                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400 transition"
                                                            >
                                                                Editer
                                                            </Link>
                                                            <Link
                                                                href={route("paniers.destroy", panier.id)}
                                                                method="delete"
                                                                as="button"
                                                                type="button"
                                                                className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400 transition"
                                                            >
                                                                Supprimer
                                                            </Link>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {paniers.length === 0 && (
                                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                                    Aucun panier disponible.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                        onClick={closeImage}
                    >
                        <motion.img
                            src={selectedImage}
                            alt="Full screen"
                            className="max-w-full max-h-full"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {selectedPanier && (
                    <ArticlesModal
                        panier={selectedPanier}
                        onClose={() => setSelectedPanier(null)}
                    />
                )}
            </AnimatePresence>
        </AuthenticatedLayout>
    );
};

export default Index;
