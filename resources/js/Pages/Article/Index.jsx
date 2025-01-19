import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Index = ({ articles, status }) => {
    const user = usePage().props.auth.user;
    const [selectedImage, setSelectedImage] = useState(null); // State to track the selected image

    // Show toast notification for status
    if (status) {
        toast.success(status);
    }

    // Function to open the image in full screen
    const openImage = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    // Function to close the full-screen image
    const closeImage = () => {
        setSelectedImage(null);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {user.role === "admin" && (
                        <NavLink
                            href={route("articles.create")}
                            active={route().current("articles.create")}
                            className="px-4 py-2 rounded border-b-2 border-indigo-600"
                        >
                            Ajouter Article
                        </NavLink>
                    )}
                </h2>
            }
        >
            <Head title="Liste des articles" />
            <Toaster />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
                                            {user.role === "admin" && (
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                    Actions
                                                </th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {articles.map((article) => (
                                            <tr
                                                key={article.id}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {article.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {article.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {article.description}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {article.price} DT
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    {article.image ? (
                                                        <button
                                                            onClick={() => openImage(`/storage/${article.image}`)}
                                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400 transition"
                                                        >
                                                            Afficher
                                                        </button>
                                                    ) : (
                                                        <span className="text-gray-500">Aucune image</span>
                                                    )}
                                                </td>
                                                {user.role === "admin" && (
                                                    <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                                                        <Link
                                                            href={route("articles.edit", article.id)}
                                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400 transition"
                                                        >
                                                            Editer
                                                        </Link>
                                                        <Link
                                                            href={route("articles.destroy", article.id)}
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
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {articles.length === 0 && (
                                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                                    Aucune article disponible.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Full-screen image modal */}
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
        </AuthenticatedLayout>
    );
};

export default Index;
