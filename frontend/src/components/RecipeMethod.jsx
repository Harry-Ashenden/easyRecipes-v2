const RecipeMethod = ({ method }) => (
  <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4">
    <input type="checkbox" />
    <div className="collapse-title text-lg font-medium">Method</div>
    <div className="collapse-content">
      <ul className="list-decimal list-inside space-y-2">
        {method.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default RecipeMethod;