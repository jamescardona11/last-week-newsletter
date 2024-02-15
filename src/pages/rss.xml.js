import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { siteMetadata } from '@/site-metadata'
import { getPostsData } from '@/lib/data/posts-provider'

const { title, description } = siteMetadata

export async function GET(context) {
  const posts = await getPostsData()
  return rss({
    title,
    description,
    site: context.site,
    items: posts.map(({ slug, title, date, }) => ({
      title,
      pubDate: date,
      link: `/posts/${slug}/`
    }))
  })
}
