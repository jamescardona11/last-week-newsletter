import type { GPTResponse } from '@/lib/types/gpt-reponse.type'
import { type FormEvent, useState } from 'react'

export default function Form() {
  const [responseMessage, setResponseMessage] = useState<GPTResponse[]>([])

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('submit')
    const formData = new FormData(e.target as HTMLFormElement)
    const response = await fetch('/api/summary', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()

    if (data.message) {
      console.log(data.message)
      for (const message of data.message) {
        setResponseMessage([...responseMessage, message as GPTResponse])
      }
    }
  }

  return (
    <div className='flex flex-col space-y-2'>
      <form onSubmit={submit} className='flex flex-col'>
        <label htmlFor='url'>
          <textarea
            // type='text'
            id='url'
            name='url'
            required
            className='flex h-20 w-full '
          />
        </label>

        <div className='flex mt-4 gap-2 justify-center items-center'>
          <input type='checkbox' id='onlylinks' name='onlylinks' />
          onlylinks
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Summary
          </button>
        </div>
      </form>
      <div>
        <ul>
          {responseMessage.map((message, index) => (
            <li key={index}>{message.title}</li>
          ))}
        </ul>

        {responseMessage.length > 0 && (
          <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
            Send to Notion
          </button>
        )}
      </div>
    </div>
  )
}
