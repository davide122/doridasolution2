// ArtistPage.jsx
"use client";
import React, { useState, useEffect } from "react";
import { useAlert } from "../../components/AlertComponent/AlertContext"; // Assicurati che il percorso sia corretto
import { Container, Row, Col, Image, Nav } from "react-bootstrap";
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

function ArtistPage() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const { showAlert } = useAlert();

  useArtistCheck();
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
      <Row>
        <Col md={2} className="d-flex flex-column bg-dark text-white vh-100 ">
          <div className="p-3 d-flex align-items-center">
            <Image src="/logo.png" alt="Music Logo" fluid width={60} />
            <h4>Music</h4>
          </div>
          <Nav className="flex-column mt-4">
            <MenuComponent />
          </Nav>
          <UserProfile userProfile={userProfile} />
        </Col>
        <Col md={7} className="bg-light wh-100">
          <ArtistNavbar username={userProfile.username} />
          {loading ? (
            <Loader />
          ) : (
            <>
              <AlbumsList albums={albums} onAlbumSelect={setSelectedAlbum} />
              <SongsList songs={songs} />
            </>
          )}
          
        </Col>

        <Col md={3} className="wh-100">
          <AddAlbumForm ></AddAlbumForm>
{console.log("qui",selectedAlbum)}
          {selectedAlbum && (
            <AddSongsToAlbum
              albumId={selectedAlbum}
              userId={userProfile.user_id}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ArtistPage;
