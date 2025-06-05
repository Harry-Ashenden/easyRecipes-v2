import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/api";
import { getCurrentUser } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { deleteRecipeById } from "../services/api";
import RecipeIngredients from "../components/RecipeIngredients";
import RecipeMethod from "../components/RecipeMethod"

const RecipePage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      const user = await getCurrentUser();
      setCurrentUserId(user?.id);
    };
    fetchCurrentUserId();
  }, []);


  const isOwner = currentUserId === recipe?.supabaseUserId;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(recipeId);
        setRecipe(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading recipe:", error);
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const handleDelete = async () => {
  try {
    await deleteRecipeById(recipeId);
    navigate("/my-recipes"); // Redirect after successful delete
  } catch (error) {
    console.error("Delete failed:", error);
    // Optional: Show a toast or alert
  }
};

  if (loading) return <div className="text-center mt-10"><span className="loading loading-dots loading-lg"></span></div>;
  if (!recipe) return <div className="text-center text-red-500 mt-10">Recipe not found</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{recipe.title}</h1>
        <div className="flex justify-center items-center gap-3 mt-2">
          <img
            src={recipe.profilePicture}
            alt={recipe.username}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">{recipe.username}</span>
        </div>
      </div>

      {/* Image */}
      <div className="mb-6">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-box shadow"
        />
      </div>

        {/* <div className="carousel rounded-box w-64">
          <div className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
              className="w-full"
              alt="Tailwind CSS Carousel component" />
          </div>
          <div className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
              className="w-full"
              alt="Tailwind CSS Carousel component" />
          </div>
          <div className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
              className="w-full"
              alt="Tailwind CSS Carousel component" />
          </div>
          <div className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
              className="w-full"
              alt="Tailwind CSS Carousel component" />
          </div>
          <div className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
              className="w-full"
              alt="Tailwind CSS Carousel component" />
          </div>
          <div className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
              className="w-full"
              alt="Tailwind CSS Carousel component" />
          </div>
          <div className="carousel-item w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
              className="w-full"
              alt="Tailwind CSS Carousel component" />
          </div>
        </div> */}

      {/* Details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm mb-6">
        <div><strong>Prep Time</strong><br />{recipe.prepTime} mins</div>
        <div><strong>Cook Time</strong><br />{recipe.cookTime} mins</div>
        <div><strong>Total Time</strong><br />{recipe.totalTime} mins</div>
        <div><strong>Servings</strong><br />{recipe.servings}</div>
      </div>

      {/* Ingredients Collapse */}
      <RecipeIngredients ingredients={recipe.ingredients} />

      {/* Method Collapse */}
      <RecipeMethod method={recipe.method} />

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-6">
        {recipe.tags?.map((tag) => (
          <span key={tag} className="badge badge-outline">{tag}</span>
        ))}
      </div>

      {isOwner && (
        <div className="mt-10 flex justify-end gap-4">
          <button
            className="btn btn-error"
            onClick={() => document.getElementById("confirmDeleteModal").showModal()}
          >
            Delete Recipe
          </button>
        </div>
      )}

      <dialog id="confirmDeleteModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">Are you sure you want to delete this recipe? This cannot be undone.</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn">Cancel</button>
              <button
                className="btn btn-error"
                onClick={handleDelete}
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>

    </div>
  );
};

export default RecipePage;
