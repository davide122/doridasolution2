import React from "react";
import { FaPlay, FaShare, FaHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react"; 
import "swiper/css"; 
import "swiper/css/autoplay"; 
import SwiperCore, { Autoplay } from "swiper";

// Inizializza il modulo Swiper con Autoplay
SwiperCore.use([Autoplay]);

const VideoReviewSection = () => {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      title: "CEO, Tech Innovators",
      excerpt: "Dorida Solution ha trasformato le nostre operazioni aziendali.",
      thumbnail:
        "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=764&q=80",
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "CTO, Future Systems",
      excerpt: "L'approccio futuristico di Dorida Solution è impareggiabile.",
      thumbnail:
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1469&q=80",
    },
    {
      id: 3,
      name: "Mike Johnson",
      title: "Fondatore, NextGen Startups",
      excerpt:
        "Le soluzioni innovative di Dorida Solution hanno superato le nostre aspettative.",
      thumbnail:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 4,
      name: "Sarah Brown",
      title: "Founder, Innovate Now",
      excerpt:
        "Dorida Solution ha completamente cambiato il nostro approccio alla tecnologia.",
      thumbnail:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=687&q=80",
    },
  ];

  return (
    <section className="py-5 d-flex justify-content-center align-items-center vh-100 bg-reverse previous-section ">
      <div className="container">
        <h2 className="text-white mb-5 position-relative d-inline-block my-5">
          Cosa Dicono i Nostri Clienti
          <span className="title-underline"></span>
        </h2>

        <Swiper
  spaceBetween={20} // Riduci lo spazio tra le slide per avere più parte della slide successiva visibile
  slidesPerView={3}
  loop={true}
  speed={2000}
  autoplay={{
    delay: 1,
    disableOnInteraction: false,
  }}
  freeMode={true}
  breakpoints={{
    // Mobile, mostriamo 1.2 slide (così si vede poco della prossima slide)
    320: { slidesPerView: 1.1, spaceBetween: 10 }, // 1.1 per far vedere parte della prossima slide
    // Tablet
    640: { slidesPerView: 2, spaceBetween: 20 },
    // Desktop
    1024: { slidesPerView: 3, spaceBetween: 30 },
  }}
>
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="card bg-dark text-white h-100 card-narrow">
                <div className="position-relative">
                  <img
                    src={review.thumbnail}
                    alt={review.name}
                    className="card-img-top image-fixed-size"
                  />
                  <div className="overlay">
                    <FaPlay className="text-info display-4 play-icon" />
                  </div>
                </div>
                <div className="card-body text-center d-flex flex-column">
                  <h3 className="card-title fs-4 text-white">{review.name}</h3>
                  <i className="card-subtitle mb-2 text-white fs-6">
                    {review.title}
                  </i>
                  <p className="card-text flex-grow-1 fs-5 my-2">
                    {review.excerpt}
                  </p>
                  <div className="d-flex justify-content-center mt-3">
                    <button
                      className="text-info me-3 icon-button"
                      aria-label="Condividi recensione"
                    >
                      <FaShare className="h4 mb-0 icon" />
                    </button>
                    <button
                      className=" text-danger icon-button"
                      aria-label="Metti Mi Piace"
                    >
                      <FaHeart className="h4 mb-0 icon" />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default VideoReviewSection;
