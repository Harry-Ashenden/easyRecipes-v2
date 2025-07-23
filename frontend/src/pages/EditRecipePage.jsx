import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById } from "../services/api";
import { updateRecipe } from "../services/api";
import TagSelector from "../components/TagSelector";

const EditRecipePage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    servings: "",
    prepTime: "",
    cookTime: "",
    totalTime: "",
    ingredients: "",
    method: "",
    file: null,
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const data = await getRecipeById(recipeId);
        setForm({
          title: data.title,
          servings: data.servings,
          prepTime: data.prepTime,
          cookTime: data.cookTime,
          totalTime: data.totalTime,
          ingredients: data.ingredients.join("\n"),
          method: data.method.join("\n"),
          file: null,
        });
        setSelectedTags(data.tags);
        setLoading(false);
      } catch (err) {
        console.error("Error loading recipe:", err);
        setLoading(false);
      }
    };

    loadRecipe();
  }, [recipeId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm((prev) => ({ ...prev, file: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("servings", form.servings);
    formData.append("prepTime", form.prepTime);
    formData.append("cookTime", form.cookTime);
    formData.append("totalTime", form.totalTime);
    formData.append("ingredients", form.ingredients);
    formData.append("method", form.method);
    formData.append("tags", selectedTags.join("\n"));
    if (form.file) {
      formData.append("file", form.file);
    }

    try {
      await updateRecipe(recipeId, formData);
      navigate(`/recipe/${recipeId}`);
    } catch (err) {
      console.error("Error updating recipe:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} className="input input-bordered w-full" />
        <input name="servings" value={form.servings} onChange={handleChange} className="input input-bordered w-full" />
        <input name="prepTime" value={form.prepTime} onChange={handleChange} className="input input-bordered w-full" />
        <input name="cookTime" value={form.cookTime} onChange={handleChange} className="input input-bordered w-full" />
        <input name="totalTime" value={form.totalTime} onChange={handleChange} className="input input-bordered w-full" />
        
        <textarea name="ingredients" value={form.ingredients} onChange={handleChange} className="textarea textarea-bordered w-full" rows={6} placeholder="One ingredient per line" />
        <textarea name="method" value={form.method} onChange={handleChange} className="textarea textarea-bordered w-full" rows={6} placeholder="One step per line" />

        <input type="file" name="file" onChange={handleChange} className="file-input file-input-bordered w-full" />

        <TagSelector selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

        {/* <button type="submit" className="btn btn-primary w-full">Update Recipe</button> */}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading loading-dots mr-2"></span>
            </>
          ) : (
            "Update Recipe"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditRecipePage;
