"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * Renders the registration page for the application.
 *
 * This component handles the user registration process, including:
 * - Rendering a form with fields for username, email, password, artist status, artist bio, and profile picture URL
 * - Updating the form state as the user types
 * - Submitting the form data to the server for registration
 * - Displaying an error message if the registration fails
 * - Redirecting the user to the login page upon successful registration
 */
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
        <img src="https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/uomo.svg" alt="" className="svglogin2" />
          <div className="vh-100 d-flex flex-column justify-content-center align-items-center  text-white position-relative z-1">
            <h1 className="fs-1">Sei un artista emergente?</h1>
            <h3 className="my-2">e non hai un account?</h3>
            <div className="login-button mt-4">
              <Link href="/login " className="text-decoration-none " passHref>
                Login
              </Link>
            </div>
          </div>
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



