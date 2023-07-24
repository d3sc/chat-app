import React, { useContext } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { ChatContext } from "../context/ChatContext";

export default function Sidebar() {
  const { data } = useContext(ChatContext);

  const chatId = data.chatId;
  return (
    <div className={`sidebar ${chatId == "null" ? "" : "close"}`}>
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
}
