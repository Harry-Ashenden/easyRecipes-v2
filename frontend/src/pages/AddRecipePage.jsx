// import { useState } from "react";
// import AddRecipeForm from "../components/AddRecipeForm";
// import AddUrlRecipeForm from "../components/AddRecipeForm";

// const AddRecipePage = () => {
//     const [activeTab, setActiveTab] = useState("Login");

//     return (
//         <div>
//             <AddRecipeForm />
//         </div>
//     );
// };

// export default AddRecipePage;

import React, { useState } from "react";
import AddRecipeForm from "../components/AddRecipeForm";
import ImportFromUrlForm from "../components/ImportFromUrlForm";

const AddRecipePage = () => {
  const [activeTab, setActiveTab] = useState("manual"); // 'manual' or 'url'

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Add a New Recipe</h1>

      {/* Toggle Tabs */}
      <div role="tablist" className="tabs tabs-boxed justify-center mb-6">
        <button
          role="tab"
          className={`tab ${activeTab === "manual" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("manual")}
        >
          Manual Entry
        </button>
        <button
          role="tab"
          className={`tab ${activeTab === "url" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("url")}
        >
          Import from URL
        </button>
      </div>

      {/* Short Descriptions */}
      <div className="text-center mb-6 text-sm text-gray-600">
        {activeTab === "manual"
          ? "Manually fill in your recipe details for full control."
          : "Paste a recipe URL and we’ll try to import it for you."}
      </div>

      {/* Conditional Form Rendering */}
      {activeTab === "manual" ? (
        <AddRecipeForm />
      ) : (
        <ImportFromUrlForm />
      )}
    </div>
  );
};

export default AddRecipePage;
