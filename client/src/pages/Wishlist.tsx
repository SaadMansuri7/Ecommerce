import { useContext, useEffect, useState } from "react";
import type { Product } from "./ProductPage";
import { AuthContext } from "../context/AuthContext";
import { getWishlistProducts, removeFromWishlist } from "../services/wishlistService";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { WishlistShimmer } from "../components/WishlistShimmer";
import { SearchBar } from "../components/SearchBar";

export const Wishlist = () => {
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    async function fetchWishlist() {
        setLoading(true);
        const res = await getWishlistProducts();
        setWishlist(res.data.wishlist.items);
        setLoading(false);
    }

    async function handleRemoveWishlist(productId: number) {
        await removeFromWishlist(productId);
        await fetchWishlist();
    }

    useEffect(() => {
        fetchWishlist();
    }, []);

    return (
        <div className="w-7xl mx-auto px-6 py-10">
            <SearchBar />
            <h2 className="mb-6 text-2xl font-semibold text-gray-800 flex items-start justify-start"> Wishlist </h2>
            {!loading && wishlist.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl">
                    <p className="text-lg font-medium text-gray-700">
                        Wishlist is empty,
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                        Looks like you haven't added anything yet.
                    </p>
                </div>
            )}

            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <WishlistShimmer key={i} />
                    ))}
                </div>
            )}

            {!loading && wishlist.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlist.map((product) => {
                        if (!product) return null;
                        const   discountedPrice = (product.price - (product.price * product.discountPercentage) / 100).toFixed(2);
                        return (
                            <div key={product.id}
                                className="group rounded-xl border border-gray-200 bg-white p-4 hover:shadow-md transition">
                                <div className="relative bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="h-40 object-contain" />
                                </div>

                                <div className="mt-4 space-y-1">
                                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2"> {product.title} </h3>
                                    <p className="text-xs text-gray-500"> Brand: {product.brand} </p>
                                </div>

                                <div className="mt-2 flex items-center gap-2">
                                    <span className="font-semibold text-gray-900"> ₹{discountedPrice} </span>
                                    <span className="text-xs line-through text-gray-400"> ₹{product.price} </span>
                                </div>

                                <p className={`mt-1 text-xs font-medium ${product.availabilityStatus === "In Stock"
                                    ? "text-green-600"
                                    : "text-red-500"
                                    }`}>
                                    {product.availabilityStatus}
                                </p>

                                <div className="mt-4 flex gap-2">
                                    <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gray-900 py-2 text-xs font-medium text-white hover:bg-gray-800 transition">
                                        <ShoppingBag size={14} />
                                        Add to Bag
                                    </button>

                                    <button onClick={() => handleRemoveWishlist(product.id)} className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50 transition">
                                        <Trash2 size={14} className="text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
