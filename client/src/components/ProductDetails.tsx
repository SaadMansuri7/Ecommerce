import type { Product } from "../pages/ProductPage";
import { useLocation, useParams } from "react-router";
import { addToCart } from "../services/cartServices.js";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const ProductDetails = () => {

    const { state } = useLocation();
    const { id } = useParams();
    const { token } = useContext(AuthContext);
    console.log('from details :', id);
    const product = state?.product as Product;

    if (!product) {
        return (
            <p className="p-6">
                Product data not available. Please go back.
            </p>
        );
    }

    async function handleAddToCart() {
        let res = await addToCart(product, token);
        console.log('Add to cart response :', res);
    }

    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
                <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center">
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className="max-h-100 object-contain" />
                </div>

                <div className="flex gap-3">
                    {product.images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt="product"
                            className="h-16 w-16 object-contain bg-gray-50 rounded border cursor-pointer hover:border-blue-500"
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-gray-800"> {product.title} </h1>

                <p className="text-gray-600"> {product.description} </p>

                <div className="flex items-center gap-6">
                    <span className="text-3xl font-bold text-blue-600"> ₹{product.price} </span>
                    <span className="text-sm text-gray-500"> ⭐ {product.rating} / 5 </span>
                </div>

                <div className="flex gap-4 text-sm">
                    <span className="font-medium">Status:</span>
                    <span
                        className={`font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-500"
                            }`} >
                        {product.availabilityStatus}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 border-t pt-4">
                    <div><strong>Brand:</strong> {product.brand}</div>
                    <div><strong>Category:</strong> {product.category}</div>
                    <div><strong>Warranty:</strong> {product.warrantyInformation}</div>
                    <div><strong>Return:</strong> {product.returnPolicy}</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                    {product.shippingInformation}
                </div>

                <div className="flex gap-4 mt-4">
                    <button onClick={handleAddToCart} className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
