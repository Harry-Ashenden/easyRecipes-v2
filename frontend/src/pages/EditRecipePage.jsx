// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getRecipeById } from "../services/api";
// import { updateRecipe } from "../services/api";
// import TagSelector from "../components/TagSelector";

// const EditRecipePage = () => {
//   const { recipeId } = useParams();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     title: "",
//     servings: "",
//     prepTime: "",
//     cookTime: "",
//     totalTime: "",
//     ingredients: "",
//     method: "",
//     file: null,
//   });
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadRecipe = async () => {
//       try {
//         const data = await getRecipeById(recipeId);
//         setForm({
//           title: data.title,
//           servings: data.servings,
//           prepTime: data.prepTime,
//           cookTime: data.cookTime,
//           totalTime: data.totalTime,
//           ingredients: data.ingredients.join("\n"),
//           method: data.method.join("\n"),
//           file: null,
//         });
//         setSelectedTags(data.tags);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error loading recipe:", err);
//         setLoading(false);
//       }
//     };

//     loadRecipe();
//   }, [recipeId]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "file") {
//       setForm((prev) => ({ ...prev, file: files[0] }));
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("title", form.title);
//     formData.append("servings", form.servings);
//     formData.append("prepTime", form.prepTime);
//     formData.append("cookTime", form.cookTime);
//     formData.append("totalTime", form.totalTime);
//     formData.append("ingredients", form.ingredients);
//     formData.append("method", form.method);
//     formData.append("tags", selectedTags.join("\n"));
//     if (form.file) {
//       formData.append("file", form.file);
//     }

//     try {
//       await updateRecipe(recipeId, formData);
//       navigate(`/recipe/${recipeId}`);
//     } catch (err) {
//       console.error("Error updating recipe:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input name="title" value={form.title} onChange={handleChange} className="input input-bordered w-full" />
//         <input name="servings" value={form.servings} onChange={handleChange} className="input input-bordered w-full" />
//         <input name="prepTime" value={form.prepTime} onChange={handleChange} className="input input-bordered w-full" />
//         <input name="cookTime" value={form.cookTime} onChange={handleChange} className="input input-bordered w-full" />
//         <input name="totalTime" value={form.totalTime} onChange={handleChange} className="input input-bordered w-full" />
        
//         <textarea name="ingredients" value={form.ingredients} onChange={handleChange} className="textarea textarea-bordered w-full" rows={6} placeholder="One ingredient per line" />
//         <textarea name="method" value={form.method} onChange={handleChange} className="textarea textarea-bordered w-full" rows={6} placeholder="One step per line" />

//         <input type="file" name="file" onChange={handleChange} className="file-input file-input-bordered w-full" />

//         <TagSelector selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

//         {/* <button type="submit" className="btn btn-primary w-full">Update Recipe</button> */}

//         <button
//           type="submit"
//           className="btn btn-primary w-full"
//           disabled={loading}
//         >
//           {loading ? (
//             <>
//               <span className="loading loading-dots mr-2"></span>
//             </>
//           ) : (
//             "Update Recipe"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditRecipePage;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById, updateRecipe } from "../services/api";
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
    sourceLink: "",
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
          sourceLink: data.sourceLink,
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
    formData.append("sourceLink", form.sourceLink);
    if (selectedTags.length > 0) {
      selectedTags.forEach((tag) => formData.append("tags[]", tag)); 
    } else {
      formData.append("tags[]", ""); // Append empty value if no tags selected
    }
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
    <div className="container mx-auto p-6 max-w-3xl">
      <form onSubmit={handleSubmit} className="shadow-md rounded p-6 space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium text-lg mb-1">Recipe Title</label>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Servings & Times */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Servings</label>
            <input
              type="number"
              name="servings"
              className="input input-bordered w-full"
              value={form.servings}
              onChange={handleChange}
              min={1}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Prep Time (mins)</label>
            <input
              type="number"
              name="prepTime"
              className="input input-bordered w-full"
              value={form.prepTime}
              onChange={handleChange}
              min={0}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Cook Time (mins)</label>
            <input
              type="number"
              name="cookTime"
              className="input input-bordered w-full"
              value={form.cookTime}
              onChange={handleChange}
              min={0}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Total Time (mins)</label>
            <input
              type="number"
              name="totalTime"
              className="input input-bordered w-full"
              value={form.totalTime}
              onChange={handleChange}
              min={0}
              required
            />
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <label className="block font-medium mb-1">
            Ingredients (one per line)
          </label>
          <textarea
            name="ingredients"
            className="textarea textarea-bordered w-full"
            rows={5}
            value={form.ingredients}
            onChange={handleChange}
            placeholder="e.g. 2 cups flour"
            required
          />
        </div>

        {/* Method */}
        <div>
          <label className="block font-medium mb-1">
            Method (one step per line)
          </label>
          <textarea
            name="method"
            className="textarea textarea-bordered w-full"
            rows={7}
            value={form.method}
            onChange={handleChange}
            placeholder="e.g. Preheat oven to 180C"
            required
          />
        </div>

        {/* Source Link */}
        <div>
          <label className="block font-medium mb-1">
            Source Link (optional)
          </label>
          <input
            type="url"
            name="sourceLink"
            className="input input-bordered w-full"
            value={form.sourceLink}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>

        {/* Image Upload */}
        <div className="mt-4">
          <label className="block text-lg font-medium">
            Recipe Image (optional)
          </label>
          <input
            type="file"
            name="file"
            className="file-input w-full mt-2"
            onChange={handleChange}
            accept="image/*"
          />
        </div>

        {/* Tags */}
        <TagSelector
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full mt-6"
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
