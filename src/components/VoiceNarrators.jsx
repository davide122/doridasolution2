import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaShoppingCart } from "react-icons/fa";

const VideoReelsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);

  const videos = [
    {
      id: 1,
      src: "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/lapponia/Videoperinstagram.mp4",
      narratorName: "Emma Watson",
      description: "Warm and soothing British accent",
    },
    {
      id: 2,
      src: "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/lapponia/videoperisocial.mp4",
      narratorName: "Morgan Freeman",
      description: "Deep, authoritative American voice",
    },
    {
      id: 3,
      src: "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/lapponia/Videoperinstagram.mp4",
      narratorName: "Scarlett Johansson",
      description: "Sultry and captivating tone",
    },
    {
      id: 4,
      src: "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/lapponia/Videoperinstagram.mp4",
      narratorName: "Benedict Cumberbatch",
      description: "Sophisticated British charm",
    },
    {
      id: 5,
      src: "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/lapponia/videoperisocial.mp4",
      narratorName: "Meryl Streep",
      description: "Versatile and emotive narrator",
    },
    {
      id: 6,
      src: "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/lapponia/Videoperinstagram.mp4",
      narratorName: "Idris Elba",
      description: "Rich, smooth British accent",
    },
  ];

  const totalSlides = Math.ceil(videos.length / 4);

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % totalSlides;
    setCurrentIndex(newIndex);
  };

  const handlePlay = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
      video.muted = false;
      video.play();
    }
  };

  const handleStopPreview = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.muted = true;
      video.currentTime = 0;
      video.loop = true;
      video.play();
    }
  };

  const currentVideos = videos.slice(currentIndex * 4, currentIndex * 4 + 4);

  return (
    <div className="custom-carousel-container vh-100 d-flex">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="custom-video-slide"
        >
          {currentVideos.map((video, index) => (
            <div
              key={video.id}
              className="custom-video-item"
              onMouseEnter={() => handlePlay(index)}
              onMouseLeave={() => handleStopPreview(index)}
              onClick={() => handlePlay(index)}
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={video.src}
                className="custom-video-reel"
                muted
                loop
                autoPlay
                playsInline
              ></video>
              <div className="custom-video-overlay">
                <div className="custom-narrator-info">
                  <h4 className="custom-narrator-name">{video.narratorName}</h4>
                  <p className="custom-narrator-description">{video.description}</p>
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
        </motion.div>
      </AnimatePresence>

      <button className="custom-carousel-nav prev" onClick={handlePrev}>
        ‹
      </button>
      <button className="custom-carousel-nav next" onClick={handleNext}>
        ›
      </button>
    </div>
  );
};

export default VideoReelsCarousel;
