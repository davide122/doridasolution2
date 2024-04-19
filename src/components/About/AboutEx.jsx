import React from 'react';
import { motion } from 'framer-motion';
import './AboutPagecss/About.css';  // Ensure the CSS is imported

const aboutData = [
  {
    title: "Chi Siamo",
    content: "Dorida Solution è una web agency digitale all'avanguardia...",
    id: "chi-siamo",
    icon: "path/to/chi-siamo-icon.svg"
  },
  {
    title: "I Nostri Servizi",
    content: "Nata dall'unione di professionisti appassionati e visionari...",
    id: "servizi",
    icon: "path/to/servizi-icon.svg"
  },
  // Add more sections as needed
];

const sectionVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.4, duration: 0.8 }
  }
};

const AboutEx = () => {
  return (
    <div className="about-us-container">
      <motion.div className="hero-sectionn "
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
      >
        <h1>Welcome to Dorida Solution</h1>
        <p>Leading innovation in the digital world.</p>
      </motion.div>

      <div className="sections">
        {aboutData.map((section, index) => (
          <motion.div key={index} className="section"
            variants={sectionVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
          >
            <img src={section.icon} alt={section.title} className="section-icon"/>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AboutEx;
