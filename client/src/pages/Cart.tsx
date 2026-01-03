import { useContext, useEffect, useState } from "react";
import { Product } from "./ProductPage";
import { AuthContext } from "../context/AuthContext";
import { addToCart, decreaseProductQnt, getCartProducts } from "../services/cartServices";
import { Heart, TrashIcon } from "lucide-react";
import { addToWishlist, getWishlistProducts } from "../services/wishlistService";
import { set } from "mongoose";
import { SearchBar } from "../components/SearchBar";

export const Cart = () => {

    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token } = useContext(AuthContext);
    let shipping = 100;

    async function fetChCartProducts() {
        setLoading(true);
        let res = await getCartProducts(token);
        console.log('Cart products :', res.data.cart.items);
        setCartProducts(res.data.cart.items);
        setLoading(false);
    }

    async function fetChWishlistProducts() {
        setLoading(true);
        let res = await getWishlistProducts();
        console.log('Wishlist products :', res.data.wishlist.items);
        setWishlistProducts(res.data.wishlist.items);
        setLoading(false);
    }

    useEffect(() => {
        fetChCartProducts();
        fetChWishlistProducts();

        () => setLoading(false);
    }, []);

    useEffect(() => {
        setTotal(cartProducts.reduce((acc, item) => item ? (acc + (item.price * item.quantity)) : acc, 0));
        () => setLoading(false);
    }, [cartProducts]);

    async function handleAddToCart(product: Product, token: string) {
        await addToCart(product, token);
        await fetChCartProducts();
    }

    async function decreaseQnt(productId: number) {
        await decreaseProductQnt(productId, token);
        await fetChCartProducts();
    }

    async function handleAddToWishlist(product: Product) {
        console.log('Adding to wishlist:', product);
        await addToWishlist(product);
        await fetChWishlistProducts();
        const isInWishlistNow = wishlistProducts.some(item => item?.id === product?.id);
        setIsInWishlist(isInWishlistNow);
    }

    return (
        <div className="p-4 items-start justify-start min-h-[80vh]">
            <SearchBar />
            <div className="mx-auto max-w-7xl">

                <h2 className="mb-6 text-2xl font-semibold text-gray-800 flex items-start justify-start"> Shopping Cart </h2>

                {cartProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl bg-white p-10 shadow-sm">
                        <p className="text-lg font-medium text-gray-700">
                            Your cart is empty
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                            Looks like you haven't added anything yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                        <div className="lg:col-span-2 space-y-4">
                            {cartProducts.map((item: Product) => {
                                if (!item) return null;
                                return (
                                    <div key={item.id} className="w-full border-b border-gray-200 py-6">
                                        <div className="grid grid-cols-[100px_1fr_120px_120px_120px] gap-6 items-start justify-start">

                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="h-24 w-24 rounded-md bg-gray-100 object-contain" />

                                            <div className="space-y-1 text-left">
                                                <h3 className="text-sm font-medium text-gray-800">
                                                    {item.title}
                                                </h3>

                                                <p className="text-xs text-gray-500">
                                                    Brand: {item.brand}
                                                </p>

                                                <p className="text-xs text-green-600">
                                                    {item.availabilityStatus}
                                                </p>

                                                <p className="text-xs text-gray-500">
                                                    {item.shippingInformation}
                                                </p>

                                                <div className="mt-2 flex space-x-12 text-gray-500">
                                                    <TrashIcon size={16} className="hover:fill-red-600 hover:text-red-600 transition-all duration-300 ease-in-out" />
                                                    <Heart onClick={() => handleAddToWishlist(item)} size={16} className={`hover:fill-red-600 hover:text-red-600 transition-all duration-300 ease-in-out ${isInWishlist ? 'fill-red-600 text-red-600' : ''}`} />
                                                </div>
                                            </div>

                                            <div className="flex flex-col text-sm font-medium text-gray-800">
                                                <span> Each </span>
                                                <span> ₹{item.price} </span>
                                            </div>

                                            <div className="flex flex-col gap-1 text-sm font-medium text-gray-800">
                                                <span>Quantity</span>

                                                <div className="flex items-center overflow-hidden rounded-md border border-gray-200">
                                                    <button onClick={() => decreaseQnt(item.id)} className="h-8 w-8 overflow-hidden flex items-center justify-center text-gray-600 hover:bg-gray-100 transition">
                                                        -
                                                    </button>

                                                    <span className="w-14 text-center text-sm">
                                                        {item.quantity}
                                                    </span>

                                                    <button onClick={() => handleAddToCart(item, token)} className="h-8 w-8 flex overflow-hidden items-center justify-center text-gray-600 hover:bg-gray-100 transition">
                                                        +
                                                    </button>
                                                </div>
                                            </div>


                                            <div className="flex flex-col text-sm font-semibold text-gray-900">
                                                <span> Total </span>
                                                <span> ₹{(item.price * item.quantity).toFixed(2)} </span>
                                            </div>

                                        </div>
                                    </div>

                                );
                            })}
                        </div>

                        <div className="h-fit rounded-xl bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-gray-800">
                                Order Summary
                            </h2>

                            <div className="space-y-3 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{total}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>₹{shipping}</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between font-medium text-gray-800">
                                    <span>Total</span>
                                    <span>₹{(total + shipping).toFixed(2)}</span>
                                </div>
                            </div>

                            <button className="mt-6 w-full rounded-lg bg-gray-900 py-3 text-sm font-medium text-white hover:bg-gray-800 transition">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}