import { Client } from '@notionhq/client'

export const prerender = false

import { NOTION_N_ID, NOTION_SECRET } from '@/lib/data/remote/remote-constants'

export async function GET() {
  console.log('GET /api/notion')
  return new Response(
    JSON.stringify({
      message: `This is my static endpoint`
    })
  )
}

// @ts-ignore
export async function POST({ request }) {
  console.log('POST /api/notion')

  const body = await request.json()
  console.log(body)

  const blockId =
    body.pageId && body.pageId.length > 0 ? body.pageId : NOTION_N_ID
  const children = []

  if (body.radio === 'read') {
    const title = {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: 'To read 📖'
            }
          }
        ]
      }
    }

    children.push(title)
  } else if (body.radio === 'tutorial') {
    const title = {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: 'Tutorials 💻'
            }
          }
        ]
      }
    }

    children.push(title)
  } else if (body.radio === 'showcase') {
    const title = {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: 'Showcases 🕹️'
            }
          }
        ]
      }
    }

    children.push(title)
  } else if (body.radio === 'videos') {
    const title = {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: 'Videos 🎥'
            }
          }
        ]
      }
    }

    children.push(title)
  }

  // children.push({
  //   object: 'block',
  //   type: 'paragraph',
  //   paragraph: {
  //     rich_text: []
  //   }
  // })

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

  if (children.length !== 0) {
    const notion = new Client({ auth: NOTION_SECRET })

    const k = {
      block_id: blockId,
      children
    }
    // @ts-ignore
    const responseNotion = await notion.blocks.children.append(k)
    console.log(responseNotion)
    return new Response(
      JSON.stringify({
        message: `OK`
      })
    )
  }

  return new Response(
    JSON.stringify({
      message: 'Error'
    })
  )
}

// @ts-ignore
export async function PATCH({ request }) {
  console.log('PATCH /api/notion')

  const body = await request.json()
  console.log(body)

  const blockId =
    body.pageId && body.pageId.length > 0 ? body.pageId : NOTION_N_ID

  const children = []

  const suggestALink = {
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: 'Suggest a '
          }
        },
        {
          type: 'text',
          text: {
            content: 'link'
          },
          annotations: {
            bold: true
          }
        },
        {
          type: 'text',
          text: {
            content: ' for the upcoming weekly or '
          }
        },
        {
          type: 'text',
          text: {
            content: 'feedback'
          },
          annotations: {
            bold: true
          }
        },
        {
          type: 'text',
          text: {
            content: ' is more than welcome!'
          }
        }
      ]
    }
  }

  children.push(suggestALink)
  children.push({
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: []
    }
  })

  const thanks = {
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [
        {
          type: 'text',
          text: {
            content:
              'Big thanks for being part of our crew! If you liked our weekly news blast, follow us for more cool updates and exclusive stuff. Hey, why not shoot the newsletter to your friends and work buddies?'
          }
        },
        {
          type: 'text',
          text: {
            content: '\n'
          }
        },
        {
          type: 'text',
          text: {
            content: 'Catch you next week!'
          }
        }
      ]
    }
  }

  children.push(thanks)
  children.push({
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: []
    }
  })
  children.push({
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: []
    }
  })

  children.push({
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: 'Stay awesome,'
          }
        }
      ]
    }
  })

  children.push({
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: 'James Cardona'
          }
        }
      ]
    }
  })

  children.push({
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: 'LinkedIn & Github: @jamescardona11'
          }
        }
      ]
    }
  })

  if (children.length !== 0) {
    const notion = new Client({ auth: NOTION_SECRET })

    const k = {
      block_id: blockId,
      children
    }

    // @ts-ignore
    const responseNotion = await notion.blocks.children.append(k)
    console.log(responseNotion)
    return new Response(
      JSON.stringify({
        message: `OK`
      })
    )
  }

  return new Response(
    JSON.stringify({
      message: 'Error'
    })
  )
}
