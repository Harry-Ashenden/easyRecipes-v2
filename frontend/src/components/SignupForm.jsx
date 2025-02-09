import React, { useState } from "react";
import { signUpUser } from "../hooks/useAuth";
import { toast } from "react-toastify";

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
            await signUpUser(formData.email, formData.password, formData.username);
            toast.success("Signup successful! Check your email to confirm.");
        } catch (error) {
            toast.error(error.message || "Signup failed. Try again.");
            console.error("Signup Error:", error);
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
                        minLength="3"
                        placeholder="Username"
                    />
                    <p className="validator-hint hidden">Must be 3 to 30 characters</p>
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
                    <div className="validator-hint hidden">Enter valid email address</div>
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
                        minLength="8" 
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    />
                    <p className="validator-hint hidden">
                        Must be more than 8 characters, including
                        <br/>At least one number
                        <br/>At least one lowercase letter
                        <br/>At least one uppercase letter
                    </p>
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
