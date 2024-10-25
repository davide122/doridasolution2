"use client";
import React, { useState, useEffect, useRef } from "react";
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
  const carouselRef = useRef(null); // Ref per il carosello

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/songs/normal");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPlaylists(data.map((album) => ({ ...album, loaded: false })));

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

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -220, behavior: 'smooth' }); // Scorri a sinistra
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 220, behavior: 'smooth' }); // Scorri a destra
  };

  return (
    <div className="playlist_carousel-container_v1 mt-2 mb-5">
      {/* Pulsanti per scorrere */}
      <button className="playlist_carousel-button prev" onClick={scrollLeft}>
        &#9664;
      </button>
      <div className="playlist_carousel-wrapper_v1 ms-3 shadow2 my-2" ref={carouselRef}>
        {playlists.map((playlist, index) => (
          <Link href={`/album/${playlist.album_id}`} key={playlist.album_id || index}>
            <div
              key={playlist.album_id || index}
              className="playlist_item-card_v1"
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
                  className="playlist_img-fluid_v1"
                />
              ) : (
                <SkeletonLoader />
              )}
            </div>
          </Link>
        ))}
      </div>
      <button className="playlist_carousel-button next" onClick={scrollRight}>
        &#9654;
      </button>
    </div>
  );
};

export default Playlist;
