import React, { useState } from 'react';
import Slider from 'react-slick';
import { Button, Container, Image } from 'react-bootstrap';
import { BsXCircle } from 'react-icons/bs';
import Tippy from '@tippyjs/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AlbumsList = ({ albums, onAlbumSelect, onDeleteAlbum }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4.2,
    slidesToScroll: 1,
    pauseOnHover: true,
    adaptiveHeight: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.2,
          autoplay: true,
          autoplaySpeed: 2000,
          pauseOnHover: true,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: true,
        },
      },
    ],
  };

  return (
    <Container className="my-4">
      <Slider {...settings}>
        {albums.map((album) => (
          <div key={album.album_id} className="d-flex justify-content-center">
            <Tippy content={album.title} placement="top">
              <div
                onClick={() => onAlbumSelect(album.album_id)}
                className="position-relative"
                style={{ width: '200px', height: '200px' }}
              >
                <Image
                  src={album.cover_url}
                  alt={`${album.title} Cover`}
                  rounded
                  style={{ width: '100%', height: '100%' }}
                />
                <Button
                  variant="danger"
                  style={{
                    border: 'none',
                    background: 'white',
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    borderRadius: '100%',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteAlbum(album.album_id);
                  }}
                >
                  <BsXCircle size={25} className='text-danger' />
                </Button>
              </div>
            </Tippy>
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default AlbumsList;
