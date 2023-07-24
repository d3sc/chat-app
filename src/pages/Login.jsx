import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      if (!email || !password) throw "The field must be filled!";
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err);
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat App</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button>Sign In</button>
          {err && <span>Something Went Wrong</span>}
        </form>
        <p>
          You don't have an account? <Link to={"/register"}>Register</Link>
        </p>
        <div className="mobile-info">
          <span>jika anda memenukan bug / kesalahan, tolong hubungi admin</span>
          <br />
          <span>
            dengan cara ketik <b>admin</b>, pada Find a user
          </span>
        </div>
      </div>
    </div>
  );
}
