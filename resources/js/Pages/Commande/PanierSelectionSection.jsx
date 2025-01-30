import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './styles.css';
import { FaCheck } from "react-icons/fa";

const PanierSelectionSection = ({ paniers, selectedPaniers, handlePanierSelection }) => {
    const [showModal, setShowModal] = useState(false);
    const [hoveredPanier, setHoveredPanier] = useState(null);
    const [loadedImages, setLoadedImages] = useState({});
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

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
                style={{ backgroundImage: 'url(/cmdd.jpg)' }}
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
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl p-7 mx-4"
                            onClick={(e) => e.stopPropagation()}
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
                                        className={`relative bg-white h-[22rem] dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden p-4 border-2 z-10 ${
                                            selectedPaniers.includes(panier.id)
                                                ? "border-green-500"
                                                : "border-transparent"
                                        }`}
                                        onMouseEnter={(e) => {
                                            setHoveredPanier(panier.id);
                                            setCursorPos({ x: e.clientX, y: e.clientY });
                                        }}
                                        onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
                                        onMouseLeave={() => setHoveredPanier(null)}
                                        onClick={() => handlePanierSelection(panier.id)}
                                    >
                                        {/* Selection Checkmark */}
                                        {selectedPaniers.includes(panier.id) && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3 }}
                                                className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-2 z-10"
                                            >
                                                <FaCheck size={16} />
                                            </motion.div>
                                        )}

                                        {/* Panier Image */}
                                        <div className="relative h-40 w-full mb-4">
                                            {!loadedImages[panier.id] && (
                                                <div className="skeleton-loading absolute inset-0 bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                                            )}
                                            <img
                                                src={`/storage/${panier.image}`}
                                                alt={panier.name}
                                                className={`w-full h-full object-cover rounded-md ${
                                                    !loadedImages[panier.id] ? "opacity-0" : "opacity-100"
                                                }`}
                                                loading="lazy"
                                                onLoad={() => handleImageLoad(panier.id)}
                                            />
                                        </div>

                                        {/* Panier Details */}
                                        <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                                            {panier.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                            {panier.description}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                            Prix: {panier.price} DT
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Articles List */}
            <AnimatePresence>
                {hoveredPanier && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: "fixed",
                            top: cursorPos.y + 20,
                            left: cursorPos.x + 20,
                            minWidth: "200px",
                        }}
                        className="hovered-articles-list bg-black bg-opacity-80 text-white p-4 rounded-md shadow-lg z-50"
                    >
                        <ul className="text-sm">
                            {paniers.find((p) => p.id === hoveredPanier)?.articles.map((article, index) => (
                                <li key={index}>
                                    <strong>{index + 1}.</strong> {article.name}
                                </li>
                            )) || <li>Aucun article</li>}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default PanierSelectionSection;
