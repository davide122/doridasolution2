"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAlert } from "../../components/AlertComponent/AlertContext";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../app/features/authSlice';
import Image from "next/image";

function LoginPage() {
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  // Recupera le credenziali salvate in localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true); // Se sono salvate, il checkbox è attivato
    }
  }, []);

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
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      localStorage.setItem("token", data.token);

      // Salva le credenziali se "Ricordati di me" è selezionato
      if (rememberMe) {
        localStorage.setItem("savedEmail", email);
        localStorage.setItem("savedPassword", password);
      } else {
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("savedPassword");
      }

      router.push(data.redirectUrl);
    } else {
      setError(data.message);
      showAlert(data.message, "danger");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row flex-row-reverse">
        <div className="col-md-6 d-none d-md-block fill">
          <Image
            src={
              "https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/donna2.svg"
            }
            alt="Donna che canta in versione Cartone Animato di dorida solution"
            width={500}
            height={500}
            className="svglogin"
          />
        </div>
        <div className="col-12 col-md-6 vh-100 d-flex justify-content-center align-items-center bg-white">
          <div className="w-75">
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
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Ricordati di me
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary text-white w-100 mb-3"
              >
                Accedi
              </button>
              <Link
                className="btn btn-danger text-black w-100 mb-3 bg-white"
                href={"/register"}
              >
                Registrati
              </Link>
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
