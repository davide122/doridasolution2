import React from 'react';
import { Button, Container, Image } from 'react-bootstrap';
import { BsXCircle } from 'react-icons/bs';
import Tippy from "@tippyjs/react";

const AlbumsList = ({ albums, onAlbumSelect,onDeleteAlbum }) => {
  return (
    <Container className="d-flex overflow-auto">
      {albums.map((album) => (
        
        <div key={album.album_id} action onClick={() => onAlbumSelect(album.album_id)} className="mx-1 albumphoto  ">
          <Tippy content={"ciao caro"} placement="top">
            <>
          <Image src={album.cover_url} alt={`${album.title} Cover`} rounded style={{ width: '200px', height: '200px' }} />
          <Button
            variant="danger"
            className="" // Posiziona l'icona nell'angolo in alto a destra
            style={{ border: 'none', background: 'none', position: 'relative', right: '-30%'}}
            onClick={(e) => {
              e.stopPropagation(); // Previene la propagazione dell'evento, così non scatta anche onAlbumSelect
              onDeleteAlbum(album.album_id);
            }}
          >
            <BsXCircle size={25} className='text-danger' />
          </Button>
            
            </>
             </Tippy>
            <>
            </>
        </div>
      ))}
    </Container>
  );
};

export default AlbumsList;
