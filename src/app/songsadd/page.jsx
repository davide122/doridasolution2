"use client"
import { useEffect, useState } from 'react';

export default function AddSong() {
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [mp3File, setMp3File] = useState('');
  const [blurredImage, setBlurredImage] = useState('');
  const [originalImage, setOriginalImage] = useState('');
  const [songNameError, setSongNameError] = useState('');
const[songs, setSongs] = useState([]);
 const [loading, setLoading] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/songs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        song_name: songName,
        artist_name: artistName,
        mp3_file: mp3File,
        blurred_image: blurredImage,
        original_image: originalImage
      }),
    });

    if (response.ok) {
      alert('Song added successfully!');
      // Reset form or handle accordingly
    } else {
      const errorData = await response.json();
      alert(`Failed to add song: ${errorData.message}`);
    }
  };



  const fetchsongs = async () => {
    try {
      const response = await fetch('/api/songs');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSongs(data); // Assumi che il JSON ritornato sia un array di utenti
      setSongNameError('');
    } catch (error) {
      setError('Failed to fetch users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchsongs();
  }, []);

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input type="text" value={songName} onChange={(e) => setSongName(e.target.value)} placeholder="Song Name" required />
      <input type="text" value={artistName} onChange={(e) => setArtistName(e.target.value)} placeholder="Artist Name" required />
      <input type="text" value={mp3File} onChange={(e) => setMp3File(e.target.value)} placeholder="MP3 File URL" required />
      <input type="text" value={blurredImage} onChange={(e) => setBlurredImage(e.target.value)} placeholder="Blurred Image URL" required />
      <input type="text" value={originalImage} onChange={(e) => setOriginalImage(e.target.value)} placeholder="Original Image URL" required />
      <button type="submit">Add Song</button>
    </form>

    {songs.map((song) => (
      <li key={song.id}>
   <h1>{song.song_name}</h1>
      </li>
    ))}

    </div>
  );
}
