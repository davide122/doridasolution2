"use client";
import useArtistCheck from "../../components/Hook/useArtistCheck";
import { useUserProfile } from "../../components/Hook/useUserProfile";
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Image, ListGroup, Form } from 'react-bootstrap';
import AddSongsToAlbum from '@/components/album/AddSongsToAlbum';
import MenuComponent from '@/components/Artist/MenuComponent';
import AddAlbumForm from "@/components/album/AddAlbumForm";

function ArtistPage() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [songs, setSongs] = useState([]);

  const userProfile = useUserProfile();
  useArtistCheck(); // Assicurati che l'artista sia verificato prima di permettere l'accesso alla pagina

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
      } catch (error) {
        console.error("Failed to fetch albums:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAlbums();
  }, []);

  useEffect(() => {
    async function fetchSongs() {
      if (!selectedAlbum) return;
      try {
        const response = await fetch(`/api/songs/album/${selectedAlbum}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
    }
    fetchSongs();
  }, [selectedAlbum]);

  const handleAlbumSelect = (albumId) => {
    setSelectedAlbum(albumId);
  };

  return (
    <Container fluid className="d-flex flex-column">
    <Row>
      <Col md={2} className=" d-flex flex-column justify-content-between bg-dark text-white">
        <div className="p-3 d-flex align-items-center">
          <Image src="/logo.png" alt="Music Logo" fluid width={60} />
          <h4 className="ms-3">Music</h4>
        </div>
        <Nav className="flex-column mt-4">
          <MenuComponent />
        </Nav>
        {userProfile && (
          <div className="px-3 py-2">
            <Image src={userProfile.profile_picture_url} alt="User Profile" roundedCircle fluid />
            <p className="mt-2 mb-0">{userProfile.username}</p>
          </div>
        )}
      </Col>
      <Col md={10} className="bg-light">
        <Nav className="d-flex justify-content-between align-items-center p-3  w-100">
          <h2>Salve {userProfile?.username || 'Guest'}</h2>
          <Form.Control type="text" className="w-25 Search" placeholder="Search albums, songs..." />
        </Nav>
        <Container fluid>
          <Row>
            <Col md={8}>
              <div className="mb-3 p-3 bg-white shadow-sm ">
                <div className="d-flex justify-content-between align-items-center">
                <h3>I tuoi album</h3>
<h3 className="fs-6 text-danger">Guarda di più</h3>
                </div>
                <ListGroup horizontal className="overflow-auto">
                  {albums.map((album) => (
                    <ListGroup.Item key={album.id} action onClick={() => handleAlbumSelect(album.album_id)} className="d-flex flex-column align-items-center">
                      <Image src={album.cover_url} alt={`${album.title} Cover`} rounded style={{ width: '200px', height: '200px' }} />
                    </ListGroup.Item>
                    
                  ))}
                </ListGroup>
              </div>
              <div className="shadow-sm mb-3 p-3 rounded-5 border-1 border-black">
              <AddAlbumForm />
              </div>
            </Col>
            <Col md={4} className="vh-100 bg-dark rounded-4 p-3">

                {!selectedAlbum && <h2 className="text-white">Seleziona un album per visualizzare di più</h2>}
              {selectedAlbum && (
                <>
                  <ListGroup>
                    {songs.map((song) => (
                      <ListGroup.Item key={song.id} className="d-flex justify-content-between align-items-center p-2">
                        <div className="d-flex align-items-center">
                          <Image src={song.cover_url} alt={`${song.title} Cover`} className="song-cover me-3" width={50} height={50} roundedCircle />
                          <div>
                            <strong>{song.title}</strong>
                            <p className="mb-0 text-muted">{song.artist}</p>
                          </div>
                        </div>
                        <audio controls style={{ maxWidth: '200px' }}>
                          <source src={song.file_url} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <AddSongsToAlbum albumId={selectedAlbum} userId={userProfile.user_id} />
                </>
              )}
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  </Container>
  );
}

export default ArtistPage;