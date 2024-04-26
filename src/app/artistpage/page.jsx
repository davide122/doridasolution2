"use client";
import useArtistCheck from "../../components/Hook/useArtistCheck"; // Adjust the path as per your project structure
import { AiFillHome } from "react-icons/ai";
import { IoMdAnalytics } from "react-icons/io";
import { BiSolidPlaylist } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";
import { useUserProfile } from "../../components/Hook/useUserProfile";
import { useEffect, useState } from "react";
import AddAlbumForm from "@/components/album/AddAlbumForm";
import AddSongsToAlbum from "@/components/album/AddSongsToAlbum";
import MenuComponent from "@/components/Artist/MenuComponent";

function ArtistPage() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState(); // Stato per memorizzare l'ID dell'album selezionato
  const [songs, setSongs] = useState([]); // 
  useArtistCheck();

  const userProfile = useUserProfile();

  useEffect(() => {
    async function fetchAlbums() {
      const token = localStorage.getItem("token"); // Assicurati che il token sia memorizzato in localStorage
      try {
        const response = await fetch("/api/songs/album", {
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error("Failed to fetch albums:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAlbums();
  }, []);
  // Controllo se userProfile è non nullo e ha i dati caricati
 


  useEffect(() => {
    async function fetchSongs() {
      if (!selectedAlbum) return; // Non fare nulla se nessun album è stato selezionato
      try {
        const response = await fetch(`/api/songs/album/${selectedAlbum}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
    }

    fetchSongs();
  }, [selectedAlbum]); // Esegui l'effetto solo quando l'album selezionato cambia

  const handleAlbumSelect = (albumId) => {
    setSelectedAlbum(albumId); // Imposta l'album selezionato quando viene cliccato
  };


  return (
    <div className="container-fluid d-flex flex-column">
      <div className="row">
        <div className="col col-2 vh-100 d-flex flex-column justify-content-between">
          <div className="d-flex p-2 align-items-center pt-3">
            <img src="/logo.png" alt="" className="img-fluid" width={60} />
            <p className="fs-5 mt-3">Music</p>
          </div>
          <div className="mt-5 w-100 justify-content-center align-items-center d-flex">
            <nav className="w-100 mx-3">
              <p className="text-start w-100 fs-6 ms-3">MENU</p>

            <MenuComponent/>
            </nav>
          </div>
          <div>
          <div className="img-user">
            <img src={userProfile && userProfile.profile_picture_url} alt="" className="img-fluid" />
           
          </div>

          </div>
        </div>
        <div className="col col-10 bg-white ">
          <nav className=" d-flex pt-4 justify-content-between mx-3">
            <h2 className="fw ">
              <strong>Buona sera {userProfile.username}</strong>
            </h2>
           <input type="text"className="w-25 outline-none  rounded-5" />
          </nav>

          <div className="container-fluid">
            <div className="row">
              <div className="col col-8">
                <div className="albumbanner d-flex justify-content-between align-items-center p-3 rounded-3 bg-gray">
                  <h2 className="fs-4">I tuoi Album</h2>
                  <p className="text-primary fs-6">
                    <strong>Guarda i dettagli</strong>
                  </p>

                </div>
                  <div className="album">
                    <ul>
                      {albums.map((album) => (
                        <div className="albumphoto rounded-3 d-flex " key={album.id} onClick={() => handleAlbumSelect(album.album_id)}>
<img src={album.cover_url} alt="Album photo" className="img-fluid rounded-4" onClick={() => handleAlbumSelect(album.id)} />
                        </div>
                      ))}
                    </ul>
                  </div>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col col-6 ">
                      <AddAlbumForm />
                    </div>
                <div className="col col-4">
                {selectedAlbum && (
                        <>
                          {/* Song List */}
                          <div className="w-100 list">
                            {songs.map((song) => (
                              <div
                                key={song.id}
                                className="song-item d-flex align-items-center justify-content-between mb-3"
                              >
                                {/* Song Details */}
                                <div className="song-details d-flex align-items-center">
                                  <img
                                    src={song.cover_url}
                                    alt="Song Cover"
                                    className="song-cover"
                                  />
                                  <div className="song-info ms-3">
                                    <p className="song-title">{song.title}</p>
                                    <p className="song-artist">
                                      {song.artist}
                                    </p>
                                  </div>
                                </div>
                                {/* Song Player */}
                                <div className="song-player">
                                  <audio controls>
                                    <source
                                      src={song.audio_url}
                                      type="audio/mpeg"
                                    />
                                    Your browser does not support the audio
                                    element.
                                  </audio>
                                </div>
                              </div>
                            ))}
                          </div>
                          {/* Add Songs to Album Form */}
                          <AddSongsToAlbum albumId={selectedAlbum.album_id} userId={userProfile.user_id}/>
                        </>
                      )}
                </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-100 pt-3"></div>
        </div>
      </div>
    </div>
  );
}



export default ArtistPage;