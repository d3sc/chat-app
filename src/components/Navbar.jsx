import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const user = useContext(AuthContext);
  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <div className="profile">
          <img src={user.photoURL} alt="profile-alt" />
          <span>{user.displayName}</span>
        </div>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  );
}
