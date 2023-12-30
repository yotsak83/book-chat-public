import React from "react";
import "./SidebarBook.scss";
import { DocumentData } from "firebase/firestore";
import { useAppDispatch } from "../../app/hooks";
import { setBookInfo } from "../../features/bookSlice";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

type Props = {
  id: string;
  book: DocumentData;
};

const SidebarBook = (props: Props) => {
  const { id, book } = props;
  const dispatch = useAppDispatch();

  return (
    <div
      className="sidebarBook"
      onClick={() =>
        dispatch(
          setBookInfo({
            bookId: id,
            bookName: book.book.bookName,
          })
        )
      }
    >
      <h4>
        <span className="sidebarBookHash">
          <AutoStoriesIcon />
        </span>
        {book.book.bookName}
      </h4>
    </div>
  );
};

export default SidebarBook;
