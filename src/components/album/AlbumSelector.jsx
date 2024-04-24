"use client"
import React, { useState, useEffect } from 'react';
import AddSongForm from './AddSongForm'; // Assumi che questo componente sia quello che abbiamo definito prima

function AlbumSelector() {
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch('/api/songs/normal');
                if (!response.ok) throw new Error('Failed to fetch albums');
                const data = await response.json();
                setAlbums(data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchAlbums();
    }, []);

    const handleSelectAlbum = (album) => {
        setSelectedAlbum(album);
    };

    return (
        <div className="container mt-4">
            <h2>Select an Album to Add Songs</h2>
            {albums.length > 0 ? (
                <ul className="list-group">
                    {albums.map(album => (
                        <li key={album.id} className="list-group-item">
                            {album.title} - {album.release_date}
                            <button onClick={() => handleSelectAlbum(album)} className="btn btn-small btn-primary ml-2">Select</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No albums found.</p>
            )}

            {selectedAlbum && (
                <div>
                    <h3>Add a Song to: {selectedAlbum.title}</h3>
                    <AddSongForm albumId={selectedAlbum.id} />
                </div>
            )}
        </div>
    );
}

export default AlbumSelector;
