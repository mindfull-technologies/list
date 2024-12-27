import ListItem from '@/app/list/[id]/list-item';

interface ListParams {
    params: Promise<{ id: string }>;
}

export default async function List({ params }: ListParams) {
    const id = (await params).id;

    return <ListItem listId={id} />;
}
