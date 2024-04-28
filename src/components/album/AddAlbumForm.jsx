import React, { useState } from 'react';

function AddAlbumForm() {
    const [formData, setFormData] = useState({
        title: '',
        release_date: '',
        cover_url: '',
        description: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const token = localStorage.getItem('token'); // Assicurati che il token sia memorizzato
            const response = await fetch('/api/songs/album', { // Assicurati che l'endpoint sia corretto
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Errore durante l\'invio dei dati');
            }

            setMessage('Album aggiunto con successo!');
            setFormData({
                title: '',
                release_date: '',
                cover_url: '',
                description: ''
            });
        } catch (error) {
            setMessage(`Errore: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div className="container mt-5">
        <h1 className='text-white fs-3 text-center'>Aggiungi un nuovo album</h1>
        <form onSubmit={handleSubmit} className='text-white shadow p-3 mb-5 bg-body rounded'>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Titolo</label>
                <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="release_date" className="form-label">Data di Rilascio</label>
                <input type="date" className="form-control" id="release_date" name="release_date" value={formData.release_date} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="cover_url" className="form-label">URL Copertina</label>
                <input type="url" className="form-control" id="cover_url" name="cover_url" value={formData.cover_url} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Descrizione</label>
                <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                {isLoading ? 'Invio...' : 'Aggiungi Album'}
            </button>
        </form>
        {message && <p className="mt-3">{message}</p>}
    </div>
    );
}

export default AddAlbumForm;
