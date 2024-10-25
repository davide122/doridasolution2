import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaShoppingCart } from "react-icons/fa";

const VideoReelsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const videos = [
    {
      id: 1,
      src: "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/sample1.mp4",
      narratorName: "Emma Watson",
      description: "Warm and soothing British accent",
    },
    {
      id: 2,
      src: "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/sample2.mp4",
      narratorName: "Morgan Freeman",
      description: "Deep, authoritative American voice",
    },
    {
      id: 3,
      src: "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/sample3.mp4",
      narratorName: "Scarlett Johansson",
      description: "Sultry and captivating tone",
    },
    {
      id: 4,
      src: "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/sample4.mp4",
      narratorName: "Benedict Cumberbatch",
      description: "Sophisticated British charm",
    },
    {
      id: 5,
      src: "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/sample5.mp4",
      narratorName: "Meryl Streep",
      description: "Versatile and emotive narrator",
    },
    {
      id: 6,
      src: "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/sample6.mp4",
      narratorName: "Idris Elba",
      description: "Rich, smooth British accent",
    },
    // Aggiungi altri video se necessario
  ];

  // Calcola il numero di slide necessarie per visualizzare 4 video per slide
  const totalSlides = Math.ceil(videos.length / 4);

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % totalSlides;
    setCurrentIndex(newIndex);
  };

  // Filtra i video da mostrare per la slide corrente
  const currentVideos = videos.slice(currentIndex * 4, currentIndex * 4 + 4);

  return (
    <div className="carousel-container d-flex justify-content-center align-items-center">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="video-slide d-flex justify-content-center align-items-center"
        >
          <div className="video-grid d-flex flex-row justify-content-between align-items-center">
            {currentVideos.map((video) => (
              <div key={video.id} className="video-item">
                <video
                  src={video.src}
                  className="video-reel"
                  autoPlay
                  muted
                  loop
                  playsInline
                ></video>
                <div className="video-overlay d-flex flex-column justify-content-end p-3">
                  <div className="narrator-info text-white mb-2">
                    <h4 className="narrator-name mb-1">{video.narratorName}</h4>
                    <p className="narrator-description">{video.description}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-light d-flex align-items-center">
                      <FaPlay className="me-2" /> Listen
                    </button>
                    <button className="btn btn-light d-flex align-items-center">
                      <FaShoppingCart className="me-2" /> Purchase
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <button className="carousel-nav prev" onClick={handlePrev}>
        ‹
      </button>
      <button className="carousel-nav next" onClick={handleNext}>
        ›
      </button>
    </div>
  );
};

export default VideoReelsCarousel;
