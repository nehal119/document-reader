import * as React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import SignIn from './SignIn';
import Pricing from './Pricing';
import { Ground } from './Ground';
import FileUpload from './FileUpload';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="home" element={<Ground />} />
        {/* <Route path="upload" element={<FileUpload />} /> */}
      </Routes>
    </div>
  );
}
