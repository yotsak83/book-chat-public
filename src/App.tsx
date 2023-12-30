import React, { useEffect } from "react";
import "./App.scss";
import Sidebar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/Chat";
import { useSelector } from "react-redux";
import Login from "./components/login/Login";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { auth } from "./Firebase";
import { login, logout } from "./features/userSlice";
import { ErrorBoundary } from "react-error-boundary";
import { fallbackRender } from "./utils/ErrorFallBack";

function App() {
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      if (loginUser) {
        dispatch(
          login({
            uid: loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      {user ? (
        <>
          <ErrorBoundary
            fallbackRender={fallbackRender}
            onReset={(details) => {
              // Reset the state of your app so the error doesn't happen again
            }}
          >
            <Sidebar />
          </ErrorBoundary>
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
