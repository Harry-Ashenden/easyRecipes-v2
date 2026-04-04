import { Link } from "react-router-dom";
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const MealPlanCard = ({ mealPlanEntry, handleRemove, handleToggle, handleUpdateNotes }) => {
    const { _id, recipe, notes, completed } = mealPlanEntry;
    const [localNotes, setLocalNotes] = useState(notes);
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: _id });

const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : 'auto',
    position: isDragging ? 'relative' : 'static',
};

    return (
        <div ref={setNodeRef} style={style} className="card bg-base-300 w-full mb-2">
    <div className="card-body flex flex-row items-center py-3 px-4">
        <button {...attributes} {...listeners} className="btn btn-ghost btn-sm cursor-grab opacity-50 hover:opacity-100">
            ☰
        </button>
        <div className="flex-grow ml-2">
            <Link to={`/recipe/${recipe._id}`}>
                <h2 className={`font-semibold text-sm hover:underline ${completed ? 'line-through opacity-40' : ''}`}>{recipe.title}</h2>
            </Link>
            <input type="text" placeholder="Add notes..." className={`input input-ghost input-xs w-full max-w-xs p-0 h-auto text-xs ${completed ? 'line-through opacity-40' : ''}`} value={localNotes} onChange={(e) => setLocalNotes(e.target.value)} onBlur={(e) => handleUpdateNotes(_id, e.target.value)} /> {/* 👈 changed */}
        </div>
        <input type="checkbox" checked={completed} className="checkbox checkbox-sm mx-2" onChange={() => handleToggle(_id)} />
        <button className="btn btn-soft btn-error btn-sm" onClick={() => handleRemove(_id)}>Remove</button>
    </div>
</div>
    )
};

export default MealPlanCard;