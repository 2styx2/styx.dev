import { BlogPosts } from "app/components/posts";
import { formatDate, getBlogPosts } from "app/blog/utils";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};
export default async function Page() {
  let allPosts = getBlogPosts();
  const views = await redis.mget<number[]>(
    ...allPosts.map((post) => ["pageviews", "posts", post.slug].join(":")),
  );
  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">coming soon</h1>
      {/*<h1 className="font-semibold text-2xl mb-8 tracking-tighter">blog</h1>
      <BlogPosts views={views} />*/}
    </section>
  );
}
