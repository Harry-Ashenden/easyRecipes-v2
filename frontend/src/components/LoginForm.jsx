import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
        const { email, password } = formData;

        try {
            await loginUser(email, password);
            toast.success("Login successful!");
            navigate("/profile");
        } catch (error) {
            toast.error(error.message || "Invalid login credentials.", {position: "top-center"});
        } finally {
            setLoading(false);
        }
    };

    // Handle Biometric Login (Placeholder)
    const handleBiometricLogin = () => {
        toast.info("Biometric login coming soon!", {position: "top-center"});
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
                        <Link to="/forgot-password" className="label-text link link-accent">
                        Forgot password?
                        </Link>
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
