import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Toaster, toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import InputError from "@/Components/InputError";

const Create = ({ articles, paniers }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        panier_id: "",
        articles: [],
    });

    const [searchQuery, setSearchQuery] = useState("");

    // Filter articles based on search query
    const filteredArticles = articles.filter((article) =>
        article.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Determine the selected panier and its associated article IDs (if any)
    const selectedPanier = paniers.find((panier) => String(panier.id) === data.panier_id);

    const associatedArticleIds = selectedPanier?.articles
        ? selectedPanier.articles.map((article) => article.id)
        : [];

    console.log(associatedArticleIds);


    const handleArticleChange = (articleId, checked) => {
        if (checked) {
            // Add the article only if it's not already associated with the selected panier.
            if (associatedArticleIds.includes(articleId)) {
                // Optionally, you can show a toast or message here.
                toast.error("Cet article est déjà associé à ce panier.");
                return;
            }
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

        const formData = new FormData();
        formData.append("panier_id", data.panier_id);
        data.articles.forEach((article, index) => {
            formData.append(`articles[${index}][id]`, article.id);
            formData.append(`articles[${index}][ready]`, article.ready);
            formData.append(`articles[${index}][extra]`, article.extra);
            formData.append(`articles[${index}][quantity]`, article.quantity);
        });

        post(route("article_paniers.store"), formData, {
            onSuccess: () => {
                toast.success("Articles ajoutés au panier avec succès!");
                reset();
            },
            onError: (errors) => {
                console.error("Validation Errors:", errors);
                toast.error("Une erreur s'est produite lors de la validation.");
            },
        });
    };

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
                                        onChange={(e) => {
                                            setData("panier_id", e.target.value);
                                            // Optionally, clear selected articles when changing the panier
                                            setData("articles", []);
                                        }}
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
                                        Rechercher des articles
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Rechercher un article..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                    />
                                </div>

                                <div className="h-[400px] overflow-y-auto">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Articles
                                    </label>
                                    <div className="mt-1 space-y-2">
                                        {filteredArticles.map((article) => {
                                            const isChecked = data.articles.some((a) => a.id === article.id);
                                            // Determine if the article should be disabled because it's already associated.
                                            const isDisabled = associatedArticleIds.includes(article.id);

                                            return (
                                                <div
                                                    key={article.id}
                                                    className="flex items-center justify-between p-2 border rounded-lg dark:border-gray-600"
                                                >
                                                    {/* Wrap checkbox and text inside a label */}
                                                    <label
                                                        className={`flex items-center space-x-4 cursor-pointer ${isDisabled && "opacity-50 cursor-not-allowed"
                                                            }`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={isChecked}
                                                            disabled={isDisabled}
                                                            onChange={(e) =>
                                                                handleArticleChange(article.id, e.target.checked)
                                                            }
                                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                                            {article.name}
                                                        </span>
                                                    </label>

                                                    {/* Show number input only if checkbox is checked */}
                                                    {isChecked && (
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={
                                                                data.articles.find((a) => a.id === article.id)
                                                                    ?.quantity || 1
                                                            }
                                                            onChange={(e) =>
                                                                handleQuantityChange(
                                                                    article.id,
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-16 rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 text-right"
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
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
