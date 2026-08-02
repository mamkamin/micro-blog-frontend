'use client'

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface PostCardProps {
  sender: string;
  postId: string;
  body: string;
  created_at: string;
  isEdited: boolean;
  isOwner: boolean;
  onError: (message: string) => void;
}

export default function PostCard(props: PostCardProps) {
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const editDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isEditDialogOpen) {
      editDialogRef.current?.showModal();
    }
  }, [isEditDialogOpen]);

  async function onEditHandler(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(`http://localhost:3000/api/v1/posts/${props.postId}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify({
          body: formData.get(`post-body-${props.postId}`)
        })
      });

      if (!response.ok) {
        throw new Error((await response.json()).message);
      }

      router.refresh();
    } catch (err) {
      console.log('[ERROR]', err);
      if (err instanceof Error) {
        props.onError(`Error: ${err.message}`);
      } else {
        props.onError("Something went wrong. Try again later");
      }
    } finally {
      setIsSubmitting(false);
      setEditDialogOpen(false);
    }
  }

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
            <div className="flex gap-2 text-sm text-neutral-500">
              <p>{props.created_at}</p>
              {props.isEdited && <p>Edited</p>}
            </div>
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
                  type="button"
                  onClick={() => {
                    setEditDialogOpen(true);
                    setMenuOpen(false);
                  }}
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
      {isEditDialogOpen && (
        <dialog
          ref={editDialogRef}
          onClose={() => setEditDialogOpen(false)}
          className="m-auto w-full max-w-lg rounded-lg p-5 backdrop:bg-black/30"
        >
          <form
            onSubmit={onEditHandler}
            className="space-y-4"
          >
            <div>
              <h2 className="font-semibold">Edit post</h2>
              <label className="sr-only">
                Post body
              </label>
              <textarea
                name={`post-body-${props.postId}`}
                defaultValue={props.body}
                rows={4}
                className="mt-3 w-full rounded border p-2"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => editDialogRef.current?.close()}
                className="rounded border px-3 py-1 hover:cursor-pointer hover:text-white hover:bg-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="border rounded px-3 py-1 hover:cursor-pointer hover:text-white hover:bg-black"
              >
                Save
              </button>
            </div>
          </form>
        </dialog>
      )}
    </article>
  );
}
