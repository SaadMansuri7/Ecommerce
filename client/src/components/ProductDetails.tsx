import type { Product } from "../pages/ProductPage";
import { useLocation } from "react-router";
import { addToCart } from "../services/cartServices.js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Heart, Star } from "lucide-react";
import { addToWishlist, getWishlistProducts } from "../services/wishlistService.js";
import { ProductDetailsShimmer } from "./ProductDetailsShimmer.js";

export const ProductDetails = () => {
    const { state } = useLocation();
    const { token } = useContext(AuthContext);
    const product = state?.product as Product;
    const [activeImage, setActiveImage] = useState(product?.images?.[0]);
    const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!product) {
        return <p className="p-6">Product data not available.</p>;
    }

    async function fetChWishlistProducts() {
        setLoading(true);
        let res = await getWishlistProducts();
        console.log('Wishlist products :', res.data.wishlist.items);
        setWishlistProducts(res.data.wishlist.items);
        setLoading(false);
    }

    async function handleAddToCart() {
        await addToCart(product, token);
    }

    async function handleAddToWishlist(product: Product) {
        await addToWishlist(product);
        await fetChWishlistProducts();
    }

    useEffect(() => {
        if (!product) return;
        const exists = wishlistProducts.some(item => item?.id === product.id);
        console.log('Is in wishlist:', exists);
        setIsInWishlist(exists);
    }, [wishlistProducts, product]);

    const discountedPrice = (product.price - (product.price * product.discountPercentage) / 100).toFixed(2);

    return (
        loading ? <ProductDetailsShimmer /> : <div className="max-w-full mx-auto px-6 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                <div className="flex gap-4">
                    <div className="flex flex-col gap-3">
                        {product.images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                onClick={() => setActiveImage(img)}
                                className={`h-16 w-16 rounded-lg object-contain cursor-pointer border 
                                ${activeImage === img ? "border-gray-900" : "border-gray-200"}`}
                            />
                        ))}
                    </div>

                    <div className="flex-1 bg-gray-50 rounded-2xl p-6 flex items-center justify-center">
                        <img
                            src={activeImage}
                            alt={product.title}
                            className="max-h-105 object-contain" />
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <h1 className="text-2xl text-left font-semibold text-gray-900"> {product.title} </h1>
                    <p className="font-medium justify-start items-start text-left text-sm text-gray-600">Brand:{product.brand}</p>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < Math.round(product.rating) ? "currentColor" : "none"} />
                            ))}
                        </div>
                        <span>{product.rating}</span>
                        <span className="text-gray-600">•</span>
                        <span>{product.reviews.length} Reviews</span>
                    </div>

                    <div className="flex flex-col items-start">
                        <span className="text-3xl font-bold text-gray-900"> ₹{discountedPrice} </span>
                        <div className="flex flex-row items-start space-x-4">
                            <span className="line-through text-gray-400"> ₹{product.price} </span>
                            <span className="text-green-600 font-medium"> {product.discountPercentage}% off </span>
                        </div>
                    </div>

                    <div className="text-sm text-left space-y-1">
                        <p className="text-green-700 text-lg font-medium"> {product.availabilityStatus} </p>
                        <p className="text-gray-500"> {product.shippingInformation} </p>
                    </div>

                    <div className="flex gap-4 mt-6">
                        <button
                            className="flex-1 rounded-xl bg-gray-900 py-3 text-sm font-medium text-white hover:bg-gray-800 transition"
                            onClick={handleAddToCart} >
                            Add to Bag
                        </button>

                        <div onClick={() => handleAddToWishlist(product)}
                            className="flex-1 flex items-center justify-center gap-2 cursor-pointer rounded-xl border border-gray-300 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 transition">
                            <Heart size={16} className={`transition-all duration-300 ease-in-out hover:fill-red-600 hover:text-red-600 ${isInWishlist ? 'fill-red-600 text-red-600' : ''}`} />
                            <span>Add to Wishlist</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-14 border-t pt-8">
                <h2 className="text-lg text-left font-semibold text-gray-900 mb-3"> Product Description </h2>
                <p className="text-left text-gray-600 text-sm leading-relaxed"> {product.description} </p>
                <div className="mt-6 grid grid-cols-2 text-left gap-4 text-sm text-gray-600">
                    <p><span className="font-medium">Category:</span> {product.category}</p>
                    <p><span className="font-medium">Warranty:</span> {product.warrantyInformation}</p>
                    <p><span className="font-medium">Return Policy:</span> {product.returnPolicy}</p>
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Dimensions:</span>{" "}
                        {product.dimensions ? `${product.dimensions.height}cm (H) * ${product.dimensions.width}cm (W) * ${product.dimensions.depth}cm (D)` : "N/A"}
                    </p>
                </div>
            </div>
        </div>
    );
};
