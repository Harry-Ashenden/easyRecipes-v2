import { useEffect, useState } from "react";
import { getAllRecipes } from "../services/api"; 
import RecipeCard from "../components/RecipeCard"; 
import RECIPE_TAGS from "../constants/tags";
import TagFilter from "../components/TagFilter";

const RecipeFeedPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const allRecipes = await getAllRecipes(); // Fetch all recipes from API
        setRecipes(allRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

    // Toggle tags (add/remove from array)
    const toggleTag = (tag) => {
        setSelectedTags((prevTags) =>
          prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
        );
      };

  // Filter recipes based on the search term
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedTags.length === 0 || selectedTags.every((tag) => recipe.tags.includes(tag)))
  );

  return (
    <div className="container mx-auto p-6">
        <h1>Feed</h1>

      {/* Search Bar */}
        <label className="input mb-2">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
          <input 
            type="search" 
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </label>

        {/* Tag Filtering System (Reusable Component) */}
      <TagFilter 
        selectedTags={selectedTags} 
        toggleTag={toggleTag} 
        setSelectedTags={setSelectedTags} 
        tags={RECIPE_TAGS} 
      />
      
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

export default RecipeFeedPage;
