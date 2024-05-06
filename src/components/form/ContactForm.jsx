import React, { useState, useEffect } from "react";
import gsap from "gsap";
import "./cssforms/contactForm.css";

const initialFormData = {
  nome: "",
  email: "",
  messaggio: "",
  persona: "Dorida Solution",
  telefono: "",
};

const ContactForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.nome) {
      newErrors.nome = "Il nome è obbligatorio";
    }
    if (!formData.email) {
      newErrors.email = "L'email è obbligatoria";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Formato email non valido";
    }
    if (!formData.messaggio) {
      newErrors.messaggio = "Il messaggio è obbligatorio";
    }
    if (!formData.telefono) {
      newErrors.telefono = "Il numero di telefono è obbligatorio";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await fetch("/api/contatti", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          alert("Grazie per il tuo messaggio!");
          setFormData(initialFormData); // Reset form
        } else {
          throw new Error(data.message || "Qualcosa è andato storto");
        }
      } catch (error) {
        console.error("Error:", error);
        alert(error.message);
      }
    } else {
      setErrors(newErrors);
    }
  };

  

  return (
    <div className="contact-form-container">
      <form id="customContactForm" onSubmit={handleSubmit}>
        <h2 className="contact-form-title text-white">Contattaci</h2>
        <div className="contact-input-group">
          <input
            type="text"
            id="contactName"
            name="nome"
            required
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome"
          />
          {errors.nome && <p className="error">{errors.nome}</p>}
        </div>
        <div className="contact-input-group">
          <input
            type="email"
            id="contactEmail"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="tuamail@gmail.com"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="contact-input-group">
          <textarea
            id="contactMessage"
            name="messaggio"
            rows="4"
            required
            value={formData.messaggio}
            onChange={handleChange}
            placeholder="scrivere qui il tuo messaggio"
          ></textarea>
          {errors.messaggio && <p className="error">{errors.messaggio}</p>}
        </div>
        <div className="contact-input-group">
          <input
            type="text"
            id="contactNumber"
            name="telefono"
            required
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Tuo numero +39 378378378"
          />
          {errors.telefono && <p className="error">{errors.telefono}</p>}
        </div>
        <button type="submit" className="contact-submit-btn">
          Invia
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
