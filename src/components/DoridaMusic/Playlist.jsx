"use client"
import React, { useState, useEffect } from "react";
import "./Css/playlist.css";
import Image from "next/image";

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('/api/songs/normal');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPlaylists(data); // Assumi che il JSON ritornato sia un array di playlist
        setError('');
      } catch (error) {
        setError('Failed to fetch playlists: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    
    <div>
      <div className="carousel-container mt-2 mb-5">
        <h3 className="text-white ms-md-4 ms-3 text-start">Scopri le nostre Playlist</h3>
        <div className="carousel ms-3 shadow2 ">
          {playlists.map((playlist) => (
            console.log(playlist.blurred_image),
            <div key={playlist.id} className="playlist-card">
              {playlist.blurred_image ? (
      <img src={playlist.blurred_image.trim()} alt={playlist.artist_name} className="img-fluid" />
    ) : null}

              {console.log(playlist.originalImage)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;

// song_name: songName,
// artist_name: artistName,
// mp3_file: mp3File,
// blurred_image: blurredImage,
// original_image: originalImage