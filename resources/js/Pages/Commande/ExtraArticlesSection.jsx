import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './styles.css';

const ExtraArticlesSection = ({ articles, selectedExtraArticles, handleExtraArticleSelection }) => {
    const [showModal, setShowModal] = useState(false);
    const [loadedImages, setLoadedImages] = useState({}); // Track loaded images

    // Handle image load
    const handleImageLoad = (id) => {
        setLoadedImages((prev) => ({ ...prev, [id]: true }));
    };

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
                        className="w-full text-left bg-[#7BBA27] hover:bg-[#6aa322] text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-between transition-colors"
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
                            className="bg-green-100 dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl p-6 mx-4"
                            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-[#7BBA27] dark:text-[#7BBA27]">
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

                            {/* Articles Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                {articles
                                    .filter((article) => article.is_extra)
                                    .map((article) => (
                                        <motion.div
                                            key={article.id}
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.3, delay: 0.1 }}
                                            className={`bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col relative ${
                                                selectedExtraArticles.includes(article.id) ? "border-2 border-green-500" : "border-transparent"
                                            }`}
                                            style={{ minHeight: "300px" }} // Fixed height for consistency
                                            onClick={() => handleExtraArticleSelection(article.id)} // Handle selection on click
                                        >
                                            {/* Article Image with Skeleton Loading */}
                                            <div className="relative h-40 w-full flex-shrink-0">
                                                {!loadedImages[article.id] && (
                                                    <div className="skeleton-loading absolute inset-0 bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                                                )}
                                                <img
                                                    src={`/storage/${article.image}`} // Replace with your article image field
                                                    alt={article.name}
                                                    className={`w-full h-full object-cover ${!loadedImages[article.id] ? "opacity-0" : "opacity-100"}`}
                                                    loading="lazy"
                                                    onLoad={() => handleImageLoad(article.id)}
                                                />
                                            </div>

                                            {/* Article Details */}
                                            <div className="p-4 flex flex-col flex-grow">
                                                <h3 className="text-lg font-semibold text-[#000000] dark:text-[#ffffff] line-clamp-2">
                                                    {article.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
                                                    {article.description} {/* Add a description field if available */}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                                    Prix: {article.price} DT
                                                </p>
                                            </div>

                                            {/* Green Checkmark */}
                                            {selectedExtraArticles.includes(article.id) && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="absolute top-2 right-2 bg-green-500 rounded-full p-1"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 text-white"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                </motion.div>
                                            )}
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
