import { slug as slugger } from 'github-slugger'

import type {
  BlockObjectResponse,
  PartialBlockObjectResponse
} from '@notionhq/client/build/src/api-endpoints'

import { NOTION_BLOG_DB as NOTION_POST_DB } from '@/lib/data/remote/remote-constants'
import { notionClient } from '@/lib/core/notion-core/notion-client'
import { type NBlogPostRow } from '@/lib/core/notion-core/notion-response-types'
import { type Post } from '@/lib/types/post.type'

import {
  createFailureResponse,
  createSuccessResponse
} from '@/lib/core/api_response'

import { mapNotionBlocks } from '@/lib/core/notion-core/notion-map-blocks'

const notionDatabaseId = NOTION_POST_DB

/// Get all blog posts
export async function getPostsFromNotion(limit?: number) {
  console.log('GET /api/posts')

  const query = await notionClient.getDatabase(notionDatabaseId, {
    size: limit ?? 100,
    sorts: [
      {
        property: 'Date',
        direction: 'descending'
      }
    ]
  })

  if (!query.ok) {
    console.error(query.error)
    return query
  }

  const rows = query.data.results.map(res => {
    // @ts-expect-error
    const p = res.properties as NBlogPostRow
    p.id = res.id

    return p
  })

  const blogPost = rows.map(row => {
    const title = row.Name.title[0].text.content
    const slug = slugger(title)

    return {
      id: row.id,
      slug: slug,
      title: `Last issue ${title}`,
      date: new Date(row.Date?.date.start)
    } as Post
  })

  return createSuccessResponse(blogPost)
}

/// Get a blog post by id
export async function getPostBlocksById(pageId: string) {
  console.log(`GET /api/post/${pageId}`)

  let content: Array<PartialBlockObjectResponse | BlockObjectResponse> = []
  let nextCursor
  let query

  do {
    query = await notionClient.getPageBlocks(pageId, nextCursor)

    if (!query.ok) {
      console.error(query.error)
      break
    }

    content = [...content, ...query.data.results]
  } while (query.data.hasMore)

  if (content.length === 0) {
    return createFailureResponse(
      `No blocks found with id: ${pageId}`,
      'NOT_FOUND'
    )
  }

  return createSuccessResponse(mapNotionBlocks(content))
}
