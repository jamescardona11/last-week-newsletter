import type { GPTResponse } from '@/lib/types/gpt-reponse.type'
import { type FormEvent, useState } from 'react'

export default function Form() {
  const [dataLink, setDataLink] = useState<GPTResponse[]>([])
  const [formData, setFormData] = useState({
    textAreaValue: '' // State to control the value of the textarea
  })

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
    setFormData({
      ...formData,
      textAreaValue: event.target.value // Update the value of the textarea in the state
    })
  }

  async function sendToNotion() {
    const response = await fetch('/api/notion', {
      method: 'POST',
      body: JSON.stringify({
        links: dataLink
      })
    })

    const data = await response.json()
    console.log(data)
  }

  const reset = () => {
    setDataLink([])
    setFormData({
      textAreaValue: ''
    })
  }

  return (
    <div className='flex flex-col space-y-2'>
      <form onSubmit={submit} className='flex flex-col'>
        <label htmlFor='url'>
          <textarea
            id='url'
            name='url'
            className='flex h-20 w-full '
            value={formData.textAreaValue} // Bind the value of the textarea to the state
            onChange={handleTextAreaChange} // Handle changes in the textarea
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
          <form onSubmit={sendToNotion} className='flex flex-col items-center'>
            <label>
              PAGE ID
              <input type='text' id='name' name='name' required />
            </label>
            <div className='flex mt-4 gap-2 justify-center items-center'>
              <input type='radio' id='onlylinks' name='onlylinks' />
              read
              <input type='radio' id='onlylinks' name='onlylinks' />
              tutorial
              <input type='radio' id='onlylinks' name='onlylinks' />
              videos
              <input type='radio' id='onlylinks' name='onlylinks' />
              showcase
            </div>

            <div className='flex mt-4 gap-2 justify-center items-center'>
              <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
                Send to Notion
              </button>
              <button
                className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded'
                onClick={sendToNotion}
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
