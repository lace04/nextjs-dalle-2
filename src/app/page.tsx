'use client';

import { PulseLoader } from 'react-spinners';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className='container mx-auto justify-center items-center'>
      <div className='flex flex-col items-center p-4'>
        <h1 className='text-4xl mt-3 mb-3 flex rounded-lg'>
          Nextjs with Dalle-2
        </h1>
        <form
          className='flex gap-x-2 w-full'
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);

            try {
              const res = await fetch('/api/generate', {
                method: 'POST',
                body: JSON.stringify({ prompt }),
                headers: {
                  'Content-type': 'application/json',
                },
              });

              const data = await res.json();
              console.log(data);
              setImg(data.url);
            } catch (error) {
              console.log(error);
            }
            setPrompt('');
            setLoading(false);
          }}
        >
          <input
            type='text'
            placeholder='Write to prompt'
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            className='border-2 border-gray-500 p-2 rounded-md w-full mb-6 text-white bg-gray-800'
          />
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-8'
            disabled={loading}
          >
            {loading ? 'loading...' : 'Generate'}
          </button>
        </form>
        {loading && <PulseLoader color='gray' />}
        {img && <img src={img} alt='image generated' />}
      </div>
    </div>
  );
}
