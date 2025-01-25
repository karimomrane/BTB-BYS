import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PanierSelectionSection = ({ paniers, selectedPaniers, handlePanierSelection }) => {
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
                style={{ backgroundImage: 'url(/cmdd.jpg)' }} // Replace with your image path
            >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-6">
                    <button
                        onClick={() => setShowModal(true)}
                        className="w-full text-left bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-between"
                    >
                        <span>Sélectionner des Paniers</span>
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
                            className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl p-7 mx-4"
                            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                                    Sélectionner des Paniers
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

                            {/* Paniers Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto h-[450px]">
                                {paniers.map((panier) => (
                                    <motion.div
                                        key={panier.id}
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className="bg-white h-[22rem] dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                                    >
                                        <label htmlFor={`panier-${panier.id}`}>
                                            {/* Panier Image with Skeleton Loading */}
                                            <div className="relative h-40 w-full">
                                                {!loadedImages[panier.id] && (
                                                    <div className="skeleton-loading absolute inset-0 bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                                                )}
                                                <img
                                                    src={`/storage/${panier.image}`} // Replace with your panier image field
                                                    alt={panier.name}
                                                    className={`w-full h-full object-cover ${!loadedImages[panier.id] ? "opacity-0" : "opacity-100"}`}
                                                    loading="lazy"
                                                    onLoad={() => handleImageLoad(panier.id)}
                                                />
                                            </div>
                                        </label>

                                        {/* Panier Details */}
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                                                {panier.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                                {panier.description} {/* Add a description field if available */}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                                Prix: {panier.price} DT
                                            </p>
                                        </div>

                                        {/* Selection Checkbox */}
                                        <div className="p-4 border-t border-gray-200 dark:border-gray-600">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    id={`panier-${panier.id}`}
                                                    type="checkbox"
                                                    checked={selectedPaniers.includes(panier.id)}
                                                    onChange={() => handlePanierSelection(panier.id)}
                                                    className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                                />
                                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                                    Sélectionner
                                                </span>
                                            </label>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Skeleton Loading Animation CSS */}
            <style jsx>{`
                .skeleton-loading {
                    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                }

                @keyframes shimmer {
                    0% {
                        background-position: -200% 0;
                    }
                    100% {
                        background-position: 200% 0;
                    }
                }
            `}</style>
        </>
    );
};

export default PanierSelectionSection;
