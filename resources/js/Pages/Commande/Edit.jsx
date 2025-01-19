import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

const Edit = () => {
    const { commande } = usePage().props;  // Retrieve the passed 'commande' data from Inertia
    const { data, setData, put, errors, processing } = useForm({
        date: commande.date,
        description: commande.description,  // Add description field
        status: commande.status,  // Add status field
    });

    // Handle form submission
    const submit = (e) => {
        e.preventDefault();
        put(route("commandes.update", commande.id), {
            onSuccess: () => {
                // Optionally handle success (e.g., redirect or show a success message)
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Modifier une commande
                </h2>
            }
        >
            <Head title="Modifier une commande" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Date Prévu</label>
                                    <input
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData("date", e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    />
                                    <span className="text-red-500 text-xs">{errors.date}</span>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Description</label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    ></textarea>
                                    <span className="text-red-500 text-xs">{errors.description}</span>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Statut</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData("status", e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                    >
                                        <option value="Commandé">Commandé</option>
                                        <option value="En cours de préparation">En cours de préparation</option>
                                        <option value="Préparé">Préparé</option>
                                        <option value="En cours de livraison">En cours de livraison</option>
                                        <option value="Livré">Livré</option>
                                        <option value="Payé">Payé</option>
                                        <option value="Annulé">Annulé</option>
                                    </select>
                                    <span className="text-red-500 text-xs">{errors.status}</span>
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                                >
                                    Modifier
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
