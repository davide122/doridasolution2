"use client";
import React, { useState, useEffect } from "react";
import "./Css/playlist.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SkeletonLoader from "../Loader/SkeletonLoader/SkeletonLoader";
import Link from "next/link";

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/songs/normal");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Simula un caricamento progressivo per ogni album
        setPlaylists(data.map((album) => ({ ...album, loaded: false })));

        // Simula il completamento del caricamento per ciascun album
        setTimeout(() => {
          setPlaylists(data.map((album) => ({ ...album, loaded: true })));
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError("Failed to fetch playlists: " + error.message);
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);
  

  if (error) return <div>Error: {error}</div>;

  const handleClick = (albumId) => {
    router.push(`/album/${albumId}`);
  };

  return (
    <div>
      <div className="carousel-container mt-2 mb-5">
       
        <div className="carousel ms-3 shadow2 my-2">
          {playlists.map((playlist, index) => (
<Link href={`/album/${playlist.album_id}`} key={playlist.album_id || index}>
            <div
              key={playlist.album_id || index}
              className="playlist-card"
              onClick={() =>
                playlist.album_id && handleClick(playlist.album_id)
              }
            >
              {playlist.loaded && playlist.cover_url ? (
                <Image
                  src={playlist.cover_url}
                  alt={`${playlist.title} cover`}
                  width={200}
                  height={200}
                  className="img-fluid"
                />
              ) : (
                <SkeletonLoader />
              )}
            </div>
</Link>

          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
