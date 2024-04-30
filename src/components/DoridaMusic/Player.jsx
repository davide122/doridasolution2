"use client"
import React, { useState } from "react";
import { FiPlay, FiPause, FiSkipBack, FiSkipForward } from "react-icons/fi";
import "./Css/Player.css";
import Image from "next/image";

const Player = ({song}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Qui potresti aggiungere la logica per riprodurre la musica usando l'elemento audio
  };


  return (
    <div className="player-bar fixed-bottom bg-dark">
      <div className="container-fluid">
        <div className="row align-items-center justify-content-between">
          <div className="col d-flex align-items-center">
            <Image
                src={song ? song.image_songs : ""}
                alt="Copertina album"
                width={500} // Sostituisci con la larghezza reale dell'immagine
                height={500} // Sostituisci con l'altezza reale dell'immagine
                className="cover"
            />
            <div className="track-info">
              <div className="track-title">{song ? song.title : "Nessun brano selezionato"}</div>
              <div className="track-artist">{song ? `Durata: ${song.duration}` : ""}</div>
            </div>
          </div>
          <div className="col d-flex justify-content-center">
            <FiSkipBack className="control-icon d-md-block d-none" />
            {isPlaying ? (
              <FiPause onClick={togglePlay} className="control-icon" />
            ) : (
              <FiPlay onClick={togglePlay} className="control-icon" />
            )}
            <FiSkipForward className="control-icon" />
          </div>
          <div className="col d-flex justify-content-center d-none d-md-block align-items-center tex-center">
            <input type="range" className="volume-slider" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
