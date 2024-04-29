import React, { useState } from 'react';
import "./cssforms/contactForm.css"
const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        number:""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/contatti', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                alert('Thank you for your message!');
                setFormData({ name: '', email: '', message: '' }); // Reset form
            } else {
                throw new Error(data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    return (
        <div className="contact-form-container">
            <form id="customContactForm" onSubmit={handleSubmit}>
                <h2 className="contact-form-title">Contattaci</h2>
                <div className="contact-input-group">
                    <label htmlFor="contactName">Name:</label>
                    <input type="text" id="contactName" name="name" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="contact-input-group">
                    <label htmlFor="contactEmail">Email:</label>
                    <input type="email" id="contactEmail" name="email" required value={formData.email} onChange={handleChange} />
                </div>
                <div className="contact-input-group">
                    <label htmlFor="contactMessage">Message:</label>
                    <textarea id="contactMessage" name="message" rows="4" required value={formData.message} onChange={handleChange}></textarea>
                </div>
                <div className="contact-input-group">
                    <label htmlFor="Number">Numero</label>
                    <textarea id="contactnumber" name="Number" required value={formData.number} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="contact-submit-btn">Send</button>
            </form>
        </div>
    );
};

export default ContactForm;
