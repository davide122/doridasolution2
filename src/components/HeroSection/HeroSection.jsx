"use client";
import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import Image from "next/image";
import imageHumanSrc from "../../../public/image/Screenshot 2024-03-26 alle 12.03.30.png"; // Assicurati di spostare l'immagine nella cartella public
import ChatWithGPT from "../ChatGpt/ChatWithGP"; // Aggiorna il percorso se necessario
import { BsChatDots, BsRobot } from "react-icons/bs";
import Tippy from "@tippyjs/react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./herosection.css"
// Attiva il plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({iswait}) => {
  const [showSpline, setShowSpline] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 700);
  
    // Imposta l'animazione con GSAP
    if (!isMobile) {
      // Animazione della testa che si muove sull'asse x e z e poi scompare
      gsap.fromTo(
        ".spline-object",
        { x: 0, z: 0 },
        { x: 50, z: 50, duration: 1, ease: "power1.inOut", scrollTrigger: {
          trigger: ".spline-object",
          start: "top top", // Inizia quando la testa entra nella viewport
          end: "bottom top", // Fine quando la testa esce dalla viewport
          scrub: true, // Animazione fluida basata sullo scroll
        }}
      );
    }
  }, [isMobile]);
  

  const handleButtonClick = () => {
    setShowSpline(!showSpline);
  };

  return (
    <div className="container my-4 hero-section">
      <div className="row vh-100  ">
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center align-items-md-start text-center text-md-left  hero-text   ">
          <h1 className="text-white intro Title mb-0">
            La Dorida Solution{" "}
            <span className="d-none d-xl-block mb-3 textlill">è qui per te.</span>
          </h1>
          <h2 className="text-white Title2 d-md-none textlill ">è qui per aiutarvi</h2>
        
           
            <Link
              href="/contact"
              className="btn-glassmorphism btn-large  my-2 text-decoration-none my-4 d-none d-md-block "
            >
              Richiedi una consulenza gratuita 
            </Link>
          
            <Link
              href="/contact"
              className="btn-glassmorphism btn-large  my-2 text-decoration-none my-4 d-md-none  "
            >
              Richiedi una consulenza  
            </Link>
          <div className="Utilies mb-4">
            <ChatWithGPT className="buttontalk" />
          </div>
        </div>

        <div className="col-12 col-md-6">
        {iswait && (
        <div className="Nuvoletta">
          <Image
            src="/image/loaderrombo.png"
            width={100}
            height={100}
            alt="Nuvoletta Loading"
          />
        </div>
      )}
          <div className="spline-object vh-100 d-none d-md-block rounded-circle">
            <Spline
              scene="https://prod.spline.design/fG63sTT4o138JOix/scene.splinecode"
            />
          </div>
          <div className="d-block d-md-none mx-0">
            <Image
              src={imageHumanSrc}
              alt="Immagine di nova, un ai di dorida solution"
              className="imgHuman"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
