import React, { useContext, useRef, useState } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { Navigate } from "react-router-dom";

export default function Chat() {
  const { data } = useContext(ChatContext);
  const [close, setClose] = useState(false);
  const ref = useRef();

  const chatId = data.chatId;

  const closeHandler = () => {
    setClose(!close);
  };
  return (
    <div ref={ref} className={`chat ${chatId == "null" ? "idle close" : ""} `}>
      <div className="chatInfo">
        <a href="/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
          </svg>
        </a>
        <div className="profile">
          <img src={data.user?.photoURL} alt="User Profile" className="userTargetImage" />
          <span>{data.user?.displayName}</span>
        </div>
        <div className="chatIcons">
          <img src={Cam} alt="Camera" />
          <img src={Add} alt="Add User" />
          <img src={More} alt="More features" />
        </div>
      </div>
      <Messages />
      <Input />
      <div className={`info info-${close} ${chatId == "null" ? "" : "none"}`}>
        <div className={`close`} onClick={closeHandler}>
          X
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M6.787 7h10.426c-.108-.158-.201-.331-.318-.481l2.813-2.812-1.414-1.414-2.846 2.846a6.575 6.575 0 0 0-.723-.454 5.778 5.778 0 0 0-5.45 0c-.25.132-.488.287-.722.453L5.707 2.293 4.293 3.707l2.813 2.812c-.118.151-.21.323-.319.481zM5.756 9H2v2h2.307c-.065.495-.107.997-.107 1.5 0 .507.042 1.013.107 1.511H2v2h2.753c.013.039.021.08.034.118.188.555.421 1.093.695 1.6.044.081.095.155.141.234l-2.33 2.33 1.414 1.414 2.11-2.111a7.477 7.477 0 0 0 2.068 1.619c.479.253.982.449 1.496.58.204.052.411.085.618.118V16h2v5.914a6.23 6.23 0 0 0 .618-.118 6.812 6.812 0 0 0 1.496-.58c.465-.246.914-.55 1.333-.904.258-.218.5-.462.734-.716l2.111 2.111 1.414-1.414-2.33-2.33c.047-.08.098-.155.142-.236.273-.505.507-1.043.694-1.599.013-.039.021-.079.034-.118H22v-2h-2.308c.065-.499.107-1.004.107-1.511 0-.503-.042-1.005-.106-1.5H22V9H5.756z"></path>
        </svg>
        <h2>Pemberitahuan!!</h2>
        <p>jika anda memenukan bug / kesalahan, tolong hubungi admin</p>
        <p>
          dengan cara ketik <b>admin</b>, pada Find a user
        </p>
      </div>
    </div>
  );
}
