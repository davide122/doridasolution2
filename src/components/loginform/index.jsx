"use client";
import React from 'react';
import { useFormState, useFormStatus } from "react-dom";
import localFont from "next/font/local";

// Load local fonts using the new Next.js font optimization feature

const authenticate = async (_e, data) => {
  console.log(data);
  console.log(JSON.stringify({email:data.target[0].value, password:data.target[1].value}));
  try {
    const res = await fetch(
      "/api/user/authenticate/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:data.target[0].value, password:data.target[1].value},),
        
      }
    );
      if (res) {
        console.log(res)
        const user = await res.json();
          return user;

      } else {
        return null;
      }
    } catch (error) {
        console.error("Error authenticating:", error);
        throw error;
      }
    
  
};
const rememberMe = data.target[2].checked;
if (rememberMe) {
  localStorage.setItem("savedEmail", data.target[0].value);
  localStorage.setItem("savedPassword", data.target[1].value);
} else {
  localStorage.removeItem("savedEmail");
  localStorage.removeItem("savedPassword");
}
export default function LoginForm() {
  // Use useFormState hook to manage form submission and state
  const [code, action] = useFormState(authenticate, undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // Prevent the default form submission
        action(e);
      }}
      className={`mb-3`} // Apply font style
    >
      <div className="p-4 bg-light rounded">
        <h1 className={`mb-3 h2`}>Please log in to continue.</h1>
        {code}
        <div className="container-fluid">
          <div className="mb-4">
            <label className="form-label mb-2 mt-3" htmlFor="email">Email</label>
            <div className="position-relative">
            <input
                className="form-control"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label mb-2 mt-3" htmlFor="password">Password</label>
            <div className="position-relative">
            <input
                className="form-control"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <LoginButton />
        <div className="d-flex mb-2">
          {code === "CredentialSignin" && (
            <>
              <span className="text-danger me-2">⚠️</span>
              <p className="text-danger small mb-0">Invalid credentials</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn-primary w-100 mt-3" disabled={pending}>
      Log in
    </button>
  );
}
