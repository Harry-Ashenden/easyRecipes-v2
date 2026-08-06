import { useState, useEffect } from 'react';
import ShoppingListItem from '../components/ShoppingListItem';
import ShoppingListItemSkeleton from '../components/ShoppingListItemSkeleton';
import ManualShoppingListItemAddForm from '../components/ManualShoppingListItemAddForm';
import { getShoppingList, clearShoppingList, toggleShoppingListItem, removeShoppingListItem, addManualItemToShoppingList } from '../services/api';

const ShoppingListPage = () => {
    const [shoppingList, setShoppingList] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShoppingList = async () => {
            try {
                const list = await getShoppingList();
                setShoppingList(list);
            } catch (error) {
                console.error("Error fetching shopping list:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchShoppingList();
    }, []);

    const handleClearShoppingList = async () => {
        setShoppingList([]);

        try {
            await clearShoppingList();
            document.getElementById('my_modal_5').close();
        } catch (error) {
            console.error('Error clearing shopping list:', error);
        }
      }

    const handleToggle = async (_id) => {
        setShoppingList(
            shoppingList.map(item => 
                item._id === _id ? { ...item, checked: !item.checked } : item
            )
        );

        try {
            await toggleShoppingListItem(_id);
        } catch (error) {
            console.error('Error toggling shopping item:', error);
        }
    };

    const handleRemove = async (_id) => {
        setShoppingList(shoppingList.filter(item => item._id !== _id));

        try {
            await removeShoppingListItem(_id);
        } catch (error) {
            console.error('Error removing shopping item:', error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className='flex justify-between items-center mb-4'>
                <h1 className="text-2xl font-bold ">My Shopping List</h1>
                <button className="btn  btn-soft btn-error btn-sm" onClick={() => { document.getElementById('my_modal_5').showModal(); } }>Clear List</button>
            </div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Are you sure you want to clear your shopping list?</h3>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">Close</button>
                    </form>
                    <button className="btn btn-error" onClick={handleClearShoppingList}>Clear List</button>
                  </div>
                </div>
            </dialog>

            {loading ? (
                <>
                    <div><ShoppingListItemSkeleton /></div>
                    <div><ShoppingListItemSkeleton /></div>
                    <div><ShoppingListItemSkeleton /></div>
                </>
            ) : shoppingList.length > 0 ? (
                <>
                    {/* "To Buy" section */}
                    <div>
                        <div className="flex items-center gap-3 mb-3 mt-6">
                            <h2 className="text-sm font-semibold uppercase tracking-widest">To buy:</h2>
                            <div className="flex-grow border-t border-base-300"></div>
                        </div>
                        {shoppingList.filter(item => !item.checked).map(item => (
                            <ShoppingListItem key={item._id} shoppingListItem={item} handleToggle={handleToggle} handleRemove={handleRemove} />
                        ))}
                    </div>
                    {/* "Got" section */}
                    <div>
                        <div className="flex items-center gap-3 mb-3 mt-6">
                            <h2 className="text-sm font-semibold uppercase tracking-widest">Got:</h2>
                            <div className="flex-grow border-t border-base-300"></div>
                        </div>
                        {shoppingList.filter(item => item.checked).map(item => (
                            <ShoppingListItem key={item._id} shoppingListItem={item} handleToggle={handleToggle} handleRemove={handleRemove} />
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-gray-500">
                  Your shopping list is empty — add items to your shopping list to see them here.
                </p>
            )}

        <div className="mt-8 border-t pt-6">
            <h3 className="text-sm font-semibold uppercase mb-4">Add Item Manually</h3>
            <ManualShoppingListItemAddForm onItemAdded={(updatedList) => setShoppingList(updatedList)} />
        </div>
             
        </div>
    );
};

export default ShoppingListPage;