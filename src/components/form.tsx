import type { GPTResponse } from '@/lib/types/gpt-reponse.type'
import { type FormEvent, useState } from 'react'

export default function Form() {
  const [dataLink, setDataLink] = useState<GPTResponse[]>([])
  const [linkFormData, setLinkFormData] = useState('')
  const [notionFormData, setNotionFormData] = useState('')
  const [radioFormData, setRadioFormData] = useState('')

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('submit')
    const formData = new FormData(e.target as HTMLFormElement)
    const response = await fetch('/api/summary', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()

    if (data.links) {
      console.log(data.links)
      for (const link of data.links) {
        setDataLink([...dataLink, link as GPTResponse])
      }
    }
  }

  const handleTextAreaChange = event => {
    setLinkFormData(event.target.value)
  }

  const handleNotionPageChange = event => {
    setNotionFormData(event.target.value)
  }

  const handleRadioButtonChange = radioValue => {
    setRadioFormData(radioValue)
  }

  async function sendToNotion() {
    console.log('sendToNotion')

    const response = await fetch('/api/notion', {
      method: 'POST',
      body: JSON.stringify({
        links: dataLink,
        radio: radioFormData,
        pageId: notionFormData
      })
    })

    const data = await response.json()
    console.log(data)
  }

  async function notionFooter() {
    console.log('notionFooter')

    const response = await fetch('/api/notion', {
      method: 'PATCH',
      body: JSON.stringify({
        pageId: notionFormData
      })
    })

    const data = await response.json()
    console.log(data)
  }

  const reset = () => {
    setDataLink([])
    setLinkFormData('')
  }

  return (
    <div className='flex flex-col space-y-2'>
      <form onSubmit={submit} className='flex flex-col'>
        <label htmlFor='url'>
          <textarea
            id='url'
            name='url'
            className='flex h-20 w-full '
            value={linkFormData}
            onChange={handleTextAreaChange}
          />
        </label>

        <div className='flex mt-4 gap-2 justify-center items-center'>
          <input type='checkbox' id='onlylinks' name='onlylinks' />
          onlylinks
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Summary
          </button>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </form>
      <div>
        <ul>
          {dataLink.map((link, index) => (
            <li key={index}>{link.title}</li>
          ))}
        </ul>

        <div>
          <form className='flex flex-col items-center'>
            <label>
              PAGE ID
              <input
                type='text'
                id='name'
                name='name'
                value={notionFormData}
                onChange={handleNotionPageChange}
              />
            </label>
            <div className='flex mt-4 gap-2 justify-center items-center'>
              <input
                type='radio'
                id='read'
                name='read'
                value='read'
                checked={radioFormData === 'read'}
                onChange={() => {
                  handleRadioButtonChange('read')
                }}
              />
              read
              <input
                type='radio'
                id='tutorial'
                name='tutorial'
                value='tutorial'
                checked={radioFormData === 'tutorial'}
                onChange={() => {
                  handleRadioButtonChange('tutorial')
                }}
              />
              tutorial
              <input
                type='radio'
                id='videos'
                name='videos'
                value='videos'
                checked={radioFormData === 'videos'}
                onChange={() => {
                  handleRadioButtonChange('videos')
                }}
              />
              videos
              <input
                type='radio'
                id='showcase'
                name='showcase'
                value='showcase'
                checked={radioFormData === 'showcase'}
                onChange={() => {
                  handleRadioButtonChange('showcase')
                }}
              />
              showcase
            </div>

            <div className='flex mt-4 gap-2 justify-center items-center'>
              <button
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                onClick={sendToNotion}
              >
                Send to Notion
              </button>
              <button
                className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded'
                onClick={notionFooter}
              >
                Notion footer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
