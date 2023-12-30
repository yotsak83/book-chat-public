import React, { useEffect, useRef, useState } from "react";
import "./Chat.scss";
import ChatHeader from "./ChatHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ChatMessage from "./ChatMessage";
import { useAppSelector } from "../../app/hooks";
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../Firebase";
import useSubCollection from "../../hooks/useSubCollection";

const Chat = () => {
  const [inputText, setInputText] = useState<string>("");

  const bookName = useAppSelector((state) => state.book.bookName);
  const bookId = useAppSelector((state) => state.book.bookId);
  const user = useAppSelector((state) => state.user.user);
  const { subDocuments: messages } = useSubCollection("books", "messages");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault(); // ページをリロードしない
    // booksコレクションの中にあるmessageコレクションの中にメッセージ情報を入れる
    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      "books",
      String(bookId),
      "messages"
    );

    const docRef: DocumentReference<DocumentData> = await addDoc(
      collectionRef,
      {
        message: inputText,
        timestamp: serverTimestamp(),
        user: user,
      }
    );
    setInputText("");
  };

  return (
    <div className="chat">
      {/* chatHeader */}
      <ChatHeader bookName={bookName} />
      <div className="chatArea">
        {/* chatMessages */}
        <div className="chatMessage">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.message}
              timestamp={message.timestamp}
              user={message.user}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* chatInput */}
      </div>
      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form>
          <input
            type="text"
            placeholder="Send text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
            value={inputText}
          />
          <button
            type="submit"
            className="chatInputButton"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              sendMessage(e)
            }
          >
            Send
          </button>
        </form>
        <div className="chatInputIcons">
          {/* <CardGiftcardIcon /> */}
          <SupportAgentIcon />
          {/* <GifIcon />
          <SentimentSatisfiedAltIcon /> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
