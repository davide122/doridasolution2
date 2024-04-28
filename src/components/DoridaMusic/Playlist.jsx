"use client"
import React, { useState, useEffect } from "react";
import "./Css/playlist.css";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Utilizza il gancio useRouter di Next.js
import Loader from "../Loader/Loader";

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter(); // Hook per utilizzare il router

 

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

  if (loading) return <Loader></Loader>;
  if (error) return <div>Error: {error}</div>;


  const handleClick = (albumId) => {
    // Naviga alla pagina dell'album con l'ID specificato
    router.push(`/album/${albumId}`); // Aggiorna questo percorso in base alla struttura delle tue pagine
  };


  return (
    
    <div>
      <div className="carousel-container mt-2 mb-5">
        <h3 className="text-white ms-md-4 ms-3 text-start">Scopri le nostre Playlist</h3>
        <div className="carousel ms-3 shadow2 ">
          {playlists.map((playlist) => (
            console.log(playlist.blurred_image),
            <div key={playlist.album_id} className="playlist-card" onClick={() => handleClick(playlist.album_id)}
            >
              {playlist.cover_url ? (
      <img src={playlist.cover_url} alt={playlist.title} className="img-fluid" />
    ) : null}


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