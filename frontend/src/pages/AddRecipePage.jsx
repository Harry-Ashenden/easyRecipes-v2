import { useState } from "react";
import AddRecipeForm from "../components/AddRecipeForm";
import AddUrlRecipeForm from "../components/AddRecipeForm";

const AddRecipePage = () => {
    const [activeTab, setActiveTab] = useState("Login");

    return (
        <div>
            <AddRecipeForm />
        </div>
    );
};

export default AddRecipePage;
