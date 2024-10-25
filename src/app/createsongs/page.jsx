"use client";
import { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CreateSongForm = () => {
  const [formData, setFormData] = useState({
    genre: "",
    songLength: 2,
    lyricsProvided: false,
    graphicRequested: false,
    visualizerRequested: false,
    musicArrangement: false,
    onlineDistribution: false,
    sheetMusic: false,
    category: "",
    comment: "",
  });
  const [isGenreSelected, setIsGenreSelected] = useState(false);

  const handleGenreSelect = (genre) => {
    setFormData((prev) => ({
      ...prev,
      genre,
    }));
    setIsGenreSelected(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Implementa la logica di invio del form qui
  };

  // Impostazioni per lo slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Adatto per mobile
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Verifica se la categoria selezionata è "Professionista"
  const isProfessional = formData.category === "Professionista";

  return (
    <div className="csf-container">
      {!isGenreSelected ? (
        <>
          <header className="csf-header">
            <h1 className="csf-title">Create Your Song!</h1>
            <h2 className="csf-subtitle">Lets start by selecting the genre.</h2>
          </header>
          <Slider {...settings} className="csf-slider">
            <div className="csf-slide">
              <button onClick={() => handleGenreSelect("Rap")} className="csf-genre-button">
                <Image
                  src="https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/Image/Album/Caraibico/Copertina+Caraibico.png"
                  alt="Rap"
                  width={500}
                  height={500}
                  className="csf-genre-image"
                />
                <p className="csf-genre-label">Rap</p>
              </button>
            </div>
            <div className="csf-slide">
              <button onClick={() => handleGenreSelect("Pop")} className="csf-genre-button">
                <Image
                  src="https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/Image/Album/Rap/ALBUM+RAP.png"
                  alt="Pop"
                  width={500}
                  height={500}
                  className="csf-genre-image"
                />
                <p className="csf-genre-label">Pop</p>
              </button>
            </div>
            <div className="csf-slide">
              <button onClick={() => handleGenreSelect("Classica")} className="csf-genre-button">
                <Image
                  src="https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/Image/Album/Reggaeton/Samira+Hadi+(3).png"
                  alt="Classica"
                  width={500}
                  height={500}
                  className="csf-genre-image"
                />
                <p className="csf-genre-label">Classica</p>
              </button>
            </div>
          </Slider>
        </>
      ) : (
        <>
          <header className="csf-header">
            <h1 className="csf-title">Song Details</h1>
          </header>
          <form onSubmit={handleSubmit} className="csf-form">
            <div className="csf-form-group">
              <label className="csf-form-label">Song Length (minutes):</label>
              <input
                type="number"
                name="songLength"
                value={formData.songLength}
                onChange={handleChange}
                min="1"
                className="csf-form-control"
                required
              />
            </div>
            <div className="csf-form-group">
              <label className="csf-form-label">Category:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="csf-form-select"
                required
              >
                <option value="">Select Category</option>
                <option value="Amatore">Amatore</option>
                <option value="Professionista">Professionista</option>
              </select>
            </div>
            <div className="csf-form-group">
              <div className="csf-form-check">
                <input
                  type="checkbox"
                  name="graphicRequested"
                  checked={formData.graphicRequested}
                  onChange={handleChange}
                  className="csf-form-check-input"
                />
                <label className="csf-form-check-label">Request Graphic Design</label>
              </div>
              <div className="csf-form-check">
                <input
                  type="checkbox"
                  name="visualizerRequested"
                  checked={formData.visualizerRequested}
                  onChange={handleChange}
                  className="csf-form-check-input"
                />
                <label className="csf-form-check-label">Request Visualizer</label>
              </div>
              {isProfessional && (
                <>
                  <div className="csf-form-check">
                    <input
                      type="checkbox"
                      name="musicArrangement"
                      checked={formData.musicArrangement}
                      onChange={handleChange}
                      className="csf-form-check-input"
                    />
                    <label className="csf-form-check-label">Different Music Arrangement</label>
                  </div>
                  <div className="csf-form-check">
                    <input
                      type="checkbox"
                      name="onlineDistribution"
                      checked={formData.onlineDistribution}
                      onChange={handleChange}
                      className="csf-form-check-input"
                    />
                    <label className="csf-form-check-label">Online Distribution</label>
                  </div>
                  <div className="csf-form-check">
                    <input
                      type="checkbox"
                      name="sheetMusic"
                      checked={formData.sheetMusic}
                      onChange={handleChange}
                      className="csf-form-check-input"
                    />
                    <label className="csf-form-check-label">Sheet Music</label>
                  </div>
                </>
              )}
            </div>
            <div className="csf-form-group">
              <div className="csf-form-check">
                <input
                  type="checkbox"
                  name="lyricsProvided"
                  checked={formData.lyricsProvided}
                  onChange={handleChange}
                  className="csf-form-check-input"
                />
                <label className="csf-form-check-label">Provide Lyrics</label>
              </div>
              <div className="csf-form-group">
                <label htmlFor="comment" className="csf-form-label">Lyrics:</label>
                <textarea
                  id="comment"
                  name="comment"
                  rows="4"
                  placeholder="Write your lyrics here..."
                  className="csf-form-control"
                  value={formData.comment}
                  onChange={handleChange}
                  required={formData.lyricsProvided}
                ></textarea>
              </div>
            </div>
            <button type="submit" className="csf-submit-button">Create My Song!</button>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateSongForm;
