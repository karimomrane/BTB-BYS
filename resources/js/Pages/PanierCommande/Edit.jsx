import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Toaster } from "react-hot-toast";

const Edit = ({ panierCommande, paniers, commandes }) => {
    const { data, setData, put, processing, errors } = useForm({
        panier_id: panierCommande.panier_id,
        commande_id: panierCommande.commande_id,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("panier_commandes.update", panierCommande.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Modifier une Panier Commande
                </h2>
            }
        >
            <Head title="Modifier une Panier Commande" />
            <Toaster />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Panier
                                    </label>
                                    <select
                                        value={data.panier_id}
                                        onChange={(e) => setData("panier_id", e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    >
                                        <option value="">Sélectionner un panier</option>
                                        {paniers.map((panier) => (
                                            <option key={panier.id} value={panier.id}>
                                                {panier.name}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="text-red-500 text-xs">{errors.panier_id}</span>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                        Commande
                                    </label>
                                    <select
                                        value={data.commande_id}
                                        onChange={(e) => setData("commande_id", e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    >
                                        <option value="">Sélectionner une commande</option>
                                        {commandes.map((commande) => (
                                            <option key={commande.id} value={commande.id}>
                                                {commande.date}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="text-red-500 text-xs">{errors.commande_id}</span>
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                                >
                                    {processing ? "Enregistrement..." : "Enregistrer"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
