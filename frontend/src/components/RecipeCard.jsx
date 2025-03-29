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
    </div>
  );
};

export default RecipeCard;
