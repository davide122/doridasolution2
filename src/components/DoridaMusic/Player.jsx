"use client"
import React, { useState } from "react";
import { FiPlay, FiPause, FiSkipBack, FiSkipForward } from "react-icons/fi";
import "./Css/Player.css";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Qui aggiungi la logica per la riproduzione della musica
  };

  return (
    <div className="player-bar fixed-bottom bg-dark">
      <div className="container-fluid">
        <div className="row align-items-center justify-content-between">
          <div className="col d-flex align-items-center">
            <img src="https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/MusicianCreator/signorablur.png" alt="Copertina album" className="cover" />
            <div className="track-info">
              <div className="track-title">1° episodio: So co...</div>
              <div className="track-artist">Bunga Bunga (ITA)</div>
            </div>
          </div>
          <div className="col d-flex justify-content-center ">
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
