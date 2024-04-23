"use client";
import { useState } from "react";
import Router from "next/router";
import Link from "next/link";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      // Salva il token JWT nel localStorage o in un cookie
      localStorage.setItem("token", data.token);
      // Reindirizza l'utente in base al tipo
      Router.push(data.redirectUrl);
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="container-fluid">
    <div className="row flex-row-reverse">
      <div className="col-md-6 d-none d-md-block fill  ">
    <img src="https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/donna2.svg" alt="" className="svglogin" />
        <div className="vh-100 d-flex flex-column justify-content-center align-items-center  text-white position-relative z-1">
          <h1 className="fs-1">Sei un artista emergente?</h1>
          <h3 className="my-2">e non hai un account?</h3>
          <div className="login-button mt-4">
          <Link href="/register " className="text-decoration-none " passHref>
         Registrati ora!
          </Link>

          </div>
        </div>

      </div>
      <div className="col-12 col-md-6 vh-100 d-flex justify-content-center align-items-center bg-white">
        <div className="w-md-75 ">
          <form onSubmit={handleLogin} className="form-container">
          <h2 className="text-start ms-2 mb-4">Login</h2>
            <div className="mb-3">
                <label htmlFor="email">Username</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <label htmlFor="password">Password</label>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-flex justify-content-between mb-4">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe"/>
                <label className="form-check-label" htmlFor="rememberMe">Ricordati di me</label>
              </div>
              <a href="#" className="text-decoration-none text-black">Hai dimenticato la password?</a>
            </div>
            <button type="submit" className="btn btn-danger w-100 mb-3">
              Sign In
            </button>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}

export default LoginPage;
