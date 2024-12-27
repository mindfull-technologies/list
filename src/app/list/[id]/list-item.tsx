'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';

interface ListItemsPageProps {
    listId: string;
}

export default function ListItem({ listId }: ListItemsPageProps) {
    const [items, setItems] = useState<
        { id: string; name: string; quantity: number }[]
    >([]);
    const [newItem, setNewItem] = useState({ name: '', quantity: '1' });

    useEffect(() => {
        fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listId]);

    const fetchItems = async () => {
        const res = await fetch(`/api/lists/${listId}`);
        console.log(res);
        const data = await res.json();
        console.log('items', data);
        setItems(data);
    };

    const addItem = async () => {
        // Convert string to number
        const payload = {
            ...newItem,
            quantity: Number(newItem.quantity),
        };

        await fetch(`/api/lists/${listId}`, {
            method: 'POST',
            body: JSON.stringify(payload),
        });
        setNewItem({ name: '', quantity: '1' });
        fetchItems();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your List</h1>
            <div className="mb-6">
                <Input
                    placeholder="Item Name"
                    value={newItem.name}
                    onChange={(e) =>
                        setNewItem({ ...newItem, name: e.target.value })
                    }
                    className="mr-2"
                />
                <Input
                    type="number"
                    placeholder="Quantity"
                    value={newItem.quantity}
                    onChange={(e) =>
                        setNewItem({
                            ...newItem,
                            quantity: e.target.value,
                        })
                    }
                    className="w-20"
                />
                <Button onClick={addItem} className="ml-2">
                    Add Item
                </Button>
            </div>
            <ul className="mb-6">
                {items.map((item) => (
                    <li key={item.id} className="flex justify-between mb-2">
                        <span>{item.name}</span>
                        <span>{item.quantity}</span>
                    </li>
                ))}
            </ul>
            <Button onClick={fetchItems}>Refresh List</Button>
        </div>
    );
}
