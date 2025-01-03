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
import EditItemModal from '@/app/list/[id]/edit-item-modal';

interface ListItemProps {
  listId: string;
}

interface List {
  id: string;
  title: string;
}

export interface Item {
  id: string;
  name: string;
  quantity: number | string;
  assigned_to: string;
}

interface NewItem {
  name: string;
  quantity: string;
  assigned_to: string;
}

export default function ListItem({ listId }: ListItemProps) {
  const [list, setList] = useState<List | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<NewItem>({
    name: '',
    quantity: '1',
    assigned_to: '',
  });
  const [editItem, setEditItem] = useState<Item | null>(null);

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

  const handleAddListItem = async () => {
    const payload = {
      ...newItem,
      quantity: Number(newItem.quantity),
    };

    await fetch(`/api/lists/${listId}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setNewItem({ name: '', quantity: '1', assigned_to: '' });
    fetchListAndItems();
  };

  const handleItemEdit = (item: Item) => {
    setEditItem(item);
  };

  const handleItemDelete = async (id: string) => {
    await fetch(`/api/lists/${listId}/items/${id}`, {
      method: 'DELETE',
    });
    setEditItem(null);
    fetchListAndItems();
  };

  const handleItemSave = async (item: Item) => {
    const payload = {
      ...item,
      quantity: Number(item.quantity),
    };

    await fetch(`/api/lists/${listId}/items/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    setEditItem(null);
    fetchListAndItems();
  };

  if (!list) {
    return <div>Loading...</div>;
  }

  return (
    <section className='p-6'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-2xl font-bold mb-4'>{list.title}</h1>
        <div className='flex flex-col sm:flex-row gap-2 mb-6'>
          <div className='w-full'>
            <span className='text-xs inline-block ml-1'>
              Enter the item name
            </span>
            <Input
              placeholder='Item Name'
              value={newItem.name}
              onChange={e => setNewItem({ ...newItem, name: e.target.value })}
            />
          </div>
          <div className='flex flex-col xs:flex-row xs:items-end gap-2'>
            <div className='w-full xs:w-16'>
              <span className='text-xs inline-block ml-1'>Quantity</span>
              <Input
                type='number'
                placeholder='Q'
                value={newItem.quantity}
                onChange={e =>
                  setNewItem({
                    ...newItem,
                    quantity: e.target.value,
                  })
                }
              />
            </div>
            <div className='w-full xs:w-40'>
              <span className='text-xs inline-block ml-1'>
                Assign to someone
              </span>
              <Input
                placeholder='Responsible Person'
                value={newItem.assigned_to}
                onChange={e =>
                  setNewItem({
                    ...newItem,
                    assigned_to: e.target.value,
                  })
                }
              />
            </div>
            <Button onClick={handleAddListItem} className='mt-4 xs:mt-0'>
              Add Item
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-full'>Item Name</TableHead>
              <TableHead className='w-24'>Quantity</TableHead>
              <TableHead className='min-w-28 sm:min-w-40'>
                Assigned To
              </TableHead>
              <TableHead className='w-24'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.id}>
                <TableCell className='w-full'>{item.name}</TableCell>
                <TableCell className='w-24 text-center'>
                  {item.quantity}
                </TableCell>
                <TableCell className='min-w-28 sm:min-w-40'>
                  {item.assigned_to}
                </TableCell>
                <TableCell className='w-24'>
                  <Button
                    onClick={() => handleItemEdit(item)}
                    className='text-xs px-2 py-1'
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className='mt-6'>
          <Button onClick={fetchListAndItems} className='text-xs'>
            Refresh List
          </Button>
        </div>
      </div>

      {editItem && (
        <EditItemModal
          item={editItem}
          onSave={handleItemSave}
          onCancel={() => setEditItem(null)}
          onDelete={handleItemDelete}
        />
      )}
    </section>
  );
}
