import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useTransform, useViewportScroll } from 'framer-motion';
import useViewportVisibility from '../Hook/useViewportVisibility';
import './AboutPagecss/About.css';

import MyNavbar from '../Commons/Headers/MyNavbar';
import AboutEx from './AboutEx';
const aboutData = [
    {
      id: 1,
      title: "Dorin ciofalo - Digital Marketing",
      description: "Dorida Solution è all'avanguardia nelle strategie di digital marketing, puntando su innovazione e personalizzazione per raggiungere il pubblico target.",
      image: "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/FotoNostre/dorin.png", // Sostituisci con il percorso effettivo dell'immagine
    },
    {
      id: 2,
      title: "Davide Marchica - Full stack Web Developer",
      description: "Specialisti nello sviluppo di soluzioni web full-stack, creiamo esperienze digitali coinvolgenti e performanti, adattate alle esigenze di ogni cliente.",
      image: "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/FotoNostre/davide.png", // Sostituisci con il percorso effettivo dell'immagine
    },
    {
      id: 3,
      title: "Rino Ciofalo - Song writer",
      description: "Esploriamo costantemente nuovi orizzonti nell'AI per offrire servizi che trasformano le operazioni aziendali e forniscono insight senza precedenti.",
      image: "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/FotoNostre/rino.png", // Sostituisci con il percorso effettivo dell'immagine
    },
  ];

const AboutUsSection = ({ title, description, image }) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isVisible = useViewportVisibility(ref);
  const { scrollYProgress } = useViewportScroll();
  const yRange = useTransform(scrollYProgress, [0.2, 0.8], ['20%', '-20%']);

  useEffect(() => {
    if (isVisible) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, isVisible]);

  

  const variants = {
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
    hidden: { opacity: 0, scale: 0.8 },
  };

  return (
    <motion.div className="about-section" ref={ref} style={{ height: '100vh' }}>
      <motion.div className="container h-100" animate={controls} initial="hidden" variants={variants}>
        <div className="row h-100 align-items-center">
          <motion.div className="col-lg-6 text-container">
            <motion.h2 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>{title}</motion.h2>
            <motion.p initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}>{description}</motion.p>
          </motion.div>
          <motion.div className="col-lg-6 ">
            <motion.img
              src={image}
              alt={title}
              className="img-fluid mx-5"
              style={{ y: yRange }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 1 } }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AboutUs = () => {
  return (
    <div>
        <MyNavbar className="sticky-top top-0" />
      {aboutData.map((section) => (
        <AboutUsSection key={section.id} {...section} />
      ))}

      <AboutEx/>
    </div>
  );
};

export default AboutUs;
