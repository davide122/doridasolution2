import React from 'react';
import { ListGroup, Image, audio } from 'react-bootstrap';

const AlbumDetails = ({ songs }) => {
  return (
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
  );
};

export default AlbumDetails;
