import { useState } from 'react'

import './index.css'
import TopBar from './Components/Topbar'
import Homepage from './Components/Homepage';

import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter

function App() {
 
  return (
    <>
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    </>
  );
}

export default App
