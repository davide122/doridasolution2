"use client"
import React, { useState, useEffect } from "react";
import { useAlert } from "../../components/AlertComponent/AlertContext";
import { Container, Row, Col, Nav } from "react-bootstrap";
import useArtistCheck from "../../components/Hook/useArtistCheck";
import { useUserProfile } from "../../components/Hook/useUserProfile";
import AddSongsToAlbum from "../../components/album/AddSongsToAlbum";
import MenuComponent from "../../components/Artist/MenuComponent";
import AlbumsList from "../../components/Artist/DashBoard/AlbumsList";
import SongsList from "../../components/Artist/DashBoard/SongList";
import ArtistNavbar from "../../components/Artist/DashBoard/ArtistNavbar";
import Loader from "../../components/Loader/Loader";
import AddAlbumForm from "../../components/album/AddAlbumForm";
import ConfirmModal from "../../components/modal/ConfirmModal";
import Image from "next/image";
import Player from "../../components/DoridaMusic/Player";
import WrappedPaymentForm from "../../components/Payments/PaymentForm";

function ArtistPage() {
  const { showAlert } = useAlert();
  const userProfile = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumToDelete, setAlbumToDelete] = useState(null);
  const [songToDelete, setSongToDelete] = useState(null);
  const [showAlbumConfirmModal, setShowAlbumConfirmModal] = useState(false);
  const [showSongConfirmModal, setShowSongConfirmModal] = useState(false);
  const [activeSong, setActiveSong] = useState(null); // Stato per la canzone attiva
  const [activeSongIndex, setActiveSongIndex] = useState(0); // Stato per gestire l'indice della canzone attiva

  useArtistCheck();

  const handleNextSong = () => {
    const nextSongIndex = (activeSongIndex + 1) % songs.length;
    setActiveSongIndex(nextSongIndex);
    setActiveSong(songs[nextSongIndex]);
  };

  const handlePreviousSong = () => {
    const previousSongIndex =
      (activeSongIndex - 1 + songs.length) %  songs.length;
    setActiveSongIndex(previousSongIndex);
    setActiveSong(songs[previousSongIndex]);
  };

  const handleSelectSong = (song) => {
    setActiveSong(song);
    console.log(song);
  };

  useEffect(() => {
    async function fetchAlbums() {
      setLoading(true)
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/songs/album", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setAlbums(data);
        showAlert("Album caricati con successo!", "success");
      } catch (error) {
        console.error("Failed to fetch albums:", error);
        showAlert("Errore nel caricamento degli album.", "error");
      } finally {
        setLoading(false);
      }
    }
    fetchAlbums();
  }, []);

  const deleteAlbum = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/songs/album/${albumToDelete}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      setAlbums(albums.filter((album) => album.album_id !== albumToDelete));
      showAlert("Album eliminato con successo!", "success");
    } catch (error) {
      console.error("Failed to delete album:", error);
      showAlert("Errore durante l'eliminazione dell'album.", "error");
    } finally {
      setShowAlbumConfirmModal(false);
    }
  };

  const deleteSong = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/songs/song/${songToDelete}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      setSongs(songs.filter((song) => song.song_id !== songToDelete));
      showAlert("Canzone eliminata con successo!", "success");
    } catch (error) {
      console.error("Failed to delete song:", error);
      showAlert("Errore durante l'eliminazione della canzone.", "error");
    } finally {
      setShowSongConfirmModal(false);
    }
  };

  useEffect(() => {
    if (selectedAlbum) {
      async function fetchSongs() {
        try {
          const response = await fetch(`/api/songs/album/${selectedAlbum}`);
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();
          setSongs(data);
          showAlert("Brani caricati con successo!", "success");
        } catch (error) {
          console.error("Failed to fetch songs:", error);
          showAlert("Errore nel caricamento dei brani.", "error");
        }
      }
      fetchSongs();
    }
  }, [selectedAlbum]);

  const openConfirmModal = (albumId) => {
    setAlbumToDelete(albumId);
    setShowAlbumConfirmModal(true);
  };

  const openSongConfirmModal = (songId) => {
    setSongToDelete(songId);
    setShowSongConfirmModal(true);
  };

  const handleDelete = () => {
    deleteAlbum();
    setAlbumToDelete(null);
  };

  return (
    <Container fluid className="d-flex flex-column">
      {loading ? (
        <div className="vh-100 d-flex justify-content-center align-items-center flex-column">
          <Image
            src="/logo.png"
            alt="Dorida Solution Logo"
            width={100}
            height={110}
            className="logo position-absolute top-0 start-0"
          />
          <h1 className="Title text-white">La tua musica, Sempre!</h1>
        </div>
      ) : (
        <Row>
          {/* Sidebar */}
          <Col md={2} sm={12} className="d-flex flex-row flex-md-column d-none d-md-block text-white pb-2">
            <div className="p-3 d-flex align-items-center p-2">
              <Image
                src="/logo.png"
                alt="Dorida Solution Logo"
                width={60}
                height={60}
                className=""
              />
              <h4 className="my-2">Music</h4>
            </div>
            <Nav className="flex-column mt-4">
              <MenuComponent />
            </Nav>
          </Col>

          {/* Album and Song Lists */}
          <Col md={7} className=" ">
            <ArtistNavbar username={userProfile.username} />
            {loading ? (
              <Loader />
            ) : albums.length > 0 ? (
              <>
                <AlbumsList
                  albums={albums}
                  onAlbumSelect={setSelectedAlbum}
                  onDeleteAlbum={openConfirmModal}
                />
              <div className="w-100 border-bottom border-1 mb-3 mt-2">

              </div>
                <div className="colnav">
                  <SongsList
                    songs={songs}
                    onDeleteSong={openSongConfirmModal}
                    onSelectSong={handleSelectSong}
                  />
                </div>
              </>
            ) : (
              <h2>Nessun album caricato</h2>
            )}
          </Col>

          {/* Add Album Form and Add Songs to Album */}
          <Col md={3} className="mt-0 pb-5">
            {/* <AddAlbumForm /> */}
            {selectedAlbum && (
              <AddSongsToAlbum
                albumId={selectedAlbum}
                userId={userProfile.user_id}
              />
            )}
  <WrappedPaymentForm onPaymentSuccess={() => console.log('Pagamento completato')} />

            {!selectedAlbum && (
              <h2 className="text-white text-center">
                Seleziona un album per aggiungere delle canzoni
              </h2>
            )}
          </Col>
        </Row>
      )}
      <div className="player-fixed">
     <Player
       song={activeSong}
       onNextSong={handleNextSong}
       onPreviousSong={handlePreviousSong}
     />
        
      </div>

      {/* Modal for confirming album deletion */}
      <ConfirmModal
        show={showAlbumConfirmModal}
        onHide={() => setShowAlbumConfirmModal(false)}
        onConfirm={handleDelete}
        title="Conferma Eliminazione Album"
      >
        Sei sicuro di voler eliminare questo album?
      </ConfirmModal>

      {/* Modal for confirming song deletion */}
      <ConfirmModal
        show={showSongConfirmModal}
        onHide={() => setShowSongConfirmModal(false)}
        onConfirm={deleteSong}
        title="Conferma Eliminazione Canzone"
      >
        Sei sicuro di voler eliminare questa canzone?
      </ConfirmModal>
    </Container>
  );
}

export default ArtistPage;
