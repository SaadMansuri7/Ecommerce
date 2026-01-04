import { useContext, useState } from "react";
import { login } from "../services/authServices";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from 'react-hot-toast'

export const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { loginContext } = useContext(AuthContext);

    function handleChange(e: any) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleLogin = async (e: any) => {
        try {
            e.preventDefault();
            const res = await login(formData);
            loginContext(res.data.token);
            toast.success("Logged in successfully");
            navigate("/productPage");
        } catch (error: any) {
            toast.error("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

            <div className="hidden text-left lg:flex items-start flex-col justify-center bg-gray-50 px-10">
                <h2 className="mt-6 text-xl font-semibold text-gray-900">
                    Welcome back!
                </h2>
                <p className="mt-2 text-sm text-gray-600 text-center max-w-sm">
                    Log in to manage your cart, wishlist, and orders seamlessly.
                </p>
                <img
                    src="src/assets/login.svg"
                    alt="Login Illustration"
                    className="max-w-md"
                />
            </div>

            <div className="flex items-center justify-center px-6">
                <div className="w-full max-w-md">

                    <h1 className="text-2xl font-semibold text-gray-900">
                        Login to your account
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Enter your credentials to continue
                    </p>

                    <form onSubmit={handleLogin} className="mt-6 space-y-4">

                        <div>
                            <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition"
                        >
                            Login
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-center text-gray-600">
                        Don’t have an account?{" "}
                        <Link
                            to="/register"
                            className="font-medium text-gray-900 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
