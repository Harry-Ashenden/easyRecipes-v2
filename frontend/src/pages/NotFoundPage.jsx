import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-6 rounded-box bg-base-200 p-6 max-w-md text-center mx-auto mt-10">
            <h1 className="text-2xl font-bold">Uh oh 404</h1>
            <span className="text-xl">Page not found</span>

            <div className="flex justify-center gap-4">
                {/* Go Back Button */}
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    Go Back
                </button>

                {/* Go to Profile Button */}
                <Link to="/profile" className="btn btn-primary">
                    Go to Profile
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
