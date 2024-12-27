import ListItem from '@/app/list/[id]/list-item';

export default async function page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id;

    return <ListItem listId={id} />;
}
