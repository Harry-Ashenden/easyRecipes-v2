import { useEffect, useState } from "react";
import { getFavouriteRecipes } from "../services/api";
import RecipeCard from "../components/RecipeCard";
import CardSkeleton from "../components/CardSkeleton";

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const data = await getFavouriteRecipes();
        setFavourites(data);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavourites();
  }, []);

  const handleUnfavourite = (recipeId) => {
    setFavourites((prev) => prev.filter((recipe) => recipe._id !== recipeId));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Favourites</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <>
            <div className="pt-10 pl-20"><CardSkeleton /></div>
            <div className="pt-10 pl-20"><CardSkeleton /></div>
            <div className="pt-10 pl-20"><CardSkeleton /></div>
          </>
        ) : favourites.length > 0 ? (
          favourites.map((recipe) => (
            <RecipeCard 
                key={recipe._id} 
                recipe={recipe} 
                favouriteIds={favourites.map((fav) => fav._id)}
                onUnfavourite={handleUnfavourite}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-3">
            No favourites yet — heart a recipe to save it here.
          </p>
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;