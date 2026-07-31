'use client';

import { MouseEvent, SubmitEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface EditButtonProps {
    label: string;
    value: string;
    type: string;
}

function ProfileEditModal({ label, value, type, onClose }: EditButtonProps & { onClose: () => void }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const router = useRouter();

    /*
        NOTES on useEffect:
        Will be run when the DOM updates. in this case, when we clicked, Edit button and the DOM
        updates to include this component
    */
    useEffect(() => {
        dialogRef.current?.showModal();
    }, []);

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);
        const formData = new FormData(event.currentTarget);

        const prop = label.toLowerCase();
        const val = formData.get(`profile-${prop}`)?.toString();

        if (!val) {
            setError(`${label} is required.`);
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/v1/users/me", {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ [prop]: val }),
            });
            const result: { message?: string } = await response.json();

            if (!response.ok) {
                setError(result.message ?? "Unable to update your profile.");
                return;
            }

            router.refresh();
            onClose();
        } catch {
            setError("Something went wrong. Try again later");
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
        if (event.target === event.currentTarget) {
            dialogRef.current?.close();
        }
    }

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            onClick={handleBackdropClick}
            className="m-auto p-4 border rounded-sm"
        >
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                <label htmlFor={`profile-${label.toLowerCase()}`}>{label}</label>
                <input
                    id={`profile-${label.toLowerCase()}`}
                    name={`profile-${label.toLowerCase()}`}
                    type={type}
                    defaultValue={value}
                    className="px-2 border rounded-md"
                />
                <button type="submit" disabled={isSubmitting}
                    className="border rounded-sm hover:text-white hover:bg-black hover:cursor-pointer"
                >
                    Save
                </button>
                <button type="button" onClick={() => dialogRef.current?.close()}
                    className="border rounded-sm hover:text-white hover:bg-black hover:cursor-pointer"
                >
                    Cancel
                </button>
            </form>
            {error && (
                <p role="alert" className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </dialog>
    );
}

export default function EditProfileButton(props: EditButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="rounded border px-3 py-1 text-sm hover:text-white hover:bg-black hover:cursor-pointer"
            >
                Edit
            </button>
            {isModalOpen && (
                <ProfileEditModal {...props} onClose={() => setIsModalOpen(false)} />
            )}
        </>
    );
}
