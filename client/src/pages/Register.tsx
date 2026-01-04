import { useState } from "react";
import { register } from "../services/authServices";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast'

export const Register = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    function handleChange(e: any) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleRegister = async (e: any) => {
        try {
            e.preventDefault();
            await register(formData);
            toast.success("Account created successfully ");
            navigate("/productPage");
        } catch (error: any) {
            if (error.response?.status === 409) {
                toast.error("User already registered");
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    return (
        <div className="min-h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-2">

            <div className="hidden lg:flex flex-col items-start justify-center bg-gray-50 px-10">
                <h2 className="mt-6 text-xl font-semibold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-sm text-left text-gray-600 max-w-sm mb-2.5">
                    Join us to save products, manage your cart, and enjoy a smooth shopping experience.
                </p>
                <img
                    src="src/assets/signup.svg"
                    alt="Register Illustration"
                    className="max-w-md" />
            </div>

            <div className="flex items-center justify-center px-6">
                <div className="w-full max-w-md">

                    <h1 className="text-2xl font-semibold text-gray-900"> Sign up </h1>
                    <p className="mt-1 text-sm text-gray-500"> Create an account to get started </p>

                    <form onSubmit={handleRegister} className="mt-6 space-y-4">
                        <div>
                            <label className="block text-left text-sm font-medium text-gray-700 mb-1"> Email </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                onChange={handleChange}
                                required
                                className="w-full text-left rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1"> Password </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Create a strong password"
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none" />
                        </div>

                        <button type="submit"
                            className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition">
                            Create Account
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-gray-900 hover:underline" >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
