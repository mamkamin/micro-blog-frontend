'use client'

import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface PostCardProps {
  sender: string;
  postId: string;
  body: string;
  created_at: string;
  isOwner: boolean;
  onError: (message: string) => void;
}

export default function PostCard(props: PostCardProps) {
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  async function onDeleteHandler(event: React.MouseEvent) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:3000/api/v1/posts/${props.postId}`, {
        method: 'delete',
        credentials: 'include',
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error((await response.json()).message);
      }

      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        props.onError(`Error: ${err.message}`);
      } else {
        props.onError("Something went wrong. Try again later");
      }
    } finally {
      setIsSubmitting(false);
      setMenuOpen(false);
    }
  }

  return (
    <article className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
          >
            {props.sender.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold">{props.sender}</p>
            <p className="text-sm text-neutral-500">{props.created_at}</p>
          </div>
        </div>
        {props.isOwner && (
          <div
            className="relative flex self-center"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
            onFocusCapture={() => setMenuOpen(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setMenuOpen(false);
              }
            }}
          >
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Post actions"
              aria-expanded={isMenuOpen}
              className="self-center rounded-full p-2 hover:bg-gray-300"
            >
              <img
                src="/kebab-menu.svg"
                alt=""
                height={20}
                width={20}
              />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-8 z-10 flex flex-col space-y-1 rounded-lg border bg-white p-2 shadow-lg dark:bg-neutral-900">
                <button
                  className="px-2 rounded-sm hover:border-white hover:border hover:cursor-pointer hover:text-white hover:bg-black">
                  Edit
                </button>
                <button
                  onClick={onDeleteHandler}
                  disabled={isSubmitting}
                  className="px-2 rounded-sm hover:border hover:cursor-pointer hover:text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <p className="mt-4 whitespace-pre-wrap leading-7 text-neutral-700 dark:text-neutral-300">
        {props.body}
      </p>
    </article>
  );
}
