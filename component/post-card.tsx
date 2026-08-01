interface PostCardProps {
    sender: string;
    body: string;
    created_at: string;
}

export default function PostCard(props: PostCardProps) {
  return (
    <article className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
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
      <p className="mt-4 whitespace-pre-wrap leading-7 text-neutral-700 dark:text-neutral-300">
        {props.body}
      </p>
    </article>
  );
}
