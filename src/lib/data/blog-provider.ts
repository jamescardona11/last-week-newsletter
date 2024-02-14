import type { Post } from '@/lib/types/post.type'
import type { DataContent } from '@/lib/types/data/content.type'

import { getHeadings as getHeadingsFromNotion } from '@lib/core/notion-core/notion-headings'
import { getPostBlocksById, getPostsFromNotion } from './remote/post'

/// Get all posts data
/// This function is used to get all posts data from from notion
/// Review the providers.config.ts file to see the configuration
export async function getPostsData(): Promise<Post[]> {
  return getRemotePosts()
}

/// Get post content
/// This function is used to get post content from notion
/// Review the providers.config.ts file to see the configuration
/// if the post has content, this function will return the blocks or the Content component
export async function getBlogContent(post: Post): Promise<DataContent> {
  return await getBlocksPostData(post.id)
}

/// Get blocks from notion
async function getBlocksPostData(id: string): Promise<DataContent> {
  const blocksResponse = await getPostBlocksById(id)
  if (!blocksResponse.ok) {
    console.log(blocksResponse.error)
  }

  const blocks = blocksResponse.ok ? blocksResponse.data : []
  const headings = getHeadingsFromNotion(blocks)

  return {
    blocks: blocks,
    Content: null,
    headings: headings
  } as DataContent
}

async function getRemotePosts() {
  const posts = await getPostsFromNotion()

  if (!posts.ok) {
    console.log(posts.error)
  }

  return posts.ok ? posts.data : []
}
