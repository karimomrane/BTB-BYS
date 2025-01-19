import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";
import InputError from "@/Components/InputError";

const Create = ({ articles, paniers }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        panier_id: "",
        articles: [],
    });

    const handleArticleChange = (articleId, checked) => {
        if (checked) {
            // Add the article to the selected articles with default values
            setData("articles", [
                ...data.articles,
                { id: articleId, ready: false, extra: false, quantity: 1 },
            ]);
        } else {
            // Remove the article from the selected articles
            setData(
                "articles",
                data.articles.filter((article) => article.id !== articleId)
            );
        }
    };

    const handleQuantityChange = (articleId, quantity) => {
        const updatedArticles = data.articles.map((article) =>
            article.id === articleId ? { ...article, quantity: parseInt(quantity, 10) } : article
        );
        setData("articles", updatedArticles);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Use FormData to handle file uploads
        const formData = new FormData();
        formData.append("panier_id", data.panier_id);
        data.articles.forEach((article, index) => {
            formData.append(`articles[${index}][id]`, article.id);
            formData.append(`articles[${index}][ready]`, article.ready);
            formData.append(`articles[${index}][extra]`, article.extra);
            formData.append(`articles[${index}][quantity]`, article.quantity);
        });

        // Log FormData for debugging
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        post(route("article_paniers.store"), formData, {
            onSuccess: () => {
                toast.success("Articles ajoutés au panier avec succès!");
                reset();
            },
            onError: (errors) => {
                console.error("Validation Errors:", errors); // Log validation errors
                toast.error("Une erreur s'est produite lors de la validation.");
            },
        });
    };

    // Log form data for debugging
    useEffect(() => {
        console.log("Form Data:", data);
    }, [data]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Ajouter des articles au panier
                </h2>
            }
        >
            <Head title="Ajouter des articles au panier" />
            <Toaster />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Panier
                                    </label>
                                    <select
                                        value={data.panier_id}
                                        onChange={(e) =>
                                            setData("panier_id", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                    >
                                        <option value="">Sélectionner un panier</option>
                                        {paniers.map((panier) => (
                                            <option key={panier.id} value={panier.id}>
                                                {panier.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.panier_id} className="mt-2" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Articles
                                    </label>
                                    <div className="mt-1 space-y-2">
                                        {articles.map((article) => (
                                            <div
                                                key={article.id}
                                                className="flex items-center justify-between p-2 border rounded-lg dark:border-gray-600"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={data.articles.some(
                                                            (a) => a.id === article.id
                                                        )}
                                                        onChange={(e) =>
                                                            handleArticleChange(
                                                                article.id,
                                                                e.target.checked
                                                            )
                                                        }
                                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                                        {article.name}
                                                    </span>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={
                                                            data.articles.find((a) => a.id === article.id)?.quantity || 1
                                                        }
                                                        onChange={(e) =>
                                                            handleQuantityChange(article.id, e.target.value)
                                                        }
                                                        className="w-16 rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                                    />
                                                </div>
                                                {data.articles.some((a) => a.id === article.id) && (
                                                    <div className="flex items-center space-x-4">
                                                        <label className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    data.articles.find(
                                                                        (a) => a.id === article.id
                                                                    )?.ready || false
                                                                }
                                                                onChange={(e) => {
                                                                    const updatedArticles = data.articles.map(
                                                                        (a) =>
                                                                            a.id === article.id
                                                                                ? {
                                                                                    ...a,
                                                                                    ready: e.target.checked,
                                                                                }
                                                                                : a
                                                                    );
                                                                    setData("articles", updatedArticles);
                                                                }}
                                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                                                            />
                                                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                                                Prêt
                                                            </span>
                                                        </label>
                                                        <label className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    data.articles.find(
                                                                        (a) => a.id === article.id
                                                                    )?.extra || false
                                                                }
                                                                onChange={(e) => {
                                                                    const updatedArticles = data.articles.map(
                                                                        (a) =>
                                                                            a.id === article.id
                                                                                ? {
                                                                                    ...a,
                                                                                    extra: e.target.checked,
                                                                                }
                                                                                : a
                                                                    );
                                                                    setData("articles", updatedArticles);
                                                                }}
                                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                                                            />
                                                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                                                Extra
                                                            </span>
                                                        </label>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <InputError message={errors.articles} className="mt-2" />
                                </div>

                                <div className="flex justify-end">
                                    <Link
                                        href={route("paniers.index")}
                                        className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                                    >
                                        Annuler
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                    >
                                        {processing ? "Enregistrement..." : "Enregistrer"}
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

export default Create;
