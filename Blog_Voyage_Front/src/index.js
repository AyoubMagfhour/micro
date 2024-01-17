import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./Component/Authentification/Login";
import EmailSearch from "./Component/Authentification/Password/EmailSearch";
import CreateAccount from "./Component/Authentification/Users/CreateAccount";
import PasswordChange from "./Component/Authentification/Password/PasswordChange";
import Profile from "./Component/Profile/Profile";
import Destination from "./Component/Destination/Destination";
import Tips from "./Component/Tips/Tips";
import Home from "./Component/Home/Home";
import Post from "./Component/Post/Postdetail";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Create_Accout" element={<CreateAccount />} />
      <Route path="/Email_Recup" element={<EmailSearch />} />
      <Route path="/Password_Change" element={<PasswordChange />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Destination" element={<Destination />} />
      <Route path="/Tips" element={<Tips />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Post/:id" element={<Post />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
