"use client";

import { useState } from "react";
import PostCard from "./post-card";
import Toast from "./toast";

interface Post {
  id: string;
  username: string;
  body: string;
  created_at: string;
}

interface PostFeedProps {
  posts: Post[];
  currentUsername?: string;
}

export default function PostFeed({ posts, currentUsername }: PostFeedProps) {
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <div className="mt-6 space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            sender={post.username}
            postId={post.id}
            body={post.body}
            created_at={post.created_at}
            isOwner={post.username === currentUsername}
            onError={setError}
          />
        ))}
      </div>
      <Toast message={error} onClose={() => setError(null)} />
    </>
  );
}
