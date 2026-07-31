'use client'

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(event.currentTarget);

        const data = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        const url = 'http://localhost:3000/api/v1/users';

        try {
            const res = await fetch(url, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(data)
            });

            const json = await res.json();

            if (!res.ok) {
                console.log('[SERVER LOG]', json.message);
                setError(json.message);
                return;
            }

            router.push('/login');
        } catch (error) {
            console.log('[ERROR LOG]', error);
            setError('Something went wrong. Try again later.');
        } finally {
            setIsSubmitting(false);
        }

    }

    return (
        <div className="flex flex-1 flex-col">
            <main className="flex flex-1 justify-center items-center">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-2">
                    <h1 className="text-2xl font-semibold underline">Register</h1>
                    <label>Username</label>
                    <input
                        name="username"
                        type="text"
                        placeholder="example"
                        className="border px-2 py-1"
                    />

                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        className="border px-2 py-1"
                    />

                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="********"
                        className="border px-2 py-1"
                    />
                    <div
                        className="space-x-2"
                    >
                        <button
                            type="submit"
                            className="border rounded-sm mt-4 self-center px-4 disabled:opacity-50 hover:text-white hover:bg-black hover:cursor-pointer"
                        >
                            {isSubmitting ? "Registering..." : "Register"}
                        </button>
                        <Link
                            href="/login"
                            className="underline text-blue-500"
                        >
                            I Already have an account
                        </Link>
                    </div>
                    {error && (
                        <p
                            role="alert"
                            className="text-sm self-center text-red-600"
                        >
                            {error}
                        </p>
                    )}
                </form>
            </main>
        </div>
    );
}