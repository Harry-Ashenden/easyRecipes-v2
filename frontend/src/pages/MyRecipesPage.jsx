import { useEffect, useState } from "react";
import { getUserRecipes } from "../services/api"; 
import RecipeCard from "../components/RecipeCard"; 

const MyRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const userRecipes = await getUserRecipes(); 
        setRecipes(userRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  // Filter recipes based on the search term
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      {/* Search Bar */}
      {/* <input
        type="text"
        placeholder="Search recipes..."
        className="input input-bordered w-full max-w-md mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /> */}

        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
          <input 
            type="search" 
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </label>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))
        ) : (
          <p className="text-gray-500">No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default MyRecipesPage;
