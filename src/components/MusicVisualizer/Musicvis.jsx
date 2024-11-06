"use client";

import { useState, useEffect, useMemo } from "react";
import { Container } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// Import your Playlist component
import Playlist from "../../components/DoridaMusic/Playlist"; // Adjust the import path as necessary

const Music = () => {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false); // State to track if device is mobile
  const router = useRouter();

  // Duplicate playlists for continuous scrolling
  const duplicatedPlaylists = useMemo(() => {
    return [...playlists, ...playlists, ...playlists, ...playlists, ...playlists, ...playlists];
  }, [playlists]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("/api/songs/normal");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        setError("Failed to fetch playlists: " + error.message);
      }
    };

    fetchPlaylists();
  }, []);

  // Effect to detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (error) return <div>Error: {error}</div>;

  const handleClick = (albumId) => {
    router.push(`/album/${albumId}`);
  };

  return (
    <div className="music-page d-flex flex-column justify-content-center align-items-center position-relative">
      {/* Video Background */}
      <video
        src="https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/video+for+dorida+music+page.mp4"
        loop
        muted
        autoPlay
        className="position-absolute w-100 h-100 video-bg"
        aria-hidden="true"
      ></video>
      <div className="overlay-shadow position-absolute w-100 h-100"></div>

      {/* Content */}
      <Container className="content-container text-white position-relative  py-5">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 mb-5 mb-md-0">
            <h1 className="Title text-white">
              Vuoi diventare un&apos;artista di<span className="textlill"> successo?</span>
            </h1>
            <Link href={"/music"} className="btn-glassmorphism btn-large text-decoration-none text-center w-100 ">
              Vai a Dorida Music
            </Link>
          </div>

          {/* Conditionally render based on isMobile */}
          <div className="col-12 col-md-6 d-flex justify-content-center">
            {isMobile ? (
              // Render the Playlist component on mobile
              <Playlist />
            ) : (
              // Render the two carousels on desktop
          
              <div className="carousel-wrapper ">
               
                {/* First Carousel - Scrolls Upwards */}
                <div className="carousel-container">
                  
                  <div className="carousel scroll-up">
                    
                    {duplicatedPlaylists.map((playlist, index) => (
                      <Link
                        href={`/album/${playlist.album_id}`}
                        key={`${playlist.album_id}-${index}`}
                      >
                        <div
                          className="playlist-card"
                          onClick={() =>
                            playlist.album_id && handleClick(playlist.album_id)
                          }
                        >
                          {playlist.cover_url ? (
                            <Image
                              src={playlist.cover_url}
                              alt={`${playlist.title} cover`}
                              width={200}
                              height={200}
                              className="img-fluid"
                            />
                          ) : (
                            <div className="loading-placeholder"></div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Second Carousel - Scrolls Downwards */}
                <div className="carousel-container sfasato">
                  <div className="carousel scroll-down">
                    {duplicatedPlaylists.map((playlist, index) => (
                      <Link
                        href={`/album/${playlist.album_id}`}
                        key={`${playlist.album_id}-${index}`}
                      >
                        <div
                          className="playlist-card"
                          onClick={() =>
                            playlist.album_id && handleClick(playlist.album_id)
                          }
                        >
                          {playlist.cover_url ? (
                            <Image
                              src={playlist.cover_url}
                              alt={`${playlist.title} cover`}
                              width={200}
                              height={200}
                              className="img-fluid"
                            />
                          ) : (
                            <div className="loading-placeholder"></div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Music;
