import React from "react";

const CardSkeleton = () => {

    return (
        <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-36 m-auto"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>
    );
};

export default CardSkeleton;