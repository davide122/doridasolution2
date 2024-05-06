"use client";
import { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../CreateSongForm.module.css"; // Importa gli stili personalizzati

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
  });
  const [isGenreSelected, setIsGenreSelected] = useState(false);

  const handleGenreSelect = (genre) => {
    setFormData((prev) => ({
      ...prev,
      genre,
    }));
    setIsGenreSelected(true); // Passa al modulo dettagliato
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
  };

  // Impostazioni per lo slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

  // Controlla se la categoria selezionata è "Professionista"
  const isProfessional = formData.category === "Professionista";

  return (
    <div className={`container vh-100 justify-content-center d-flex flex-column ${styles.container}`}>
      {!isGenreSelected ? (
        <>
          <h1 className={`${styles.title} text-center Titolo text-white`}>Crea la tua canzone!</h1>
          <h2 className="text-center text-white">Iniziamo dal genere</h2>
          <Slider {...settings} className={`w-100 ${styles.slider}`}>
            <div className={`text-center ${styles.slide}`}>
              <button onClick={() => handleGenreSelect("Rap")} className={styles.btn}>
                <Image
                  src="https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/Image/Album/Caraibico/Copertina+Caraibico.png"
                  alt="Rap"
                  width={500}
                  height={500}
                  className={`img-fluid rounded-5 ${styles.image}`}
                />
                <p>Rap</p>
              </button>
            </div>
            <div className={`text-center ${styles.slide}`}>
              <button onClick={() => handleGenreSelect("Pop")} className={styles.btn}>
                <Image
                  src="https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/Image/Album/Rap/ALBUM+RAP.png"
                  alt="Pop"
                  width={500}
                  height={500}
                  className={`img-fluid rounded-5 ${styles.image}`}
                />
                <p>Pop</p>
              </button>
            </div>
            <div className={`text-center ${styles.slide}`}>
              <button onClick={() => handleGenreSelect("Classica")} className={styles.btn}>
                <Image
                  src="https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/Image/Album/Reggaeton/Samira+Hadi+(3).png"
                  alt="Classica"
                  width={500}
                  height={500}
                  className={`img-fluid rounded-5 ${styles.image}`}
                />
                <p>Classica</p>
              </button>
            </div>
          </Slider>
        </>
      ) : (
        <>
          <h1 className={`${styles.title} text-center Titolo text-white`}>Informazioni</h1>
          <div className="container-fluid vh-100 justify-content-center align-items-center">
            <div className="row">
              <div className="col-md-6">
                <form onSubmit={handleSubmit} className="w-100 mt-4">
                  <div className="mb-3">
                    <label className="form-label">Durata:</label>
                    <input
                      type="number"
                      name="songLength"
                      value={formData.songLength}
                      onChange={handleChange}
                      min="1"
                      className="form-control"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="form-label">Categoria di appartenenza:</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Seleziona Categoria</option>
                      <option value="Amatore">Amatore</option>
                      <option value="Professionista">Professionista</option>
                    </select>
                  </div>
                  <div className="form-check d-flex justify-content-between mb-2">
                    <label className="form-check-label">Richiedo la creazione della grafica</label>
                    <input
                      type="checkbox"
                      name="graphicRequested"
                      checked={formData.graphicRequested}
                      onChange={handleChange}
                      className="form-check-input"
                    />
                  </div>
                  <div className="form-check d-flex justify-content-between mb-2">
                    <label className="form-check-label">Richiedo la creazione del visualizer</label>
                    <input
                      type="checkbox"
                      name="visualizerRequested"
                      checked={formData.visualizerRequested}
                      onChange={handleChange}
                      className="form-check-input"
                    />
                  </div>
                  {isProfessional && (
                    <>
                      <div className="form-check d-flex justify-content-between mt-1 mb-2">
                        <label className="form-check-label">Arrangiamento musicale diverso</label>
                        <input
                          type="checkbox"
                          name="musicArrangement"
                          checked={formData.musicArrangement}
                          onChange={handleChange}
                          className="form-check-input"
                        />
                      </div>
                      <div className="form-check d-flex justify-content-between mb-2">
                        <label className="form-check-label">Inserimento brani piattaforme online</label>
                        <input
                          type="checkbox"
                          name="onlineDistribution"
                          checked={formData.onlineDistribution}
                          onChange={handleChange}
                          className="form-check-input"
                        />
                      </div>
                      <div className="form-check d-flex justify-content-between mb-2">
                        <label className="form-check-label">Partitura</label>
                        <input
                          type="checkbox"
                          name="sheetMusic"
                          checked={formData.sheetMusic}
                          onChange={handleChange}
                          className="form-check-input"
                        />
                      </div>
                    </>
                  )}
                </form>
              </div>
              <div className="col-md-6">
                <div className="form-check d-flex justify-content-end mb-2">
                  <label className="form-check-label">Fornirò il testo</label>
                  <input
                    type="checkbox"
                    name="lyricsProvided"
                    checked={formData.lyricsProvided}
                    onChange={handleChange}
                    className="form-check-input mx-2"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="comment">Testo:</label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows="7"
                    cols="40"
                    placeholder="Scrivi qui il tuo testo..."
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateSongForm;
