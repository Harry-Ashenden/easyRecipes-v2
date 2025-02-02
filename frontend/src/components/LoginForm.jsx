import React, { useState } from "react";
import { toast } from "react-toastify";
import supabase from "../utils/supabaseClient";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { email, password, rememberMe } = formData;

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            toast.success("Login successful!");

            // Store token in localStorage/sessionStorage
            if (rememberMe) {
                localStorage.setItem("supabaseToken", JSON.stringify(data.session.access_token));
            } else {
                sessionStorage.setItem("supabaseToken", JSON.stringify(data.session.access_token));
            }

            // Redirect user (change "/dashboard" to your desired route)
            window.location.href = "/profile";
        } catch (error) {
            toast.error(error.message || "Invalid login credentials.");
        } finally {
            setLoading(false);
        }
    };

    // Handle Biometric Login (Placeholder)
    const handleBiometricLogin = () => {
        toast.info("Biometric login coming soon!");
    };

    return (
        <div className="flex flex-col gap-4 rounded-box bg-base-200 p-6 max-w-md mx-auto mt-10">
            <h1 className="text-3xl font-bold self-center">Log in</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Email Input */}
                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input validator"
                        required
                        placeholder="mail@site.com"
                    />
                    <div className="validator-hint hidden">Enter valid email address</div>
                </label>

                {/* Password Input */}
                <label className="form-control">
                    <div className="label flex justify-between">
                        <span className="label-text">Password</span>
                        <a href="/forgot-password" className="label-text link link-accent">
                            Forgot password?
                        </a>
                    </div>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input input-bordered"
                        required
                    />
                </label>

                {/* Remember Me Checkbox */}
                <div className="form-control">
                    <label className="cursor-pointer label self-start gap-2">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            className="checkbox"
                        />
                        <span className="label-text">Remember me</span>
                    </label>
                </div>

                {/* Log in Button */}
                <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Log in"}
                </button>
            </form>

            {/* Biometric Login Button */}
            <button className="btn btn-primary" onClick={handleBiometricLogin}>
                Biometric login
            </button>
        </div>
    );
};

export default LoginForm;
