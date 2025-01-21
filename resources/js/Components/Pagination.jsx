import { Link } from "@inertiajs/react";

export default function Pagination({ links, className = "" }) {
    return (
        <div className={`flex justify-center ${className}`}>
            <nav className="flex space-x-2">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || "#"}
                        className={`px-4 py-2 rounded-lg ${
                            link.active
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        } ${!link.url ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-500 hover:text-white"}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </nav>
        </div>
    );
}
