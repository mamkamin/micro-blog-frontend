import Header from "@/component/header";
import PostFeed from "@/component/post-feed";
import PostPromptCard from "@/component/post-prompt-card";
import { getLatestPosts } from "@/lib/data/posts";
import { getCurrentUser } from "@/lib/data/users";
import dayjs from "dayjs";

function formatPostDate(createdAt: string) {
  const date = dayjs(createdAt);
  const today = dayjs();
  const time = date.format("h:mm A");

  if (date.isSame(today, "day")) {
    return `Today at ${time}`;
  }

  if (date.isSame(today.subtract(1, "day"), "day")) {
    return `Yesterday at ${time}`;
  }

  if (date.isAfter(today.subtract(7, "day"), "day")) {
    return `${date.format("dddd")} at ${time}`;
  }

  return date.format("MMM D, YYYY [at] h:mm A");
}

export default async function Home() {
  const posts = (await getLatestPosts()) ?? [];
  const currentUser = await getCurrentUser();

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex flex-1 justify-center px-4 py-8 sm:px-6 sm:py-10">
        <section className="w-full max-w-2xl">
          <div className="mb-6">
            <p className="text-sm font-medium text-neutral-500">Your feed</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">What&apos;s new</h1>
          </div>
           <PostPromptCard />
           <PostFeed
             posts={posts.map((post: { id: string; username: string; body: string; created_at: string; updated_at: string }) => ({
               ...post,
               created_at: formatPostDate(post.created_at),
               isEdited: post.updated_at !== post.created_at,
             }))}
             currentUsername={currentUser?.username}
           />
        </section>
      </main>
    </div>
  );
}
