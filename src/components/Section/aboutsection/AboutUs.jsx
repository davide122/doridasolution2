"use client";
import about from "../../About/about.json";
import useMultipleViewportVisibility from "../../Hook/useMultipleViewportVisibility";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const AboutUs = () => {

    const [currentColor, setCurrentColor] = useState("#FFFFFF");  // Default color
    const [modalShow, setModalShow] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const observerOptions = {
      rootMargin: "0px",
      threshold: 0.5, // Modifica questo valore per essere più preciso
    };
    const [visibility, sectionRefs] = useMultipleViewportVisibility(
      about.length,
      observerOptions
    );

    const handleSubmit = async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const data = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        persona: selectedPerson,
        messaggio: formData.get('messaggio')
      };

      // Qui esegui la chiamata POST
      const response = await fetch('/api/contatti', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });

      if (response.ok) {
          alert("Messaggio inviato con successo!");
          setModalShow(false);
      } else {
          alert("Errore nell'invio del messaggio!");
      }
  };
    const textVariants = (color) => ({
        visible: {
          opacity: 1,
          transition: { duration: 0.2 },
          background: `linear-gradient(90deg, ${color}, #ffff)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent"
      },
        hidden: { color: "#FFFF", transition: { duration: 0.2 }, },
      });
    
      const imageVariants = {
        visible: {
          scale: 1.1,
          transition: { duration: 0.9 },
        },
        hidden: { scale: 1 },
      };
    
      useEffect(() => {
        const visibleIndex = visibility.findIndex(vis => vis);
        if (visibleIndex !== -1) {
          setCurrentColor("A"+about[visibleIndex].color.slice(1,1000));
        }
      }, [visibility]);
    return(
        <div className="container mt-4 ">
        {about.map((person, index) => (
          <div
          className={`row ${((index + 2) % 2 === 0) ? "flex-row-reverse" : ""}`}
            key={person.id}
            ref={sectionRefs.current[index]}
          >
            <div className="col-md-6 col-sm-12 vh-md-100 d-flex justify-content-center align-items-center">
              <div>
                <cite className="text-white text-start">{person.work}</cite>
                <motion.h1
                  variants={textVariants(person.color)}
                  initial="hidden"
                  animate={visibility[index] ? "visible" : "hidden"}
                  className="Title text-white text-start w-100 "
                  id=""
                >
                  {person.title}
                  
                </motion.h1>

                <p className="fs-5 stretch">{person.description}</p>
                <button onClick={() => { setSelectedPerson(person.title); setModalShow(true); }} className={`text-white btn w-175 ${"A"+person.color.slice(1,1000)} text-start`}>Contatta {person.title}</button>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 vh-md-100 my-0 d-flex justify-content-center align-items-center over">
              <motion.img
                src={person.image}
                alt={person.title}
                className="img-fluid person"
                variants={imageVariants}
                initial="hidden"
                animate={visibility[index] ? "visible" : "hidden"}
              />
            </div>
          </div>
        ))}
  <div>

<Modal  show={modalShow} onHide={() => setModalShow(false)} centered >
                <Modal.Header closeButton>
                    <Modal.Title className="text-center w-100">Contatta {selectedPerson}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={currentColor}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formNome">
                            <Form.Label className="text-white">Nome</Form.Label>
                            <Form.Control type="text" name="nome" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label  className="text-white">Email</Form.Label>
                            <Form.Control type="email" name="email" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formMessaggio">
                            <Form.Label className="text-white">Messaggio</Form.Label>
                            <Form.Control as="textarea" rows={3} name="messaggio" required />
                        </Form.Group>
                        <Button type="submit" className={`${currentColor} w-100`}>
                            Invia Messaggio
                        </Button>

                    </Form>
                </Modal.Body>
            </Modal>
  </div>
      </div>
    )

}
export default AboutUs;