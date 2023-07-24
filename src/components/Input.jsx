import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const currentUser = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const chatId = data.chatId;
  const handleSend = async (e) => {
    e.preventDefault();

    if (img) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      });
    } else {
      if (text.length == 0) return alert("teks tidak bisa kosong");
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className={`input ${chatId == "null" ? "idle" : ""}`}>
      <form onSubmit={handleSend}>
        <input type="text" placeholder="Type Something..." onChange={(e) => setText(e.target.value)} value={text} />
        <div className="send">
          <img src={Attach} alt="" />
          <input type="file" id="fileSend" hidden onChange={(e) => setImg(e.target.files[0])} />
          <label htmlFor="fileSend">
            <img src={Img} alt="" />
          </label>
          <button>Send</button>
        </div>
      </form>
    </div>
  );
}
