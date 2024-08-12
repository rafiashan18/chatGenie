// components/forms/WebsiteUrlInput.jsx
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const demoUrls = [
  { name: 'America', url: 'https://en.wikipedia.org/wiki/United_States' },
  { name: 'Italian Cuisine', url: 'https://en.wikipedia.org/wiki/Italian_cuisine' },
  { name: 'Asia', url: 'https://en.wikipedia.org/wiki/Asia' },
];

export default function WebsiteUrlInput() {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      router.push(`/apps/${encodeURIComponent(url)}`);
    }
  };

  const handleDemoClick = (demoUrl) => {
    router.push(`/apps/${encodeURIComponent(demoUrl)}`);
  };

  return (
  <div style={{Width:"100vw", minHeight:"100vh", justifyContent:"center" , alignItems:"center" }} className='flex flex-col'>
      <div className="max-w-md mx-auto  ">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex items-center border-b border-gray-300 py-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            required
          />
          <button
            type="submit"
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
          >
            Chat
          </button>
        </div>
      </form>
      <div className="flex flex-wrap gap-2">
        {demoUrls.map((demo, index) => (
          <button
            key={index}
            onClick={() => handleDemoClick(demo.url)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-full text-sm"
          >
            {demo.name}
          </button>
        ))}
      </div>
    </div>
  </div>
  );
}