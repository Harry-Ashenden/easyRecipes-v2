import React, { useState } from "react";
import axios from "axios";
import { createRecipe } from "../services/api";
import TagSelector from "../components/TagSelector";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [servings, setServings] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [method, setMethod] = useState("");
  const [sourceLink, setSourceLink] = useState("");
  const [image, setImage] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const DEFAULT_IMAGE_URL = "https://res.cloudinary.com/harry-cloud-unique/image/upload/v1749131360/easyRecipes/remy-making-omlette_pubwmw.jpg";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("servings", servings);
      formData.append("prepTime", prepTime);
      formData.append("cookTime", cookTime);
      formData.append("totalTime", totalTime);
      formData.append("ingredients", ingredients.trim());
      formData.append("method", method.trim());
      formData.append("sourceLink", sourceLink);
      formData.append("tags", selectedTags.join("\n"));
      
      if (image) {
        formData.append("file", image); // file upload
      } else {
       formData.append("defaultImage", DEFAULT_IMAGE_URL); // default image URL
      }

      const recipe = await createRecipe(formData);

      console.log("Recipe uploaded successfully:", recipe);


    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Add a New Recipe</h1>
      <form onSubmit={handleSubmit} className="shadow-md rounded p-6 space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium text-lg mb-1">Recipe Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Servings & Times */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Servings</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              min={1}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Prep Time (mins)</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              min={0}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Cook Time (mins)</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              min={0}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Total Time (mins)</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={totalTime}
              onChange={(e) => setTotalTime(e.target.value)}
              min={0}
              required
            />
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <label className="block font-medium mb-1">Ingredients (one per line)</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={5}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g. 2 cups flour"
            required
          />
        </div>

        {/* Method */}
        <div>
          <label className="block font-medium mb-1">Method (one step per line)</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={7}
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            placeholder="e.g. Preheat oven to 180C"
            required
          />
        </div>

        {/* Source Link */}
        <div>
          <label className="block font-medium mb-1">Source Link (optional)</label>
          <input
            type="url"
            className="input input-bordered w-full"
            value={sourceLink}
            onChange={(e) => setSourceLink(e.target.value)}
            placeholder="https://example.com"
          />
        </div>

        {/* Image Upload */}
        <div className="mt-4">
          <label className="block text-lg font-medium">Recipe Image (optional)</label>
          <input
            type="file"
            className="file-input w-full mt-2"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
        </div>

        {/* Tags */}
        <TagSelector selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

        <button type="submit" className="btn btn-primary w-full mt-6">
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
