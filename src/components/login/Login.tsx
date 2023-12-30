import React from "react";
import "./Login.scss";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../Firebase";

const Login = () => {
  const signIn = () => {
    // FirebaseによるGoogle認証。これだけ！
    signInWithPopup(auth, provider).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="loginLogo">
        <img src="./stack-of-books.png" alt="" width="100px" />
      </div>
      <Button onClick={signIn}>ログイン</Button>
    </div>
  );
};

export default Login;
