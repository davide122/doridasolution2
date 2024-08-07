"use client"
import { useEffect, useState } from 'react';
import useAdminCheck from '../Hook/useAdminCheck';
import { useAlert } from "../AlertComponent/AlertContext";

function Contact() {
    const { showAlert } = useAlert();
    useAdminCheck();
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({ persona: '', email: '', data: '' });

    useEffect(() => {
        const fetchContacts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication required.');
                return;
            }

            const queryParams = new URLSearchParams(filters);

            try {
                const response = await fetch(`/api/contatti?${queryParams.toString()}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    showAlert("Purtroppo non siamo riusciti a recuperare i contatti, contatta l'assistenza", 'danger');
                    throw new Error('Failed to fetch contacts');
                }

                const data = await response.json();
                showAlert("Contatti trovati", 'success');
                setContacts(data);
            } catch (error) {
                showAlert("Purtroppo non siamo riusciti a recuperare i contatti, contatta l'assistenza", 'danger');
                setError(error.message);
            }
        };

        fetchContacts();
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Contatti</h2>
            <table className="table table-hover table-hover-custom">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Persona di riferimento</th>
                        <th scope="col">Messaggio</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact, index) => (
                        <tr key={contact.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{contact.nome}</td>
                            <td><a href={`mailto:${contact.email}`} className="email-link">{contact.email}</a></td>
                            <td>{contact.persona}</td>
                            <td>{contact.messaggio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Contact;
