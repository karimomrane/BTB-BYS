import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ExtraArticlesSection = ({ articles, selectedExtraArticles, handleExtraArticleSelection }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* Button to Open Modal */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden bg-cover bg-center h-24 rounded-lg mb-8"
                style={{ backgroundImage: 'url(/CMD.jpg)' }} // Replace with your image path
            >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-6">
                    <button
                        onClick={() => setShowModal(true)}
                        className="w-full text-left bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-between"
                    >
                        <span>Sélectionner des Articles Supplémentaires</span>
                        <span className="ml-2 transform">▼</span>
                    </button>
                </div>
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                        onClick={() => setShowModal(false)} // Close modal on outside click
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl p-6 mx-4"
                            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                                    Articles Supplémentaires
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Articles List */}
                            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                                {articles
                                    .filter((article) => article.is_extra)
                                    .map((article) => (
                                        <motion.div
                                            key={article.id}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.3, delay: 0.1 }}
                                            className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:bg-indigo-50 dark:hover:bg-gray-600"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedExtraArticles.includes(article.id)}
                                                    onChange={() => handleExtraArticleSelection(article.id)}
                                                    className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                                />
                                                <span className="font-medium text-indigo-600 dark:text-indigo-400">
                                                    {article.name}
                                                </span>
                                            </div>
                                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                                {article.price} DT
                                            </span>
                                        </motion.div>
                                    ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ExtraArticlesSection;
