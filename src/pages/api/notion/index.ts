import { Client } from '@notionhq/client'

export const prerender = true

import { NOTION_N_ID, NOTION_SECRET } from '@/lib/data/remote/remote-constants'

export async function GET() {
  console.log('GET /api/notion')
  return new Response(
    JSON.stringify({
      message: `This is my static endpoint`
    })
  )
}

export async function POST({ request }) {
  console.log('POST /api/notion')

  const body = await request.json()

  const children = []

  for (const dataLink of body.links) {
    console.log(dataLink)
    const richText = []

    const link = {
      type: 'text',
      text: {
        content: dataLink.title,
        link: {
          url: dataLink.url
        }
      }
    }

    richText.push(link)

    if (dataLink.summary && dataLink.summary.length > 0) {
      richText.push({
        type: 'text',
        text: {
          content: '\n'
        }
      })

      richText.push({
        type: 'text',
        text: {
          content: dataLink.summary
        }
      })
    }

    const c = {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: richText
      }
    }

    children.push(c)
  }

  const notion = new Client({ auth: NOTION_SECRET })

  // @ts-ignore
  const responseNotion = await notion.blocks.children.append({
    block_id: NOTION_N_ID,
    children
  })
  console.log(responseNotion)
  return new Response(
    JSON.stringify({
      message: `This is my static endpoint`
    })
  )
}
