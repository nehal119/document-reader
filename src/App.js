import * as React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import { Ground } from "./components/Ground";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="home" element={<Ground />} />
      </Routes>
    </div>
  );
}
