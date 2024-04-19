"use client"
import React from "react";
import "./Css/playlist.css"
const playlists = [
  { id: 1, name: "Rap", image: "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/MusicianCreator/Hip+hop+(2).png" },
  { id: 1, name: "Rap", image: "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/MusicianCreator/Hip+hop+(2).png" },
  { id: 1, name: "Rap", image: "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/MusicianCreator/Hip+hop+(2).png" },
  { id: 1, name: "Rap", image: "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/MusicianCreator/Hip+hop+(2).png" },

];

const Playlist = () => {
  return (
    <div>
      <div className="carousel-container mt-2 mb-5">
      <h3 className="text-white  ms-md-4 ms-3 text-start  ">Scopri le nostre Playlist</h3>
        <div className="carousel ms-3 shadow2 ">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="playlist-card">
              <img src={playlist.image} alt="" className="img-fluid" />
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-container">
      <h3 className="text-white  ms-md-4 ms-3 text-start  ">Scopri le nostre Playlist</h3>
        <div className="carousel ms-3 shadow2 ">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="playlist-card">
              <img src={playlist.image} alt="" className="img-fluid" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
