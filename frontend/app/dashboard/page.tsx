import { redirect } from 'next/navigation';
import { getUserFromToken } from '@/lib/auth';

export default async function DashboardPage() {
    const user = await getUserFromToken();

    if (!user) redirect('/signin');

    return (
        <div>
            <h1>Welcome {user.aud}</h1>
        </div>
    );
}
