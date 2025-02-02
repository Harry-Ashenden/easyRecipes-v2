import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const LandingPage = () => {
    const [activeTab, setActiveTab] = useState("Login");

    return (
        <div className="flex flex-col md:flex-row h-screen bg-base-200">
            {/* Left Side: Branding */}
            <div className="flex-1 flex flex-col justify-center items-center text-center p-6">
                <h1 className="text-5xl font-bold text-primary">EasyRecipes</h1>
                <p className="mt-4 text-lg text-neutral-content">
                    Discover, save, and organize your favourite recipes easily.
                </p>
            </div>

            <div className="divider lg:divider-horizontal"></div>

            {/* Right Side: Login/Signup Tabs */}
            <div className="flex-1 flex flex-col justify-center items-center p-6">
                <div role="tablist" className="tabs tabs-box">
                    <input
                        type="radio"
                        name="authTabs"
                        role="tab"
                        className="tab"
                        aria-label="Login"
                        checked={activeTab === "Login"}
                        onChange={() => setActiveTab("Login")}
                    /><input
                        type="radio"
                        name="authTabs"
                        role="tab"
                        className="tab"
                        aria-label="Signup"
                        checked={activeTab === "Signup"}
                        onChange={() => setActiveTab("Signup")}
                    />

                </div>

                {/* Render the selected component */}
                <div className="w-full max-w-md mt-6">
                    {activeTab === "Login" ? <LoginForm /> : <SignupForm />}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
