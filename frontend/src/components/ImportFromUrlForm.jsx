import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { importRecipeFromUrl } from "../services/api";

const ImportFromUrlForm = () => {
  const [recipeUrl, setRecipeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await importRecipeFromUrl(recipeUrl);
      const createdRecipe = response.data.recipe;

      // Redirect to edit the newly created recipe
      navigate(`/recipe/${createdRecipe._id}/edit`, { state: { recipe: createdRecipe } });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Something went wrong while importing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Paste a recipe URL</span>
          </div>
          <input
            type="url"
            placeholder="https://example.com/recipe"
            className="input input-bordered w-full"
            value={recipeUrl}
            onChange={(e) => setRecipeUrl(e.target.value)}
            required
          />
        </label>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Importing..." : "Import Recipe"}
        </button>
      </form>
    </div>
  );
};

export default ImportFromUrlForm;
