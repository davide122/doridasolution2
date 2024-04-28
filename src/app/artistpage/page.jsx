// ArtistPage.jsx
"use client";
import React, { useState, useEffect } from "react";
import { useAlert } from "../../components/AlertComponent/AlertContext"; // Assicurati che il percorso sia corretto
import { Container, Row, Col, Image, Nav, Button, Modal } from "react-bootstrap";
import useArtistCheck from "../../components/Hook/useArtistCheck";
import { useUserProfile } from "../../components/Hook/useUserProfile";
import AddSongsToAlbum from "@/components/album/AddSongsToAlbum";
import MenuComponent from "@/components/Artist/MenuComponent";
import AlbumsList from "@/components/Artist/DashBoard/AlbumsList";
import SongsList from "@/components/Artist/DashBoard/SongList";
import ArtistNavbar from "@/components/Artist/DashBoard/ArtistNavbar";
import UserProfile from "@/components/Artist/DashBoard/UserProfile";
import Loader from "@/components/Loader/Loader";
import AddAlbumForm from "@/components/album/AddAlbumForm";
import ConfirmModal from "@/components/modal/ConfirmModal";

function ArtistPage() {
  useArtistCheck();
  const [albumToDelete, setAlbumToDelete] = useState(null);
  const [songToDelete, setSongToDelete] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const { showAlert } = useAlert();
  const [showAlbumConfirmModal, setShowAlbumConfirmModal] = useState(false);
  const [showSongConfirmModal, setShowSongConfirmModal] = useState(false);


const [addalbum, setalbum] = useState(false);
  const userProfile = useUserProfile();


  useEffect(() => {
    async function fetchAlbums() {
      const token = localStorage.getItem("token");
      try {
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
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/songs/album/${albumToDelete}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Network response was not ok");

      setAlbums(albums.filter(album => album.album_id !== albumToDelete));
      showAlert("Album eliminato con successo!", "success");
    } catch (error) {
      console.error("Failed to delete album:", error);
      showAlert("Errore durante l'eliminazione dell'album.", "error");
    } finally {
      setShowConfirmModal(false); // Chiudi il modal dopo l'azione
    }
  };


  const deleteSong = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/songs/song/${songToDelete}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) throw new Error("Network response was not ok");
      setSongs(songs.filter(song => song.song_id !== songToDelete));
      showAlert("Canzone eliminata con successo!", "success");
      setShowSongConfirmModal(false);
    } catch (error) {
      console.error("Failed to delete song:", error);
      showAlert("Errore durante l'eliminazione della canzone.", "error");
    }
  };



  const handleDelete = () => {
    deleteAlbum();
    setAlbumToDelete(null); // Reset dell'ID dell'album da eliminare
  };

  const openConfirmModal = (albumId) => {
    setAlbumToDelete(albumId);
    setShowConfirmModal(true);
  };


  const openSongConfirmModal = (songId) => {
    setSongToDelete(songId);
    console.log(songToDelete(songId))
    setShowSongConfirmModal(true);
  };


  useEffect(() => {
    if (!selectedAlbum) return;
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
  }, [selectedAlbum]);

  return (
    
    <Container fluid className="d-flex flex-column">
      {loading ? (<div className="vh-100 bg-black d-flex justify-content-center align-items-center flex-column">
        <img src="./logo.png" alt="" className="logo position-absolute top-0 start-0"/>
<h1 className="Title text-white">La tua musica, Sempre!</h1>

            </div>) : ( <Row>
        <Col md={2} sm={12} className="d-flex flex-row flex-md-column d-none d-md-block text-white   ">
          <div className="p-3 d-flex align-items-center">
            <Image src="/logo.png" alt="Music Logo" fluid width={60} />
            <h4>Music</h4>
          </div>
          <Nav className="flex-column mt-4">
            <MenuComponent />
          </Nav>
          {/* <div className="position-absolute bottom-0 ">
          <UserProfile userProfile={userProfile} />

          </div> */}
        </Col>
        <Col md={7} className="bg-black  ">
          <ArtistNavbar username={userProfile.username} />
          {loading ? (
            <Loader />
          ) : (
          albums?  <>
              <AlbumsList albums={albums} onAlbumSelect={setSelectedAlbum} onDeleteAlbum={openConfirmModal}  />
              <div className="colnav">

              <SongsList songs={songs} onDeleteSong={(id) => { setSongToDelete(id); setShowSongConfirmModal(true); }} />
              </div>
            </> : <h2>Nessun album caricato</h2>
          )}
          
        </Col>

        <Col md={3} className="">
      
          
        <AddAlbumForm/>
        
{console.log("qui",selectedAlbum)}
          {selectedAlbum && (
            <AddSongsToAlbum
              albumId={selectedAlbum}
              userId={userProfile.user_id}
            />
          )}

{!selectedAlbum && (
              <h2 className="text-white text-center">Seleziona un album per aggiungere delle canzoni</h2>
          )}
       
        </Col>
      </Row>)}
     


     {/* Modal for confirming album deletion */}
     <ConfirmModal
        show={showAlbumConfirmModal}
        onHide={() => setShowAlbumConfirmModal(false)}
        onConfirm={deleteAlbum}
        title="Conferma Eliminazione Album"
      >
        Sei sicuro di voler eliminare questo album?
      </ConfirmModal>

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
