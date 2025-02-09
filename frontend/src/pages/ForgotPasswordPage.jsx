import React, { useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../services/auth";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    // Handle password reset request
    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) {
                throw error;
            }

            toast.success("Password reset email sent! Check your inbox.");
        } catch (error) {
            toast.error(error.message || "Failed to send reset email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 rounded-box bg-base-200 p-6 max-w-md text-center mx-auto mt-10">
            <h1 className="text-2xl font-bold">Forgot password?</h1>

            <span>
                Remember your password?
                <Link to="/" className="link link-secondary">
                    Log in here
                </Link>
            </span>

            <form onSubmit={handlePasswordReset} className="flex flex-col gap-4">
                {/* Email Input */}
                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={handleChange}
                        className="input input-bordered"
                        required
                        placeholder="mail@site.com"
                    />
                </label>

                {/* Submit Button */}
                <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? "Sending email..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
