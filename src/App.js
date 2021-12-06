import * as React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import { Ground } from "./Ground";

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
