import { useContext, useEffect, useState } from "react";
import type { Product } from "../pages/ProductPage";
import { Search, UserRoundPenIcon, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { Modal } from "./Modal";
import { Link } from "react-router-dom";

export const SearchBar = () => {
    const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showPreview, setShowPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);

    const { logout } = useContext(AuthContext);

    useEffect(() => {
        if (!searchTerm.trim()) return;

        const timer = setTimeout(() => {
            handleSearch(searchTerm.toLowerCase());
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    async function handleSearch(value: string) {
        if (!value.trim()) {
            setFetchedProducts([]);
            setShowPreview(false);
            setLoading(false);
            return;
        }

        setLoading(true);
        const response = await fetch(
            `https://dummyjson.com/products/search?q=${value}`
        );
        const data = await response.json();

        setFetchedProducts(data.products);
        setLoading(false);
        setShowPreview(true);
    }

    function handleCross() {
        setFetchedProducts([]);
        setShowPreview(false);
        setLoading(false);
        setSearchTerm("");
    }

    return (
        <div className="relative flex items-center justify-between px-4 py-3">

            <nav className="flex flex-row space-x-8 items-center">
                <Link className="text-gray-600 hover:text-gray-900 transition" to="/productPage"> Home </Link>
                <Link className="text-gray-600 hover:text-gray-900 transition" to="/wishlist"> Wishlist </Link>
                <Link className="text-gray-600 hover:text-gray-900 transition" to="/cart"> Cart </Link>
            </nav>

            <div className="flex items-center gap-4">

                <div className="relative w-90">
                    <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
                        <Search className="h-5 w-5 text-gray-400" />

                        <input
                            type="text"
                            value={searchTerm}
                            placeholder="Search products..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => fetchedProducts.length && setShowPreview(true)}
                            onBlur={() => setShowPreview(false)}
                            className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none" />

                        {searchTerm && (
                            <X onClick={handleCross} className="h-4 w-4 cursor-pointer text-gray-400 hover:text-gray-600" />
                        )}
                    </div>

                    {showPreview && (
                        <div className="absolute mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg z-50">
                            {loading && (
                                <p className="px-4 py-3 text-sm text-gray-500">
                                    Searching...
                                </p>
                            )}

                            {!loading && fetchedProducts.length === 0 && (
                                <p className="px-4 py-3 text-sm text-gray-500">
                                    No results found
                                </p>
                            )}

                            {fetchedProducts.map((product) => (
                                <div
                                    key={product?.id}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
                                >
                                    <img
                                        src={product?.thumbnail}
                                        alt={product?.title}
                                        className="h-10 w-10 rounded-md bg-gray-50 object-contain"
                                    />

                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-800 line-clamp-1">
                                            {product?.title}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            ₹{product?.price}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div
                    onClick={() => setModal(true)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 transition">
                    <UserRoundPenIcon className="h-5 w-5 text-gray-600" />
                </div>
            </div>

            {modal && (
                <Modal isOpen={modal} onClose={() => setModal(false)}>
                    <div className="p-5">
                        <h2 className="text-lg font-semibold mb-3"> Are you sure you want to logout?</h2>

                        <div className="flex justify-end gap-3">
                            <button onClick={() => setModal(false)} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300" >
                                Cancel
                            </button>

                            <button onClick={logout} className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600">
                                Logout
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};
