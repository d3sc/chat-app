import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function Message({ message }) {
  const currentUser = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="user Profile" />
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {/* if the message an image */}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
}
