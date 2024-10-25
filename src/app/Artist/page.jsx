"use client";
import { useEffect, useState } from "react";
import { Modal, Button, Container, Row, Col, Card, Image } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Artist = () => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('/api/songs/artist');
        const data = await response.json();
        setArtists(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArtists();
  }, []);

  const handleImageClick = async (artist) => {
    setSelectedArtist(artist);
    try {
      const response = await fetch(`/api/albums?userId=${artist.user_id}`);
      const albumData = await response.json();
      setAlbums(albumData);
    } catch (error) {
      console.log('Error fetching albums:', error);
    }
    setShowModal(true);
  };

  return (
    <div>
      <Container className="my-5">
        <Row>
          {artists.map((artist) => (
            <Col key={artist.user_id} xs={12} md={6} lg={4} className="mb-4">
              <Card className="artist-card h-100" onClick={() => handleImageClick(artist)}>
                <Card.Img
                  variant="top"
                  src={artist.profile_picture_url || "https://via.placeholder.com/150"}
                  alt={artist.username}
                  className="artist-image"
                />
                <Card.Body>
                  <Card.Title>{artist.username}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {selectedArtist && (
        <Modal className="" show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedArtist.username}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Email:</strong> {selectedArtist.email}</p>
            <p><strong>Bio:</strong> {selectedArtist.artist_bio}</p>
            <hr />
            <h5>Albums:</h5>
            {albums.length > 0 ? (
              <Row>
                {albums.map((album) => (
                  <Col key={album.album_id} xs={6} className="mb-3">
                    <Card>
                      <Card.Img
                        variant="top"
                        src={album.cover_url || "https://via.placeholder.com/150"}
                        alt={album.title}
                        className="album-cover"
                      />
                      <Card.Body>
                        <Card.Title className="album-title">{album.title}</Card.Title>
                        <Card.Text>{album.release_date}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <p>No albums found for this artist.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <style jsx>{`
        .artist-card {
          transition: transform 0.2s;
        }
        .artist-card:hover {
          transform: scale(1.05);
          cursor: pointer;
        }
        .artist-image {
          height: 300px;
          object-fit: cover;
        }
        .album-cover {
          height: 150px;
          object-fit: cover;
        }
        .album-title {
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Artist;
