import React from "react";

const TagFilter = ({ selectedTags, toggleTag, setSelectedTags, tags }) => {
  return (
    <div className="w-full">
      {/* Mobile: Collapsible Tags */}
      <details className="sm:hidden w-full">
        <summary className="btn w-full flex justify-between items-center">
          Filter Tags
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </summary>

        <form className="mt-2 flex flex-wrap gap-2 p-4 border rounded-box bg-base-100 shadow-sm">
          {/* Reset Button */}
          {selectedTags.length > 0 && (
            <input
              className="btn btn-square btn-soft"
              type="reset"
              value="×"
              onClick={() => setSelectedTags([])}
            />
          )}

          {/* Tag Checkboxes */}
          {tags.map((tag) => (
            <label key={tag} className={`btn ${selectedTags.includes(tag) ? "btn-primary" : "btn-soft"}`}>
              <input
                type="checkbox"
                className="hidden"
                checked={selectedTags.includes(tag)}
                onChange={() => toggleTag(tag)}
              />
              {tag}
            </label>
          ))}
        </form>
      </details>

      {/* Desktop: Always Visible */}
      <form className="filter hidden sm:flex flex-wrap gap-2 mt-4">
        {/* Reset Button */}
        {selectedTags.length > 0 && (
          <input
            className="btn btn-square btn-soft"
            type="reset"
            value="×"
            onClick={() => setSelectedTags([])}
          />
        )}

        {/* Tag Checkboxes */}
        {tags.map((tag) => (
          <label key={tag} className={`btn ${selectedTags.includes(tag) ? "btn-primary" : "btn-soft"}`}>
            <input
              type="checkbox"
              className="hidden"
              checked={selectedTags.includes(tag)}
              onChange={() => toggleTag(tag)}
            />
            {tag}
          </label>
        ))}
      </form>
    </div>
  );
};

export default TagFilter;
