import React, { useState } from "react";
import axios from "axios";
import RECIPE_TAGS from "../constants/tags";
import TagSelector from "../components/TagSelector";

const RecipeUploadForm = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);
      formData.append("tags", selectedTags.join("\n"));

      const response = await axios.post("/api/recipes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        console.log("Recipe uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading recipe:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 shadow-md rounded">
      <div>
        <label className="block text-lg font-medium">Recipe Title</label>
        <input
          type="text"
          className="input input-bordered w-full mt-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mt-4">
        <label className="block text-lg font-medium">Recipe Image</label>
        <input
          type="file"
          className="file-input w-full mt-2"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </div>

      <TagSelector selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

      <button type="submit" className="btn btn-primary mt-4 w-full">
        Upload Recipe
      </button>
    </form>
  );
};

export default RecipeUploadForm;
