import sql from '@/lib/db';

// Create a new list
export async function POST(req: Request) {
  const { title } = await req.json();
  const [newList] =
    await sql`INSERT INTO lists (title) VALUES (${title}) RETURNING id`;
  return new Response(JSON.stringify({ id: newList.id }), {
    status: 200,
  });
}

// Fetch all lists
export async function GET() {
  const lists = await sql`SELECT * FROM lists ORDER BY created_at DESC`;
  return new Response(JSON.stringify(lists), {
    status: 200,
  });
}
