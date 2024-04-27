import { useState } from "react";

function AddSongsToAlbum({ albumId, userId }) {
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [category, setCategory] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Preparazione dei dati della canzone con l'album_id e user_id passati via props
      const songData = {
        album_id: albumId,
        user_id: userId,
        title,
        duration,
        file_url: fileUrl,
        category
      };
  
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/songs/song/${albumId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(songData)
        });
        const data = await response.json();
        if (response.ok) {
          alert('Canzone aggiunta con successo!');
          // Aggiorna lo stato o reindirizza se necessario
        } else {
          alert(`Errore: ${data.message}`);
        }
      } catch (error) {
        console.error('Errore durante l’aggiunta della canzone:', error);
        alert('Errore durante l’aggiunta della canzone');
      }
    };
  
    return (
      <div className="container mt-4">
      <h1 className="mb-3">Aggiungi una canzone</h1>
      <form onSubmit={handleSubmit} className="shadow p-3 mb-5 bg-body rounded">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Titolo"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            placeholder="Durata"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={fileUrl}
            onChange={e => setFileUrl(e.target.value)}
            placeholder="URL del file"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={e => setCategory(e.target.value)}
            placeholder="Categoria"
          />
        </div>
        <button type="submit" className="btn btn-primary">Aggiungi Canzone</button>
      </form>
    </div>
    );
  }
  
  export default AddSongsToAlbum;
  