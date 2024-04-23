"use client"
import React from 'react';
import './Carousel.css';
import { motion } from 'framer-motion';


const Carouseltext = () => {
  const Services = [
    "Digital marketing",
    "brand identity",
    "Analisi di mercato",
    "Seo optimization",
    "Social Media Managment",
    "Sviluppo web Full stack",
    "E-commerce",
    "Gestione e ottimizzazione Gestionali",
    "Gestione Inventario",
    "Servizi AI",
    "Influencer",
    "pagine avviate",
    "Campagne Google Ads e Meta Ads",
    "Email Marketing",
    "Video promozionali",
    "Jingle vocali e musicali",
    "Trasformazione autobiografie in libri",
    "Consulenze per musicisti emergenti",
    "Logo design",
    "Web design",
    "Copywriting",
    "Formazione Digitale",
    "Strategie pubblicitarie"
  ]
  const ExtendedServices = [...Services, ...Services];
  return (
    <div className="carousel2">
      <div className="scrolling-container me-5">
        {ExtendedServices.map((service, index) => (
          <motion.div 
            key={index} 
            className="service-box "
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: (index % Services.length) * 0.2 }}
          >
            <p className='fs-4'>{service}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );

};

export default Carouseltext;
