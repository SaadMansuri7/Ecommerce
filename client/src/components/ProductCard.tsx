import { useNavigate } from "react-router";
import type { Product } from "../pages/ProductPage";

export const ProductCard = ({ product }: { product: Product }) => {
    let navigate = useNavigate();
    return (
        <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition p-4 flex flex-col gap-3">

            <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg">
                <img
                    src={product?.thumbnail}
                    alt={product?.title}
                    className="h-full object-contain" />
            </div>

            <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-gray-800 line-clamp-1"> {product?.title}  </h3>
                <p className="text-sm text-gray-500 line-clamp-2"> {product?.description} </p>
            </div>

            <div className="flex items-center justify-between mt-auto">
                <span className="text-lg font-bold text-blue-600"> ₹{product?.price} </span>
                <button onClick={() => navigate(`/product/${product?.id}`, { state: { product } })} className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"> View </button>
            </div>
        </div>
    );
};
