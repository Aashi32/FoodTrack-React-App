import React, { useState, useEffect } from 'react';

function Tracking() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [speed, setSpeed] = useState(1);
  const [quote, setQuote] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [apiKey, setApiKey] = useState('knRZbeb9dB3Y2/Vsc5it4A==eMJxndCa4F07Gcxe');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    fetch(`https://api.api-ninjas.com/v1/quotes`, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
      },
    })
      .then(response => response.json())
      .then(data => setQuote(data[0].quote));

    return () => clearInterval(intervalId);
  }, [apiKey]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(`https://api.api-ninjas.com/v1/quotes`, {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
        },
      })
        .then(response => response.json())
        .then(data => setQuote(data[0].quote));
    }, 5000);

    return () => clearInterval(intervalId);
  }, [apiKey]);

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('speed', speed);
    setShareUrl(url.href);
  };

  return (
    <div className="tracking-container">
      <div className="tracking-overlay"></div>
      <div className="tracking-content">
        <div className="analog-clock">
          <svg width="200" height="200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="black" strokeWidth="5" />
            <line x1="100" y1="100" x2="100" y2="50" stroke="black" strokeWidth="5" transform={`rotate(${(currentTime.getHours() % 12) * 30} 100 100)`} />
            <line x1="100" y1="100" x2="100" y2="50" stroke="black" strokeWidth="5" transform={`rotate(${currentTime.getMinutes() * 6} 100 100)`} />
          </svg>
        </div>
        <div className="slider-container">
          <input type="range" min="0.1" max="5" value={speed} onChange={handleSpeedChange} />
          <span>Speed: {speed}x</span>
        </div>
        <button className="button" onClick={handleShare}>
          Share
        </button>
        <p className="quote">{quote}</p>
        {shareUrl && (
          <p>
            Share URL: <a href={shareUrl}>{shareUrl}</a>
          </p>
        )}
      </div>
    </div>
  );
}

export default Tracking;
