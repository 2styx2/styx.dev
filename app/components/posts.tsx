import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { track } from '@vercel/analytics';
import { Suspense } from "react";
import { ViewCounter } from "app/components/view-counter";
import { redis } from "app/lib/redis";


export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
 
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                {formatDate(post.metadata.publishedAt, false).toLowerCase()}
              </p>
              <Suspense>
                  {" • "}
                  <Views slug={post.slug} />
                </Suspense>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title.toLowerCase()}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}

async function Views({ slug }: { slug: string }) {
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  const allViews = (await redis.get("views")) as {
    slug: string;
    views: number;
  }[];

  return <ViewCounter slug={slug} allViews={allViews} />;
}
