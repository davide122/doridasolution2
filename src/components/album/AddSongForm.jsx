import React, { useState } from 'react';

function AddSongForm({ albumId }) {
    const [songData, setSongData] = useState({
        title: '',
        duration: '',
        file_url: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSongData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Assicurati che il token sia salvato in localStorage

        try {
            const response = await fetch('/api/songs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...songData, album_id: albumId })
            });
            if (!response.ok) {
                throw new Error('Failed to add song');
            }
            const result = await response.json();
            alert('Song added successfully: ' + result.title);
            setSongData({ title: '', duration: '', file_url: '' }); // Reset form
        } catch (error) {
            console.error('Add song error:', error);
            alert('Error adding song: ' + error.message);
        }
    };

    return (
        <div className="container mt-3">
            <h2>Add a Song to Album</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={songData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="duration">Duration</label>
                    <input
                        type="text"
                        className="form-control"
                        id="duration"
                        name="duration"
                        value={songData.duration}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="file_url">File URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="file_url"
                        name="file_url"
                        value={songData.file_url}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Song</button>
            </form>
        </div>
    );
}

export default AddSongForm;
