"use client"
import React, { useState, useEffect } from 'react';
import { useAlert } from "../AlertComponent/AlertContext";

function AlbumManager() {
    const { showAlert } = useAlert();
    const [albums, setAlbums] = useState([]);
    const [currentAlbum, setCurrentAlbum] = useState(null);
    const [formMode, setFormMode] = useState('add');
    const [formData, setFormData] = useState({ title: '', release_date: '', cover_url: '', description: '' });

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        try {
            const response = await fetch('/api/songs/normal');
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setAlbums(data);
            showAlert('Album trovati!', 'success');
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = formMode === 'add' ? 'POST' : 'PUT';
        const endpoint = formMode === 'add' ? '/api/songs/album/admin' : `/api/songs/album/admin/${currentAlbum.id}`;

        try {
            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('Failed to submit');

            await fetchAlbums();
            setFormMode('add');
            setFormData({ title: '', release_date: '', cover_url: '', description: '' });
            showAlert('Album aggiunto!', 'success');
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    const handleEdit = (album) => {
        setFormMode('edit');
        setCurrentAlbum(album);
        setFormData({ ...album });
    };

    const handleDelete = async (albumId) => {
        try {
            const response = await fetch(`/api/songs/album/${albumId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete');
            await fetchAlbums();
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    return (
        <div className="container mt-4">
            <h2>{formMode === 'add' ? 'Add New Album' : 'Edit Album'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleFormChange} className="form-control form-control-custom" />
                </div>
                <div className="form-group">
                    <label>Release Date:</label>
                    <input type="date" name="release_date" value={formData.release_date} onChange={handleFormChange} className="form-control form-control-custom" />
                </div>
                <div className="form-group">
                    <label>Cover URL:</label>
                    <input type="text" name="cover_url" value={formData.cover_url} onChange={handleFormChange} className="form-control form-control-custom" />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleFormChange} className="form-control form-control-custom" />
                </div>
                <button type="submit" className="btn btn-primary">{formMode === 'add' ? 'Add' : 'Update'}</button>
            </form>
            <h3 className="mt-4">Album List</h3>
            <ul className="list-group">
                {albums.map(album => (
                    <li key={album.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {album.title} - {album.release_date}
                        <div>
                            <button onClick={() => handleEdit(album)} className="btn btn-info btn-sm mx-2">Edit</button>
                            <button onClick={() => handleDelete(album.id)} className="btn btn-danger btn-sm">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AlbumManager;
