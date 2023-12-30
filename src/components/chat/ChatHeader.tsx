import React from "react";
import "./ChatHeader.scss";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PushPinIcon from "@mui/icons-material/PushPin";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import HelpIcon from "@mui/icons-material/Help";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

type Props = {
  bookName: string | null;
};

const ChatHeader = (props: Props) => {
  const { bookName } = props;

  return (
    <div className="chatHeader">
      <div className="chatHeaderLeft">
        <div className="chatHeaderHash">
          <AutoStoriesIcon />
        </div>
        <h3>{bookName}</h3>
      </div>
      <div className="chatHeaderRight">
        <NotificationsIcon />
        <PushPinIcon />
        <PeopleAltIcon />
        <div className="chatHeaderSearch">
          <input type="text" placeholder="Search" />
          <SearchIcon />
        </div>
        <SendIcon />
        <HelpIcon />
      </div>
    </div>
  );
};

export default ChatHeader;
