import React from "react";
import Login from "./pages/Login";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Review from "./pages/Review";

function App() {
  const isAuthenticated = !!localStorage.getItem("username");

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/Dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/DocReport" element={ isAuthenticated ? <Dashboard /> : <Navigate to="/" />}></Route>
        <Route path="/Reviewok" element={ isAuthenticated ? <Review /> : <Navigate to="/" />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;