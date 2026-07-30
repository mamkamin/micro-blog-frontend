'use client'

import { createServerParamsForMetadata } from "next/dist/server/request/params";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

export default function Page() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        try {
            const res = await fetch('http://localhost:3000/api/v1/users/login', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    username: formData.get('emailorusername'),
                    email: formData.get('emailorusername'),
                    password: formData.get('password')
                })
            });

            const data = await res.json()
            
            if (!res.ok) {
                console.log('[SERVER RESPONSE]', data);
                setError('Invalid credentials');
                return;
            }

            router.refresh();
            router.push('/');
        } catch (error) {
            console.log('[SERVER ERROR]', error);
            setError('Something went wrong. try again later');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex flex-1 flex-col">
            <main className="flex flex-1 justify-center items-center">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-2"
                >
                    <h1 className="text-2xl font-semibold underline">Log in</h1>
                    {/* Email or Username field */}
                    <label>
                        <span>Email or Username</span>
                    </label>
                    <input
                        name="emailorusername"
                        type="text"
                        required
                        className="border px-2 py-1"
                    />
                    {/* Password field */}
                    <label>
                        <span>Password</span>
                    </label>
                    <input
                        name="password"
                        type="password"
                        required
                        className="border px-2 py-1"
                    />
                    <div className="flex space-x-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="border rounded-sm mt-4 self-center px-4 disabled:opacity-50 hover:text-white hover:bg-black hover:cursor-pointer"
                        >
                            {isSubmitting ? "Logging in..." : "Log in"}
                        </button>
                        <Link
                            href="/register"
                            className="flex items-end text-blue-500 underline"
                        >
                        Create an account?
                        </Link>
                    </div>
                    {error && (
                        <p role="alert" className="text-sm self-center text-red-600">
                            {error}
                        </p>
                    )}
                </form>
            </main>
        </div>
    );
}