// import { useState, useEffect } from "react";
// import { addFavourite, removeFavourite, getFavouriteRecipes } from "../services/api";

// const FavouriteButton = ({ recipeId, onUnfavourite }) => {
//   const [isFavourited, setIsFavourited] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // on mount, check if this recipe is already in the user's favourites
//   useEffect(() => {
//       const checkFavouriteStatus = async () => {
//         try {
//           const favourites = await getFavouriteRecipes();
//           // favourites is an array of recipe objects — check if any of them has an _id matching this recipeId
//           setIsFavourited(favourites.some((recipe) => recipe._id === recipeId));
//         } catch (error) {
//           // If the user has no favourites yet, the API returns 200 with an empty array
//           // That's not a real error — it just means isFavourited stays false
//           setIsFavourited(false);
//         }
//       };
//       checkFavouriteStatus();
//   }, [recipeId]);
  
//   const handleToggleFavourite = async (e) => {
//     // Stop the click bubbling up to the parent card's onClick navigation
//     e.stopPropagation();

//     setLoading(true);
//     try {
//       if (isFavourited) {
//         await removeFavourite(recipeId);
//         setIsFavourited(false);
//         if (onUnfavourite) onUnfavourite(recipeId); // Notify parent to remove this recipe from the favourites list
//       } else {
//         await addFavourite(recipeId);
//         setIsFavourited(true);
//       }
//     } catch (error) {
//       console.error("Error toggling favourite:", error);
//       // Don't update the UI if the request failed
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleToggleFavourite}
//       disabled={loading}
//       className="btn btn-ghost btn-sm btn-circle"
//       aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"}
//     >
//       {isFavourited ? (
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
//         </svg>
//       ) : (
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
//         </svg>
//       )}
//     </button>
//   );
// };

// export default FavouriteButton;

import { useState } from "react";
import { addFavourite, removeFavourite } from "../services/api";

const FavouriteButton = ({ recipeId, favouriteIds = [], onUnfavourite }) => {
  const [isFavourited, setIsFavourited] = useState(favouriteIds.includes(recipeId)); // Check if this recipe ID is in the list of favourite IDs passed from the parent
  const [loading, setLoading] = useState(false);

  const handleToggleFavourite = async (e) => {
    // Stop the click bubbling up to the parent card's onClick navigation
    e.stopPropagation();
    setLoading(true);
    try {
      if (isFavourited) {
        await removeFavourite(recipeId);
        setIsFavourited(false);
        if (onUnfavourite) onUnfavourite(recipeId); // Notify parent to remove this recipe from the favourites list
      } else {
        await addFavourite(recipeId);
        setIsFavourited(true);
      }
    } catch (error) {
      console.error("Error toggling favourite:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleFavourite}
      disabled={loading}
      className="btn btn-ghost btn-sm btn-circle"
      aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"}
    >
      {isFavourited ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      )}
    </button>
  );
};

export default FavouriteButton;