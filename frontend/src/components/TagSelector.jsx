import React from "react";
import RECIPE_TAGS from "../constants/tags";

const TagSelector = ({ selectedTags, setSelectedTags }) => {
  const handleTagChange = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="mt-4">
      <label className="block text-lg font-medium">Tags</label>
      <div className="flex flex-wrap gap-2 mt-2">
        {RECIPE_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`badge p-2 cursor-pointer ${
              selectedTags.includes(tag) ? "badge-primary" : "badge-outline"
            }`}
            onClick={() => handleTagChange(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;
