import { BlogPosts } from 'app/components/posts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
export default function Page() {
  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">
        wesley matthews
      </h1>
      <div className="flex items-center gap-3" >
      <FontAwesomeIcon icon={faLocationDot} /> 
      <p>belmont, nc</p>
      </div>
      <p className="mb-4">
        {`i'm a 20 y/o cs student at nc state. 
        i love building dev tools and solving problems. i enjoy how languages are designed
        and i live in the terminal. if i'm not at my computer, 
        i'm probably playing with my dogs, watching tv shows or planning my next project.`}
      </p>

      <h3 className="mb-2 text-xl font-semibold tracking-tighter">
        blog posts
      </h3>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
