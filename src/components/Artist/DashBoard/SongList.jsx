import React, { useEffect, useRef, useState } from 'react';
import { ListGroup, Image, Button, Modal } from 'react-bootstrap';
import { IoPlayOutline } from "react-icons/io5";
import { IoIosPause } from "react-icons/io";

import "./Dashboard.css"
import { BsXCircle } from 'react-icons/bs';
import ConfirmModal from '../../../components/modal/ConfirmModal';
const SongsList = ({ songs, onDeleteSong, onSelectSong }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [songToDelete, setSongToDelete] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className='songs-list my-3 mb-5 h-100'>
      {songs.map((song, index) => (
        <ListGroup.Item key={song.id}  onClick={() => onSelectSong(song)}  className=" d-flex justify-content-between align-items-center w-100 ">
          <div className="container-fluid mx-5 d-flex justify-content-between my-2 song-item">
            <div className="d-flex align-items-center">
              <span className="track-number">{index + 1}</span>
              <Image src={song.image_songs?song.image_songs:song.cover_url} alt={`${song.title} Cover`} className="cover me-3 text-white my-2 rounded-1" />
              <div>
                <strong className="title text-white fs-md-3 fs-6">{song.title}</strong>
                <p className="artist mb-0 fs-md-6 fs-6 text-white d-none d-md-block">{song.username}</p>
              </div>
            </div>
        
           
            <div className="player-controls">
              <Button variant="" onClick={() => onSelectSong(song)}><IoPlayOutline className="text-white fs-3"/></Button>
            </div>
          </div>
        </ListGroup.Item>
      ))}
      <ConfirmModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={() => onDeleteSong(songToDelete)}
        title="Conferma Eliminazione"
      >
        Sei sicuro di voler eliminare questa canzone?
      </ConfirmModal>
    </div>
  );
};

export default SongsList;