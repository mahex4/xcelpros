import { jwtDecode } from 'jwt-decode';
import { cookies, headers } from 'next/headers';

export async function getUserFromToken() {
    const cookie = await cookies()
    const token = cookie.get('token')?.value;

    console.log('token fetch', token);

    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch {
        return null;
    }
}

type MeResponse = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
};

export async function getCurrentUser(): Promise<MeResponse | null> {
    const cookie = await headers()
    // const cookie2 = cookie.get('cookie');

    const res = await fetch('http://localhost:5001/auth/me', {
        headers: {
            Cookie: cookie.get('cookie') ?? '',
        },
        credentials: 'include',
        cache: 'no-store', // ensure fresh user every request
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data;
}