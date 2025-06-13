import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

export async function getUserFromToken() {
    const cookie = await cookies()
    const token = cookie.get('token')?.value;

    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch {
        return null;
    }
}
