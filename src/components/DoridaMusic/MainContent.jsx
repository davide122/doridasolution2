"use client";
import { useEffect, useState } from "react";
import { FiPlay } from "react-icons/fi";
import "./Css/Maincontent.css";
import Image from "next/image";

const immagini = [
  {
    blurred:
      "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/MusicianCreator/rinoblurrato.jpg",
    clear:
      "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/MusicianCreator/rinotagliato.png",
  },
  {
    blurred:
      "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/MusicianCreator/qualcunoblur.png",
    clear:
      "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/MusicianCreator/qualcunoclear.png",
  },
  {
    blurred:
      "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/MusicianCreator/signorablur.png",
    clear:
      "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/MusicianCreator/signoraclear.png",
  },
  {
    blurred:
      "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/MusicianCreator/ELIO+B.png",
    clear:
      "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/MusicianCreator/ELIO+T.png",
  },
  {
    blurred:
      "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/MusicianCreator/ELIO+B.png",
    clear:
      "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/MusicianCreator/ASTRO+T.png",
  },
];
const MainContent = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setOpacity(0); // Imposta l'opacità a 0

      setCurrentImage((prevImage) => (prevImage + 1) % immagini.length);
      setOpacity(1); // Riporta l'opacità a 1
    }, 9000); // Cambia immagine ogni 3 secondi

    return () => clearInterval(intervalId);
  }, []);

  const playMusic = () => {
    // Qui metterai il codice per riprodurre la musica
    console.log("Play music");
  };

  return (
    <div className="image-music container-fluid ">
      <div className="shadow"></div>

      <Image
        src={immagini[currentImage].blurred}
        alt="immagini di aritisti varii sfocati"
        layout="fill"
        objectFit="cover"
        className="blurra img-fullscreen"
      />

      <Image
        src={immagini[currentImage].clear}
        alt="immagini di aritisti varii dell'immagine chiara"
        width={200}
        height={200}
        className="img-sovra img-fullscreen"
      />
      <div className="blur-overlay"></div>
      <div className="text-overlay">
        <p className="fs-5 text-primary my-0 ms-md-3 ms-0">Dorida Music</p>
        <h1 className="text-white text-start fw">Arte musicale</h1>
        <button
          className="Call-Button my-0 d-md-none d-block rotondo d-none "
          id="callnone"
          onClick={playMusic}
        >
          <FiPlay className="text-ce" />
        </button>
      </div>
    </div>
  );
};
export default MainContent;
