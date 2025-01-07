import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";

const Add = () => {
    // Define the form state using the useForm hook
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        tel: "",
        adresse: "",
        siteweb: "",
        role: "user",  // Default role is 'user', but you can change it as needed
    });

    // Handle form submission
    const submit = (e) => {
        e.preventDefault();
        post(route("users.store"), {
            onSuccess: () => {
                // Optionally handle success (e.g., redirect or show a success message)
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Ajouter un utilisateur
                </h2>
            }
        >
            <Head title="Ajouter un utilisateur" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit}>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    {/* Name Input */}
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Nom
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData("name", e.target.value)}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                    </div>

                                    {/* Email Input */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => setData("email", e.target.value)}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                    </div>

                                    {/* Password Input */}
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Mot de passe
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={data.password}
                                            onChange={(e) => setData("password", e.target.value)}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                                    </div>

                                    {/* Password Confirmation Input */}
                                    <div>
                                        <label
                                            htmlFor="password_confirmation"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Confirmer le mot de passe
                                        </label>
                                        <input
                                            type="password"
                                            name="password_confirmation"
                                            id="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData("password_confirmation", e.target.value)}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                        {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation}</p>}
                                    </div>

                                    {/* Phone Input */}
                                    <div>
                                        <label
                                            htmlFor="tel"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Téléphone
                                        </label>
                                        <input
                                            type="text"
                                            name="tel"
                                            id="tel"
                                            value={data.tel}
                                            onChange={(e) => setData("tel", e.target.value)}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                        {errors.tel && <p className="text-red-500 text-sm">{errors.tel}</p>}
                                    </div>

                                    {/* Address Input */}
                                    <div>
                                        <label
                                            htmlFor="adresse"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Adresse
                                        </label>
                                        <input
                                            type="text"
                                            name="adresse"
                                            id="adresse"
                                            value={data.adresse}
                                            onChange={(e) => setData("adresse", e.target.value)}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                        {errors.adresse && <p className="text-red-500 text-sm">{errors.adresse}</p>}
                                    </div>

                                    {/* Website Input */}
                                    <div>
                                        <label
                                            htmlFor="siteweb"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Site Web
                                        </label>
                                        <input
                                            type="text"
                                            name="siteweb"
                                            id="siteweb"
                                            value={data.siteweb}
                                            onChange={(e) => setData("siteweb", e.target.value)}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                        {errors.siteweb && <p className="text-red-500 text-sm">{errors.siteweb}</p>}
                                    </div>

                                    {/* Role Selection */}
                                    <div>
                                        <label
                                            htmlFor="role"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Rôle
                                        </label>
                                        <select
                                            name="role"
                                            id="role"
                                            value={data.role}
                                            onChange={(e) => setData("role", e.target.value)}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="user">Utilisateur</option>
                                            <option value="admin">Administrateur</option>
                                        </select>
                                        {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
                                    >
                                        {processing ? "Enregistrement..." : "Ajouter Utilisateur"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Add;
