import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Item } from '@/app/list/[id]/list-item';
import { useState } from 'react';

interface EditItemModalProps {
  item: Item;
  onSave: (item: Item) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
}

export default function EditItemModal({
  item,
  onSave,
  onCancel,
  onDelete,
}: EditItemModalProps) {
  const [editItem, setEditItem] = useState<Item>(item);

  const handleSave = () => {
    onSave({
      ...editItem,
      quantity: Number(editItem.quantity),
    });
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='flex flex-col gap-3 bg-white p-6 rounded w-96'>
        <h2 className='text-xl'>Edit Details</h2>
        <div>
          <span className='text-xs inline-block ml-1'>Item Name</span>
          <Input
            placeholder='Item Name'
            value={editItem.name}
            onChange={e => setEditItem({ ...editItem, name: e.target.value })}
          />
        </div>
        <div>
          <span className='text-xs inline-block ml-1'>Quantity</span>
          <Input
            type='number'
            placeholder='Q'
            value={editItem.quantity}
            onChange={e =>
              setEditItem({
                ...editItem,
                quantity: e.target.value,
              })
            }
          />
        </div>
        <div>
          <span className='text-xs inline-block ml-1'>Assigned To</span>
          <Input
            placeholder='Assigned To'
            value={editItem.assigned_to}
            onChange={e =>
              setEditItem({ ...editItem, assigned_to: e.target.value })
            }
          />
        </div>
        <div className='flex gap-2 mt-3 justify-end'>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={() => onDelete(editItem.id)}>Delete</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
}
