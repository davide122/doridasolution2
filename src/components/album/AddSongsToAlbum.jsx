import React, { useState } from 'react';

function AddSongsToAlbum({ albumId, userId}) {
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    fileUrl: '',
    album_id: albumId, // preset album_id passed as a prop
    user_id: userId,   // preset user_id passed as a prop
    category: ''   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSong(formData);
    // Reset the form data
    setFormData({
      title: '',
      duration: '',
      fileUrl: ''
    });
  };

  return (
    <div>
      <h3>Aggiungi una nuova canzone</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Titolo</label>
          <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">Durata</label>
          <input type="text" className="form-control" id="duration" name="duration" value={formData.duration} onChange={handleChange} required />
        </div>  
        <div className="mb-3">
          <label htmlFor="fileUrl" className="form-label">URL File</label>
          <input type="text" className="form-control" id="fileUrl" name="fileUrl" value={formData.fileUrl} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Aggiungi</button>
      </form>
    </div>
  );
}

export default AddSongsToAlbum;
