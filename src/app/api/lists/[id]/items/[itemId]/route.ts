import sql from '@/lib/db';

// Edit an item in a specific list
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  const { id, itemId } = await params;
  const { name, quantity, assigned_to } = await req.json();

  await sql`UPDATE list_items SET name = ${name}, quantity = ${quantity}, assigned_to = ${assigned_to} WHERE list_id = ${id} AND id = ${itemId}`;
  return new Response(
    JSON.stringify({ message: 'Item updated successfully' }),
    {
      status: 200,
    }
  );
}

// Delete an item from a specific list
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  const { id, itemId } = await params;

  await sql`DELETE FROM list_items WHERE list_id = ${id} AND id = ${itemId}`;
  return new Response(
    JSON.stringify({ message: 'Item deleted successfully' }),
    {
      status: 200,
    }
  );
}
