import sql from '@/lib/db';

// Fetch items for a specific list
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;

    const list = await sql`SELECT * FROM lists WHERE id = ${id}`;
    const items = await sql`SELECT * FROM list_items WHERE list_id = ${id}`;
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
    const { name, quantity } = await req.json();

    await sql`INSERT INTO list_items (list_id, name, quantity) VALUES (${id}, ${name}, ${quantity})`;
    return new Response(
        JSON.stringify({ message: 'Item added successfully' }),
        {
            status: 200,
        }
    );
}
