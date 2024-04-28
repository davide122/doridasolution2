import { useState } from "react";

function AddSongsToAlbum({ albumId, userId }) {
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [category, setCategory] = useState('');
    const [imageSongs, setimageSongs] = useState('');
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Preparazione dei dati della canzone con l'album_id e user_id passati via props
      const songData = {
        album_id: albumId,
        user_id: userId,
        title,
        duration,
        file_url: fileUrl,
        category,
        image_songs: imageSongs
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
      <div className="container mt-4 ">
      <h1 className="mb-3 text-white fs-4 text-center">Aggiungi una canzone</h1>
      <form onSubmit={handleSubmit} className=" p-3 mb-5">
        <div className="mb-3">
          <input
            type="text"
            className="form-control rounded-0"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Titolo"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control rounded-0"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            placeholder="Durata"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control rounded-0"
            value={fileUrl}
            onChange={e => setFileUrl(e.target.value)}
            placeholder="URL del file"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control rounded-0"
            value={category}
            onChange={e => setCategory(e.target.value)}
            placeholder="Categoria"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control rounded-0"
            value={imageSongs}
            onChange={e => setimageSongs(e.target.value)}
            placeholder="Immagine...(url)"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Aggiungi Canzone</button>
      </form>
    </div>
    );
  }
  
  export default AddSongsToAlbum;
  