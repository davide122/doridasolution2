"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AddSong() {
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [mp3File, setMp3File] = useState('');
  const [blurredImage, setBlurredImage] = useState('');
  const [originalImage, setOriginalImage] = useState('');
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSongs();
  }, []);

  async function fetchSongs() {
    try {
      const response = await fetch('/api/songs');
      if (!response.ok) throw new Error('Failed to fetch songs');
      const data = await response.json();
      setSongs(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch songs:', error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const method = selectedSongId ? 'PUT' : 'POST';
    const url = selectedSongId ? `/api/songs/${selectedSongId}` : '/api/songs';
    const response = await fetch(url, {
      method: method,
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
      alert('Operation successful!');
      fetchSongs(); // Reload songs list
    } else {
      const errorData = await response.json();
      alert(`Failed to perform operation: ${errorData.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/songs/${id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the song');
      }
  
      const result = await response.json();
      alert(result.message);
      fetchSongs(); // Reload songs list
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to delete song: ${error.message}`);
    }
  };
  

  const handleEdit = (song) => {
    setSelectedSongId(song.id);
    setSongName(song.song_name);
    setArtistName(song.artist_name);
    setMp3File(song.mp3_file);
    setBlurredImage(song.blurred_image);
    setOriginalImage(song.original_image);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="mb-3">
     
          <div className="mb-3">
            <input type="text" className="form-control" value={songName} onChange={(e) => setSongName(e.target.value)} placeholder="Song Name" required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" value={artistName} onChange={(e) => setArtistName(e.target.value)} placeholder="Artist Name" required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" value={mp3File} onChange={(e) => setMp3File(e.target.value)} placeholder="MP3 File URL" required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" value={blurredImage} onChange={(e) => setBlurredImage(e.target.value)} placeholder="Blurred Image URL" required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" value={originalImage} onChange={(e) => setOriginalImage(e.target.value)} placeholder="Original Image URL" required />
          </div>
          <button type="submit" className="btn btn-primary">{selectedSongId ? 'Update Song' : 'Add Song'}</button>
      </form>

      {loading ? <p>Loading...</p> : songs.map((song) => (
        <div key={song.id} className="card mb-3">
          <div className="card-body ">
            <div className='d-flex justify-content-between align-items-center'>
            <img src={song.original_image} alt="foto artista" width={200} height={200} />
            <h5 className="card-title">{song.song_name}</h5>

            </div>
            <button onClick={() => handleEdit(song)} className="btn btn-secondary">Edit</button>
            <button onClick={() => handleDelete(song.id)} className="btn btn-danger">Delete</button>
            <audio controls>
                <source src={song.mp3_file} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      ))}
    </div>
  );
}
