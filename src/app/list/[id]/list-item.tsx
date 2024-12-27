'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useState, useEffect } from 'react';

interface ListItemProps {
    listId: string;
}

interface List {
    id: string;
    title: string;
}

interface Item {
    id: string;
    name: string;
    quantity: number;
}

export default function ListItem({ listId }: ListItemProps) {
    const [list, setList] = useState<List | null>(null);
    const [items, setItems] = useState<Item[]>([]);
    const [newItem, setNewItem] = useState({ name: '', quantity: '1' });

    useEffect(() => {
        fetchListAndItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listId]);

    const fetchListAndItems = async () => {
        const res = await fetch(`/api/lists/${listId}`);
        const data = await res.json();
        setList(data.list);
        setItems(data.items);
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
        fetchListAndItems();
    };

    if (!list) {
        return <div>Loading...</div>;
    }

    return (
        <section className="p-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">{list.title}</h1>
                <div className="flex flex-col sm:flex-row gap-2 mb-6">
                    <div className="w-full">
                        <span className="text-xs">Enter the item name</span>
                        <Input
                            placeholder="Item Name"
                            value={newItem.name}
                            onChange={(e) =>
                                setNewItem({ ...newItem, name: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex items-end gap-2">
                        <div>
                            <span className="text-xs">Enter quantity</span>
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
                        </div>
                        <Button onClick={addItem}>Add Item</Button>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-full">Item Name</TableHead>
                            <TableHead className="w-24">Quantity</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="w-full">
                                    {item.name}
                                </TableCell>
                                <TableCell className="w-24 text-center">
                                    {item.quantity}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="mt-6">
                    <Button onClick={fetchListAndItems} className="text-xs">
                        Refresh List
                    </Button>
                </div>
            </div>
        </section>
    );
}
