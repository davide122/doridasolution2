import React from 'react';
import { Container, Image } from 'react-bootstrap';

const AlbumsList = ({ albums, onAlbumSelect }) => {
  return (
    <Container className="d-flex overflow-auto">
      {albums.map((album) => (
        <div key={album.id} action onClick={() => onAlbumSelect(album.album_id)} className="mx-1 albumphoto ">
          <Image src={album.cover_url} alt={`${album.title} Cover`} rounded style={{ width: '200px', height: '200px' }} />
        </div>
      ))}
    </Container>
  );
};

export default AlbumsList;
