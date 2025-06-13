'use client';

import { useEffect, useState } from 'react';

export type MeResponse = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
};

export function useCurrentUser() {
    const [user, setUser] = useState<MeResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/me', {
                    credentials: 'include',
                });

                if (!res.ok) {
                    setUser(null);
                } else {
                    const data = await res.json();
                    setUser(data);
                }
            } catch (err) {
                console.error('Failed to fetch user:', err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading };
}
