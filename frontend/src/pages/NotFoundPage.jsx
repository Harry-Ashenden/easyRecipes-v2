import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {

    return (
        <div className="flex flex-col gap-6 rounded-box bg-base-200 p-6 max-w-md text-center mx-auto mt-10">
            <h1 className="text-2xl font-bold">Uh oh 404</h1>
            <span className="text-xl">Page not found</span>

                <button className="btn btn-primary">
                    <Link to="/">Go Home</Link>
                </button>
        </div>
    );
};

export default NotFoundPage;
