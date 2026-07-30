import { getCurrentUser } from "@/lib/data/users";
import Link from "next/link";

export default async function Header() {
    const user = await getCurrentUser();
    return (
        <header className="flex justify-between p-2 border-b shadow-md">
            <h1 className="text-xl">Micro Blog</h1>

            {user ? (
                <div className="space-x-4">
                    <span>Hi, {user.username}</span>
                    <Link href="/profile">Profile</Link>
                    <Link href="/logout">Logout</Link>
                </div>
            ) : (
                <div className="space-x-4">
                    <Link
                        href="/login"
                        className="border rounded-full px-4 py-1 hover:text-white hover:bg-black hover:cursor-pointer">Login
                    </Link>
                    <Link
                        href="/register"
                        className="border rounded-full px-4 py-1 hover:text-white hover:bg-black hover:cursor-pointer">Register
                    </Link>
                </div>
            )}

        </header>
    );
}