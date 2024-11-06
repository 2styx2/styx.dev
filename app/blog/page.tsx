import { BlogPosts } from 'app/components/posts'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}
export default function Page() {
  let allPosts = getBlogPosts();
  return (
    
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">blog</h1>
      <BlogPosts />
    </section>
  )
}

