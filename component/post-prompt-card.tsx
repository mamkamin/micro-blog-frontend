'use client'

import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";

export default function PostPromptCard() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  async function onSubmitHandler(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const postBody = formData.get('post-body');

    try {
      const response = await fetch('http://localhost:3000/api/v1/posts', {
        method: 'post',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        cache: 'no-store',
        body: JSON.stringify({
          body: postBody
        })
      });

      if (!response.ok) {
        setError((await response.json()).message);
        return;
      }
      form.reset();
      router.refresh();
    } catch (err) {
      console.log('[ERROR]', err);
      setError('Something went wrong. Try again later.');
    } finally {
      setIsSubmitting(false);
    }

  }
  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-5">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col"
      >
        <label htmlFor="post-body" className="text-base font-semibold">
          Share something
        </label>
        <textarea
          id="post-body"
          name="post-body"
          placeholder="What's on your mind?"
          rows={4}
          className="mt-3 w-full resize-none rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-neutral-400 dark:focus:ring-neutral-800"
        />
        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">Keep it short and thoughtful.</p>
          <button
            type="submit"
            className="rounded-lg bg-neutral-900 px-5 py-2 text-sm font-medium text-white transition hover:cursor-pointer hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus:ring-offset-neutral-900"
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}
    </section>
  );
}
