import { BlogPosts } from 'app/components/posts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { Redis } from '@upstash/redis';
import { formatDate, getBlogPosts } from 'app/blog/utils'

const redis = Redis.fromEnv();

function ProjectSection({
  title,
  items,
}: {
  title: string;
  items: {
    name: string;
    link: string;
    position: string;
    description: string;
  }[];
}) {
  return (
    <section className="text-left">
      <h3 className="mb-8 text-xl font-semibold">{title}</h3>

      {items.map((item, index) => (
        <div key={index} className="mb-8">
          <a
            href={item.link}
            target="_blank"
            className="font-semibold underline decoration-neutral-400 decoration-[0.1em] underline-offset-2 dark:decoration-neutral-600"
          >
            {item.name}
          </a>

          <p className="mt-3">{item.position}</p>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300">
            {item.description}
          </p>
        </div>
      ))}
    </section>
  );
}


export default async function Page() {
  let allPosts = getBlogPosts();
  const views = (
    await redis.mget<number[]>(
      ...allPosts.map((post) => ['pageviews', 'posts', post.slug].join(":"))
    )
  )

  const projectItems = [
    {
      name: "xd",
      link: "https://github.com/2styx2/xd",
      position: "creator and maintainer",
      description:
        "simple directory navigation tool",
    },
    {
      name: "hugin",
      link: "https://github.com/2styx2/hugin",
      position: "creator and maintainer",
      description:
        "personal os with with the ia32 architecture",
    },
  ]

  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">
        wesley matthews
      </h1>
      <div className="mb-6 flex flex-col gap-2">
      <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300" >
        <FontAwesomeIcon icon={faLocationDot} /> 
        <p className="text-zinc-300">belmont, nc</p>
      </div>
      </div>
      <p className="mb-4 text-zinc-300">
        {`i'm a 20 y/o cs student at nc state. 
        i love building dev tools and solving problems. i enjoy how languages are designed
        and i live in the terminal. if i'm not at my computer, 
        i'm probably playing with my dogs, watching tv shows or planning my next project.`}
      </p>

      <div className="my-12 grid grid-cols-1 gap-12 md:grid-cols-2">
        <ProjectSection title="projects" items={projectItems} />
      </div>
    </section>
  )
}
