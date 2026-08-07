import React, { useState } from 'react';
import { addManualItemToShoppingList } from '../services/api';

const ManualShoppingListItemAddForm = ({ onItemAdded }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await addManualItemToShoppingList({ 
                name: name.trim(), 
                quantity: quantity ? parseFloat(quantity) : null,
                unit: unit ? unit.trim() : null
            });
            onItemAdded(response.shoppingList.shoppingListItems);
            setName('');
            setQuantity('');
            setUnit('');
        } catch (error) {
            console.error('Error adding manual item:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <input
                type="text"
                placeholder="Item Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full"
                required
            />
            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="input input-bordered w-full"
            />
            <input
                type="text"
                placeholder="Unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="input input-bordered w-full"
            />
            <button type="submit" className={`btn btn-primary ${loading ? 'loading' : ''}`} disabled={loading}>
                {loading ? 'Adding...' : 'Add Item'}
            </button>
        </form>
    );
}

export default ManualShoppingListItemAddForm;