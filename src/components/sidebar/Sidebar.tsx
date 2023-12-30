import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SidebarBook from "./SidebarBook";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SettingsIcon from "@mui/icons-material/Settings";
import { auth, db } from "../../Firebase";
import { useAppSelector } from "../../app/hooks";

import useCollection from "../../hooks/useCollection";
import { addDoc, collection } from "firebase/firestore";

const Sidebar = () => {
  const user = useAppSelector((state) => state.user.user);
  const { documents: books } = useCollection("books");

  const addBook = async () => {
    let bookName: string | null = prompt("Enter book name");

    if (bookName) {
      await addDoc(collection(db, "books"), {
        bookName: bookName,
      });
    }
  };

  return (
    <div className="sidebar">
      {/* sidebarLeft */}
      <div className="sidebarLeft">
        <div className="serverIcon">
          <img src="./stack-of-books.png" alt="" />
        </div>
      </div>
      {/* sidebarRight */}
      <div className="sidebarRight">
        <div className="sidebarTop">
          <h3>Book Chat</h3>
          <ExpandMoreIcon />
        </div>

        {/* sidebarBooks */}
        <div className="sidebarBooks">
          <div className="sidebarBooksHeader">
            <div className="sidebarHeader">
              <ExpandMoreIcon />
              <h4>Title</h4>
            </div>

            <AddIcon className="sidebarAddIcon" onClick={() => addBook()} />
          </div>
          <div className="sidebarBookList">
            {books.map((book) => (
              <SidebarBook book={book} id={book.id} key={book.id} />
            ))}
          </div>
          <div className="sidebarFooter">
            <div className="sidebarAccount">
              <img src={user?.photo} alt="" onClick={() => auth.signOut()} />
              <div className="accountName">
                <h4>{user?.displayName}</h4>
                <span>#{user?.uid.substring(0, 4)}</span>
              </div>
            </div>
            <div className="sidebarVoice ">
              <KeyboardVoiceIcon />
              <SettingsIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
