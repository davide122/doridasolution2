"use client";
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmartphoneSection() {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      // Animazione di zoom iniziale dello smartphone su desktop
      gsap.fromTo(
        '.smartphone-mockup',
        { scale: 2.5, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: '.smartphone-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            pin: true,
            pinSpacing: true,
          },
        }
      );

      // Animazione dei testi nelle colonne
      gsap.utils.toArray('.col-text').forEach((text, i) => {
        gsap.fromTo(
          text,
          { opacity: 0.4, color: '#999', y: 50 },
          {
            opacity: 1,
            color: '#fff',
            y: 0,
            scrollTrigger: {
              trigger: text,
              start: 'top 90%',
              end: 'top 60%',
              scrub: true,
              ease: "power3.out",
            },
          }
        );
      });

      // Animazione finale con sfondo bianco e testo grande "NOI SIAMO IL FUTURO"
      gsap.to('.white-background', {
        backgroundColor: '#fff',
        color: '#000',
        scrollTrigger: {
          trigger: '.white-background',
          start: 'top 90%',
          scrub: true,
          pin: true,
          pinSpacing: false,
        },
      });

      gsap.fromTo(
        '.big-text',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: '.white-background',
            start: 'top 90%',
            scrub: true,
          },
        }
      );
    } else {
      // Per mobile: immagine statica in verticale
      const smartphoneMockup = document.querySelector('.smartphone-mockup');
      if (smartphoneMockup) {
        smartphoneMockup.style.transform = 'none'; // Nessuna trasformazione
        smartphoneMockup.style.scale = '1'; // Immagine alla scala normale
        smartphoneMockup.style.opacity = '1'; // Assicurarsi che l'immagine sia visibile
        smartphoneMockup.style.position = 'relative'; // Posizione normale
      }
    }
  }, []);

  return (
    <section className="smartphone-section" style={{ height: '300vh', position: 'relative' }}>
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="smartphone-mockup">
          <div className="smartphone-frame">
            <img src="https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/animazione.png" alt="Smartphone" className="smartphone-image" />
          </div>
        </div>
      </div>
      
      {/* Testo in due colonne */}
     

      {/* Nuove sezioni di testo */}
    

      
      
    </section>
  );
}
