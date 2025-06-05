import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="card bg-base-100 shadow-sm w-96 cursor-pointer"
      onClick={() => navigate(`/recipe/${recipe._id}`)}
    >
      <figure className="px-10 pt-10">
        <img src={recipe.image} alt={recipe.title} className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{recipe.title}</h2>
      </div>

        {/* Display Tags */}
        {recipe.tags && recipe.tags.length > 0 && (
            <div className="card-actions justify-center">
            {recipe.tags.map((tag) => (
              <span key={tag} className="badge badge-soft">
                {tag}
              </span>
            ))}
          </div>
        )}

         {/* User Info (Only for Feed Page) */}
         {recipe.username && (
          <div className="flex items-center gap-3 mt-4">
            <img
              src={recipe.profilePicture}
              alt={recipe.username}
              className="w-10 h-10 rounded-full border"
            />
            <span className="font-semibold">{recipe.username}</span>
          </div>
        )}
    </div>
  );
};

export default RecipeCard;
