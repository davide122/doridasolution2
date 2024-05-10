"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

function RegisterPage() {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    is_artist: false,
    artist_bio: "",
    profile_picture_url: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      Router.push("/login"); // Reindirizza alla pagina di login dopo la registrazione
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-6 d-none d-md-block  fill ">
        <Image src={"https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/uomo.svg"}
        width={500}
        height={500}
        alt='Uomo che canta in versione cartoon dorida solution'
        className='svglogin2'
        />
        
        </div>
        <div className="col-12 col-md-6 vh-100 d-flex justify-content-center align-items-center bg-white">
          <div className="w-100">
            <form onSubmit={handleSubmit} className="form-container">
            <h2 className="text-start ms-2 mb-4">Registrazione</h2>
                <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className='form-control'
                required
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className='form-control'
                placeholder="Email"
                required
              />
                <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className='form-control'
                required
              />
              <label>
                <input
                  type="checkbox"
                  name="is_artist"
                  checked={formData.is_artist}
                  onChange={handleChange}
                  className='form-check-input'
                />{" "}
                Sei un artista?
              </label>
              {formData.is_artist && (
                <>
                <label htmlFor="artist_bio">Biografia</label>
                  <textarea
                    name="artist_bio"
                    value={formData.artist_bio}
                    onChange={handleChange}
                    placeholder="Biografia dell'artista"
                    className='form-control'
                  />
                   <label htmlFor="profile_picture_url">Immagine profilo</label>
                  <input
                    type="text"
                    name="profile_picture_url"
                    value={formData.profile_picture_url}
                    onChange={handleChange}
                    placeholder="URL immagine del profilo"
                    className='form-control'
                  />
                </>
              )}
              <button type="submit" className='btn btn-danger w-100 mb-3'>Registra</button>
              {error && <p>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;



