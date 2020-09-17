import React from "react";
import Auth from "./useAuth";
import "./Login.css";

function Login() {
  const auth = Auth();
  const handleSignIn = () => {
    auth
      .signinWithGoogle()
      .then((res) => (window.location.pathname = "/review"));
  };
  const handleSignOut = () => {
    auth.signOut().then((res) => {
      window.location.pathname = "/";
    });
  };

  console.log(auth.user);
  return (
    <div className="login">
      {auth.user ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In With Google</button>
      )}
    </div>
  );
}

export default Login;
