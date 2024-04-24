"use client"
import { useEffect, useState } from 'react';
import useAdminCheck from '../Hook/useAdminCheck'; // Adjust the path as per your project structure
import Router from 'next/router';

function Contact() {
    useAdminCheck();  // Performs the admin access check
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        persona: '',
        email: '',
        data: ''
    });

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
                    throw new Error('Failed to fetch contacts');
                }

                const data = await response.json();
                setContacts(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchContacts(); // Call the function within the useEffect hook
    }, [filters]); // Dependency array includes filters to refetch when they change

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div class="container mt-4">
    <h2 class="mb-4">Contatti</h2>
    <table class="table table-hover">
        <thead class="thead-dark">
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
