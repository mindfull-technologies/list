import sql from '@/lib/db';

// Fetch items for a specific list
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const list = await sql`SELECT * FROM lists WHERE id = ${id}`;
  const items =
    await sql`SELECT * FROM list_items WHERE list_id = ${id} ORDER BY created_at DESC`;
  return new Response(JSON.stringify({ list: list[0], items }), {
    status: 200,
  });
}

// Add an item to a specific list
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const { name, quantity, assigned_to } = await req.json();

  await sql`INSERT INTO list_items (list_id, name, quantity, assigned_to) VALUES (${id}, ${name}, ${quantity}, ${assigned_to})`;
  return new Response(JSON.stringify({ message: 'Item added successfully' }), {
    status: 200,
  });
}
