"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  FiPlay,
  FiPause,
  FiSkipBack,
  FiSkipForward,
  FiChevronLeft,
  FiChevronRight,
  FiVolume2,
  FiVolume1,
  FiVolumeX,
} from "react-icons/fi";
import "./Css/Player.css";
import Image from "next/image";

const Player = ({ song, onNextSong, onPreviousSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && song) {
      audioRef.current.src = song.file_url;
      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Error playing song:", err));
    }
  }, [song]);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
    };
    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const handleProgressChange = (event) => {
    const audio = audioRef.current;
    const time = (audio.duration / 100) * event.target.value;
    audio.currentTime = time;
    setCurrentTime(audio.currentTime);
    if (!isPlaying) {
      !isPlaying && audio.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipTime = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime += time;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const VolumeIcon = () => {
    if (volume <= 0.1) {
      return <FiVolumeX />;
    } else if (volume <= 0.5) {
      return <FiVolume1 />;
    } else {
      return <FiVolume2 onClick={()=>{setVolume(0);audioRef.current.volume=0}}/>;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="player-container d-flex justify-content-between ">
      <div className="track-info">
        {song && (
          <Image
            src={song.image_songs}
            alt="Album cover"
            width={64}
            height={64}
            className="album-cover"
          />
        )}
        
        <div>
          <div className="song-title d-none d-md-block">
            {song ? song.title : "Seleziona una canzone"}
          </div>
          <div className="song-artist d-none d-md-block">
            {song ? song.username : ""}
          </div>
        </div>
      </div>
      <div className="player-controls flex-column">
        <div>
          <button onClick={onPreviousSong}>
            <FiChevronLeft />
          </button>
          <button onClick={() => skipTime(-30)}>
            <FiSkipBack />
          </button>
          <button onClick={togglePlay}>
            {isPlaying ? (
              <FiPause className="fs-2" />
            ) : (
              <FiPlay className="fs-2" />
            )}
          </button>
          <button onClick={() => skipTime(30)}>
            <FiSkipForward className="fs-3" />
          </button>
          <button onClick={onNextSong}>
            <FiChevronRight className="fs-3" />
          </button>
        </div>
        <div>
          <div className="d-flex time">
            {formatTime(currentTime)}
            <input
              type="range"
              min="0"
              max="100"
              value={(currentTime / audioRef.current?.duration) * 100 || 0}
              onChange={handleProgressChange}
              className="progress-bar "
            />
            {formatTime(audioRef.current?.duration || 0)}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center d-none d-md-flex">
        <VolumeIcon />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider progress-bar "
        />

      </div>
      <audio ref={audioRef} onEnded={onNextSong} />
    </div>
  );
};

export default Player;
