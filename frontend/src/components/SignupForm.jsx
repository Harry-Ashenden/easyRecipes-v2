import React, { useState } from "react";
import { toast } from "react-toastify";
import supabase from "../utils/supabaseClient";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Sign up user with Supabase
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: { data: { username: formData.username } },
            });

            if (error) {
                throw error;
            }

            toast.success("Signup successful! Check your email to confirm.");
            console.log("User Data:", data);
        } catch (error) {
            toast.error(error.message || "Signup failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 rounded-box bg-base-200 p-6 max-w-md mx-auto mt-10">
            <h1 className="text-3xl font-bold self-center">Signup</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Username Input */}
                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Username</span>
                    </div>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="input validator"
                        required
                        placeholder="Username"
                    />
                    <p className="validator-hint">Must be 3 to 30 characters</p>
                </label>

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
                </label>

                {/* Password Input */}
                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input validator"
                        required
                        placeholder="Password"
                    />
                </label>

                {/* Signup Button */}
                <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? "Creating account..." : "Create"}
                </button>
            </form>
        </div>
    );
};

export default SignupForm;
