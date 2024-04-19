"use client"
import React, { useRef, useEffect, useState } from 'react';
import useViewportVisibility from '../Hook/useViewportVisibility';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'; // Importa le icone da react-icons

const VideoPresentazione = () => {
  const videoRef = useRef(null);
  const isVisible = useViewportVisibility(videoRef);
  const [isMuted, setIsMuted] = useState(true); // Stato per controllare se il video è mutato

  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay was prevented:", error);
      });
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [isVisible]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  return (
    <div style={{ height: '100%', width: '100%', overflow: 'none', position: 'relative' }} className='videochange'>
      <video
        ref={videoRef}
        src="https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/rinositoweb.mp4" type="video/mp4"
        style={{ width: '100%', height: '100%', objectFit: 'cover', position:"relative", bottom:"" }}
        loop
        playsInline
        muted={isMuted}
      ></video>
      <button onClick={toggleMute} style={{ position: 'absolute', top: 20, left: 20, zIndex: 1000, background: 'none', border: 'none', color: 'white', fontSize: '24px' }}>
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />} {/* Cambia l'icona in base allo stato mute */}
      </button>
    </div>
  );
};

export default VideoPresentazione;
