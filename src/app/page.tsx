'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
    const [title, setTitle] = useState('');
    const router = useRouter();

    const createList = async () => {
        const res = await fetch('/api/lists', {
            method: 'POST',
            body: JSON.stringify({ title }),
        });
        const data = await res.json();
        router.push(`/list/${data.id}`);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-96">
                <CardHeader>
                    <CardTitle>Create a New List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input
                        placeholder="List Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mb-4"
                    />
                    <Button onClick={createList} className="w-full">
                        Create List
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
