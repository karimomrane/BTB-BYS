import { useState, useEffect } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Head, Link } from "@inertiajs/react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Welcome({ auth, laravelVersion, phpVersion }) {

const [isAnimating, setIsAnimating] = useState(true);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        className="h-screen flex flex-col justify-between bg-cover bg-center bg-[#018A3A]"
            style={{ backgroundImage: "url(bgc.jpg)" }}
            onAnimationComplete={() => setIsAnimating(false)} // When the animation ends
        >
            {/* Nav */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full container mx-auto p-4 flex items-center justify-between"
            >
                <a
                    className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
                    href="#"
                >
                    <ApplicationLogo width={80} height={80} />
                </a>
                <div className="flex space-x-4">
                    <a
                        className="text-white hover:text-green-400 text-xl"
                        href="https://www.facebook.com/benyaghlane.shops"
                    >
                        <FaFacebook />
                    </a>
                    <a
                        className="text-white hover:text-green-400 text-xl"
                        href="https://www.instagram.com/benyaghlaneshops/"
                    >
                        <FaInstagram />
                    </a>
                </div>
            </motion.div>

            {/* Main */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="container mx-auto flex flex-wrap items-center px-6 lg:px-20"
            >
                {/* Left Col */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left"
                >
                    <h1 className="text-4xl md:text-5xl text-white font-bold leading-tight mb-6">
                        B2B By Ben Yaghlane Shops
                    </h1>
                    <p className="text-gray-100 text-lg md:text-xl mb-6">
                        B2B by Ben Yaghlane Shops is your one-stop solution for all your shopping needs.
                    </p>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {auth?.user ? (
                            <Link
                                href={route("commandes.create")}
                                className="px-6 py-3 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition"
                            >
                                Passer une commande
                            </Link>
                        ) : (
                            <Link
                                href={route("login")}
                                className="px-6 py-3 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
                            >
                                Se Connecter
                            </Link>
                        )}
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Footer */}
            <motion.footer
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-full bg-gray-200 bg-opacity-0 py-4 text-center text-white text-sm"
            >
                <p>
                    © 2025 <a href="#" className="hover:text-white">Equipe IT Ben YaghlaneShops</a>. All Rights Reserved.
                </p>
            </motion.footer>
        </motion.div>
    );
}
