import React, { useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../services/auth";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "password") setPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
    };

    // Handle password reset submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({ password });

            if (error) {
                throw error;
            }

            toast.success("Password reset successful! You can now log in.");
            navigate("/");
        } catch (error) {
            toast.error(error.message || "Failed to reset password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 rounded-box bg-base-200 p-6 max-w-md text-center mx-auto mt-10">
            <h1 className="text-2xl font-bold">Reset Password</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* New Password Input */}
                <label className="form-control">
                    <div className="label">
                        <span className="label-text">New Password</span>
                    </div>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        className="input validator"
                        required
                        placeholder="Enter new password"
                        minLength="8" 
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                        // title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                    />
                </label>

                {/* Confirm Password Input */}
                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Confirm Password</span>
                    </div>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        className="input validator"
                        required
                        placeholder="Confirm new password"
                    />
                </label>

                {/* Submit Button */}
                <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;
