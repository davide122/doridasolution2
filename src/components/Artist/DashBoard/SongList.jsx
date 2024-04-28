import React, { useEffect, useRef, useState } from 'react';
import { ListGroup, Image, Button } from 'react-bootstrap';
import { IoPlayOutline } from "react-icons/io5";
import { IoIosPause } from "react-icons/io";

import "./Dashboard.css"
const SongsList = ({ songs }) => {
  const [play,setplay] = useState(false);
  const audioRefs = useRef(new Array(songs.length).fill().map(() => React.createRef()));

  const playAudio = (index) => {
    const audio = audioRefs.current[index].current;
    if (audio.paused) {
      audio.play();
      setplay(true)
    } else {
      audio.pause();
      setplay(false)
    }
  };
  return (
    <div className='songs-list my-3'>
      {songs.map((song, index) => (
        <ListGroup.Item key={song.id} className=" d-flex justify-content-between align-items-center w-100 ">
          <div className="container-fluid mx-5 d-flex justify-content-between my-2 song-item">
          <div className="d-flex align-items-center">
            <span className="track-number">{index + 1}</span>
            <Image src={song.image_songs} alt={`${song.title} Cover`} className="cover me-3 text-white my-2 rounded-1 " />
            <div>
              <strong className="title text-white">{song.title}</strong>
              <p className="artist mb-0 fs-6 text-white">{song.duration}</p>
            </div>
          </div>
          <div className="player-controls">
          <Button variant="" onClick={() => playAudio(index)}><IoPlayOutline className="text-white fs-3"/></Button>
              <audio ref={audioRefs.current[index]} preload="none">
                <source src={song.file_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
          </div>
          </div>
        </ListGroup.Item>
      ))}
    </div>
  );
};

export default SongsList;
