import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/homePage";
import Login from "./pages/login/login_reg";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
