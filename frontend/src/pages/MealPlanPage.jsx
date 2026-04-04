import { useEffect, useState } from 'react';
import MealPlanCard from '../components/MealPlanCard';
import { getMealPlanner, removeFromMealPlanner, toggleRecipeCompletion, updateMealPlanEntryNotes, reorderMealPlanner, clearMealPlanner } from '../services/api';
import MealPlanCardSkeleton from '../components/MealPlanCardSkeleton';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

const MealPlanPage = () => {
  const [mealPlanEntries, setMealPlanEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMealPlanEntries = async () => {
      try {
        const entries = await getMealPlanner();
        setMealPlanEntries(entries);
      } catch (error) {
        console.error("Error fetching meal plan entries:", error);
      } finally {
        setLoading(false);
      }
    };

    getMealPlanEntries();
  }, []);

  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const weeklyChunks = chunkArray(mealPlanEntries, 7);

  
  const handleRemove = async (_id) => {
      try {
          await removeFromMealPlanner(_id);
          setMealPlanEntries(prev => prev.filter(entry => entry._id !== _id));
      } catch (error) {
          console.error("Error removing meal plan entry:", error);
      }
  };

  const handleToggle = async (_id) => {
    try {
        await toggleRecipeCompletion(_id);
        setMealPlanEntries(prev =>
          prev.map(entry => entry._id === _id ? { ...entry, completed: !entry.completed } : entry));
    } catch (error) {
        console.error("Error toggling recipe completion:", error);
    }
  };

  const handleUpdateNotes = async (_id, newNotes) => {
    try {
        await updateMealPlanEntryNotes(_id, newNotes);
        setMealPlanEntries((prev) =>
          prev.map((entry) => (entry._id === _id ? { ...entry, notes: newNotes } : entry))
      );
    } catch (error) {
      console.error('Error updating meal plan notes:', error);
    }
  };

  const onDragEnd = async (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = mealPlanEntries.findIndex(entry => entry._id === active.id);
    const newIndex = mealPlanEntries.findIndex(entry => entry._id === over.id);

    const reorderedEntries = arrayMove(mealPlanEntries, oldIndex, newIndex);

    setMealPlanEntries(reorderedEntries);

    const reorderedIds = reorderedEntries.map(entry => entry._id);

    try {
        await reorderMealPlanner(reorderedIds);
    } catch (error) {
        console.error('Error reordering meal plan:', error);
    }
  };

  const handleClearPlan = async () => {
    try {
        await clearMealPlanner();
        setMealPlanEntries([]);
        document.getElementById('my_modal_5').close();
    } catch (error) {
        console.error('Error clearing meal plan:', error);
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className='flex justify-between items-center mb-4'>
        <h1 className="text-2xl font-bold ">My Meal Plan</h1>
        <button className="btn  btn-soft btn-error btn-sm" onClick={() => { document.getElementById('my_modal_5').showModal(); } }>Clear Plan</button>
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure you want to clear your meal plan?</h3>
          {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
            <button className="btn btn-error" onClick={handleClearPlan}>Clear Plan</button>
          </div>
        </div>
      </dialog>

      {loading ? (
        <>
          <div><MealPlanCardSkeleton /></div>
          <div><MealPlanCardSkeleton /></div>
          <div><MealPlanCardSkeleton /></div>
        </>
      ) : mealPlanEntries.length > 0 ? (
        <>
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={mealPlanEntries.map(entry => entry._id)} strategy={verticalListSortingStrategy}>
            {weeklyChunks.map((week, weekIndex) => (
              <div key={weekIndex}>
                <div className="flex items-center gap-3 mb-3 mt-6">
                  <h2 className="text-sm font-semibold uppercase tracking-widest">
                      Week {weekIndex + 1}
                  </h2>
                  <div className="flex-grow border-t border-base-300"></div>
                </div>
                {week.map((entry) => (
                  <MealPlanCard key={entry._id} mealPlanEntry={entry} handleRemove={handleRemove} handleToggle={handleToggle} handleUpdateNotes={handleUpdateNotes} />
                ))}
              </div>
            ))}
            </SortableContext>
          </DndContext>
        </>
      ) : (
        <p className="text-gray-500">
          Your meal plan is empty — add recipes to your meal planner to see them here.
        </p>
      )}
      </div>
  );
};


export default MealPlanPage;