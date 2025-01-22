import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, router } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "@/Components/Pagination"; // Import a custom Pagination component

const Index = ({ articles, filters }) => {
    const user = usePage().props.auth.user;
    const [selectedImage, setSelectedImage] = useState(null); // State to track the selected image
    const [search, setSearch] = useState(filters.search || ""); // State for search input
    const [isExtra, setIsExtra] = useState(filters.is_extra || null); // State for extra filter

    // Show toast notification for status
    if (usePage().props.status) {
        toast.success(usePage().props.status);
    }

    // Function to open the image in full screen
    const openImage = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    // Function to close the full-screen image
    const closeImage = () => {
        setSelectedImage(null);
    };

    // Function to handle the toggle switch
    const handleToggle = (article) => {
        const newIsExtraValue = !article.is_extra;

        // Send a PATCH request to update the is_extra value
        router.patch(route("articles.update", article.id), {
            is_extra: newIsExtraValue,
        }, {
            onSuccess: () => {
                toast.success("Statut mis à jour avec succès !");
            },
            onError: () => {
                toast.error("Une erreur s'est produite lors de la mise à jour.");
            },
        });
    };

    // Function to handle search
    const handleSearch = (e) => {
        setSearch(e.target.value);

        router.get(route("articles.index"), { search: e.target.value, is_extra: isExtra }, {
            preserveState: true,
            replace: true,
        });
    };

    // Function to handle extra filter
    const handleExtraFilter = (e) => {
        const value = e.target.value;
        setIsExtra(value);
        router.get(route("articles.index"), { search, is_extra: value }, {
            preserveState: true,
            replace: true,
        });
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
            <Toaster position="top-center" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Search and Filter Section */}
                            <div className="mb-4 flex gap-4">
                                {/* Search Input */}
                                <input
                                    type="text"
                                    placeholder="Rechercher un article..."
                                    value={search}
                                    onChange={handleSearch}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                />

                                {/* Extra Filter Dropdown */}
                                <select
                                    value={isExtra}
                                    onChange={handleExtraFilter}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                >
                                    <option value="">Tous les articles</option>
                                    <option value="1">Articles supplémentaires</option>
                                    <option value="0">Articles normaux</option>
                                </select>
                            </div>

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
                                                Extra
                                            </th>
                                            {user.role === "admin" && (
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                    Actions
                                                </th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {articles.data.map((article) => (
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
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={article.is_extra}
                                                            onChange={() => handleToggle(article)}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                    </label>
                                                </td>
                                                {user.role === "admin" && (
                                                    <td className="px-6 py-4 whitespace-nowrap flex gap-4">
                                                        <Link
                                                            href={route("articles.edit", article.id)}
                                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400 transition"
                                                        >
                                                            <FaEdit />
                                                        </Link>
                                                        <Link
                                                            href={route("articles.destroy", article.id)}
                                                            method="delete"
                                                            as="button"
                                                            type="button"
                                                            className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400 transition"
                                                        >
                                                            <FaTrash />
                                                        </Link>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <Pagination links={articles.links} className="mt-6" />

                            {articles.data.length === 0 && (
                                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                                    Aucun article disponible.
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
