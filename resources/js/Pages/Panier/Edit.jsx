import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { Toaster, toast } from "react-hot-toast";

const Edit = ({ panier }) => {
    const { data, setData, processing, errors, reset } = useForm({
        name: panier.name,
        description: panier.description,
        price: panier.price,
        image: null, // Initialize image as null
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Use FormData to handle file uploads
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        if (data.image) {
            formData.append("image", data.image); // Only append image if a new one is provided
        }

        // Use POST with _method=PUT for form method spoofing
        formData.append("_method", "put");

        router.post(route("paniers.update", panier.id), formData, {
            onSuccess: () => {
                toast.success("Panier mis à jour avec succès!");
            },
            onError: (errors) => {
                console.error("Errors:", errors); // Log validation errors
                toast.error("Une erreur s'est produite.");
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Modifier le panier
                </h2>
            }
        >
            <Head title="Modifier le panier" />
            <Toaster />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Nom
                                    </label>
                                    <TextInput
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Description
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                                        rows={4}
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Prix
                                    </label>
                                    <TextInput
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => setData("price", e.target.value)}
                                        className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                    />
                                    <InputError message={errors.price} className="mt-2" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Image
                                    </label>
                                    {panier.image && (
                                        <img
                                            src={`/storage/${panier.image}`}
                                            alt={panier.name}
                                            className="w-16 h-16 object-cover rounded mb-2"
                                        />
                                    )}
                                    <input
                                        type="file"
                                        onChange={(e) => setData("image", e.target.files[0])}
                                        className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        accept="image/*"
                                    />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>

                                <div className="flex flex-col sm:flex-row justify-end gap-4">
                                    <Link
                                        href={route("paniers.index")}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-center"
                                    >
                                        Annuler
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-center"
                                    >
                                        {processing ? "Mise à jour..." : "Mettre à jour"}
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

export default Edit;
