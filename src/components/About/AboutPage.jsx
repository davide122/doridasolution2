"use client";
import about from "./about.json";
import useMultipleViewportVisibility from "../Hook/useMultipleViewportVisibility";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AboutUs from "../Section/aboutsection/AboutUs";
import Typewriter from "../Section/Typewriter";
import Image from "next/image";
const AboutPage = () => {
  const [currentColor, setCurrentColor] = useState("#FFFFFF"); // Default color
  const observerOptions = {
    rootMargin: "0px",
    threshold: 0.5, // Modifica questo valore per essere più preciso
  };
  const [visibility, sectionRefs] = useMultipleViewportVisibility(
    about.length,
    observerOptions
  );

  const textVariants = (color) => ({
    visible: {
      opacity: 1,
      transition: { duration: 0.2 },
      background: `linear-gradient(90deg, ${color}, #ffff)`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      color: "transparent",
    },
    hidden: { color: "#FFFF", transition: { duration: 0.2 } },
  });

  const imageVariants = {
    visible: {
      scale: 1.1,
      transition: { duration: 0.9 },
    },
    hidden: { scale: 1 },
  };

  useEffect(() => {
    const visibleIndex = visibility.findIndex((vis) => vis);
    if (visibleIndex !== -1) {
      setCurrentColor(about[visibleIndex].color);
    }
  }, [visibility]);

  return (
    <div>
      <div className="container mt-4">
        <div className="row ">
          <div className="col-md-6 col-sm-12 vh-md-100 d-flex  justify-content-center align-items-center">
            <div>
              <p className="fs-3 bold text-md-start text-center my-0">
                Verso il futuro...
              </p>
              <h1 className="Title text-white fw text-md-start w-100 text-center my-0">
                Pionieri del digitale
              </h1>
              <p className="fs-6 text-md-start text-center my-3">
                Dorida solution! Affidabilità, Serietà, Competenza, Creatività,
                Eccellenza.
              </p>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 vh-md-100 my-0 d-flex justify-content-center align-items-center over my-0">
            <Image
              src="https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/about/Progetto+senza+titolo+(1).png"
              alt="Foto del gruppo Dorida Solution * Davide marchica - Dorin ciofalo - Rino ciofalo" // Aggiungi una descrizione appropriata
              width={700}
              height={700}
              objectFit="cover" // Assicura che l'immagine copra l'area senza distorcere le proporzioni
              className="img-fluid"
            />
          </div>
        </div>
  
        <AboutUs/>
      </div>
    </div>
  );
};
export default AboutPage;
