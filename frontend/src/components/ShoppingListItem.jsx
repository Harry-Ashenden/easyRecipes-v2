const ShoppingListItem = ({ shoppingListItem, handleToggle, handleRemove }) => {
    const { _id, name, quantity, unit, checked } = shoppingListItem;

    return (
        <div className="card bg-base-300 w-full mb-2">
            <div className="card-body flex flex-row items-center py-3 px-4">
                <input type="checkbox" checked={checked} className="checkbox checkbox-sm mx-2" onChange={() => handleToggle(_id)} />
                <div className="flex-grow ml-2">
                    <h2 className={`font-semibold text-sm hover:underline ${checked ? 'line-through opacity-40' : ''}`}>{name} {quantity} {unit ? unit : ''}</h2>
                </div>
            <button className="btn btn-soft btn-error btn-sm" onClick={() => handleRemove(_id)}>Remove</button>
            </div>
        </div>
    )
};

export default ShoppingListItem;