import { cookies } from "next/headers";

export async function getAllUsername() {
    try {
        const res = await fetch('http:/localhost:3000/api/v1/users/username');
        const json: {
            message: string,
            users: { username: string }[]
        } = await res.json();
        return json.users;
    } catch (error) {
        console.log('[ERROR] Failed to fetch all username:', error);
        return [];
    }
}

export async function getCurrentUser() {
    const token = (await cookies()).get('access_token')?.value;

    if (!token) return null;

    try {
        const res = await fetch('http:/localhost:3000/api/v1/users/me', {
            headers: {
                Cookie: `access_token=${token}`
            },
            cache: 'no-store'
        });

        const data = await res.json();
        
        if (!res.ok) {
            console.log('[SERVER LOG]', data.message);
            return null;
        }

        return data.user;
    } catch (error) {
        console.log('[ERROR] Failed to get current user:', error);
        return;
    }
}