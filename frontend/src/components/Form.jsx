import React, { useState } from 'react';
import { encodeUrl } from '@utils/api';

export default function Form() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await encodeUrl(longUrl);
      setShortUrl(res.data.shortUrl);
    } catch (err) {
        console.log('FHJ',err)
      alert('Failed to shorten URL');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter a long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>

      {shortUrl && (
        <div>
          <p>Short URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}