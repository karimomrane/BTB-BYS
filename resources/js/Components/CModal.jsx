import { Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CModal = ({ isOpen, onClose, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <Fragment>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={onClose} // Close modal when backdrop is clicked
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 flex items-center justify-center z-50"
                    >
                        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
                            {children}
                        </div>
                    </motion.div>
                </Fragment>
            )}
        </AnimatePresence>
    );
};

export default CModal;
