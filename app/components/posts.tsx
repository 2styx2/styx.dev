import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { Suspense } from "react";


export function BlogPosts({views}: {views: any}) {
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
            <div className="flex w-full flex-col space-y-3">
              <p className="text-lg font-medium group-hover:underline group-hover:decoration-neutral-400 group-hover:underline-offset-4 group-hover:dark:decoration-neutral-600">
                {post.metadata.title.toLowerCase()}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDate(post.metadata.publishedAt, false).toLowerCase()}
                  <Suspense>
                  {" • "}
                  <span className="text-sm text-neutral-600 dark:text-neutral-400 content-end">{views} views</span>
                </Suspense>
              </p>
              </div>
          </Link>
        ))}
    </div>
  )
}

