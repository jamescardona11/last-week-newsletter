import { Readability } from '@mozilla/readability'
import { JSDOM } from 'jsdom'

export const prerender = true

import { OPENAI_API_KEY } from '@/lib/data/remote/remote-constants'

import OpenAI from 'openai'

export async function GET() {
  console.log('GET /api/summary')
  return new Response(
    JSON.stringify({
      message: `This is my static endpoint`
    })
  )
}

export async function POST({ request }) {
  console.log('POST /api/summary')
  const data = await request.formData()
  const urlData = data.get('url')
  const onlylinks = data.get('onlylinks') !== null

  const urlRegex = /(https?:\/\/[^\s]+)/g
  const urls = urlData.match(urlRegex)

  if (!urls) {
    return new Response(
      JSON.stringify({
        message: `No URL found`
      })
    )
  }

  const responses = []

  for (const url of urls) {
    if (!url) continue

    if (url.includes('youtube')) {
      const response = await _youtubeLink(url)
      responses.push(response)
    } else {
      const response = await _chatgptSymmary(url, onlylinks)
      responses.push(response)
    }
  }

  return new Response(
    JSON.stringify({
      links: responses
    })
  )
}

async function _youtubeLink(url: string) {
  const response = await fetch(
    `https://noembed.com/embed?dataType=json&url=${url}`
  ).then(res => res.json())

  console.log(response)

  return {
    title: response.title,
    url,
    summary: ''
  }
}

async function _chatgptSymmary(url: string, onlylinks: boolean) {
  const res = await fetch(url)
  const text = await res.text()

  const doc = new JSDOM(text, { url })
  const reader = new Readability(doc.window.document)
  const parse = reader.parse()

  console.log(parse?.title)

  var answer = ''

  if (!onlylinks) {
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY
    })
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Give the summary for the next url; maximum 30 words.'
        },
        {
          role: 'user',
          content: url
        }
      ],
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 1
    })
    answer = response.choices[0].message.content ?? answer
  }

  return {
    title: parse?.title,
    url,
    summary: answer
  }
}
