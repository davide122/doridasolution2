"use client";
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin'; // Importa TextPlugin

gsap.registerPlugin(TextPlugin); // Registra TextPlugin

export default function IntroOverlay() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeline = gsap.timeline();

    // Effetto di scrittura typewriting con testo suddiviso in blocchi
    timeline.to(".typewriter-text", {
      text: "Non siamo un&apos;agenzia come le altre.",
      duration: 1,
      ease: "power3.inOut",
      delay: 0.2, 
    })
    .to(".typewriter-text-2", {
      text: "Siamo Dorida Solution",
      duration: 1,
      ease: "power3.inOut",
      delay: 0.2,
    })
    .to(".typewriter-text-3", {
      text: "dove innovazione e qualità si incontrano al giusto prezzo.",
      duration: 1.2,
      ease: "power3.inOut",
    })
    .to(".shock-quote", {
      opacity: 1,
      y: -20, // Sposta leggermente la citazione verso l'alto mentre appare
      duration: 1.5,
      ease: "power3.out",
      onComplete: () => {
        setTimeout(() => setIsVisible(false), 1000); // Chiudi automaticamente dopo 3 secondi
      }
    });

    // Chiudere al clic
    const closeOverlay = () => {
      setIsVisible(false);
    };

    document.querySelector('.overlay-container').addEventListener('click', closeOverlay);

    return () => {
      document.querySelector('.overlay-container').removeEventListener('click', closeOverlay);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="overlay-container">
      <div className="typewriter">
        <p className="typewriter-text"></p>
        <p className="typewriter-text-2"></p>
        <p className="typewriter-text-3"></p>
      
      </div>
    </div>
  );
}
