import React from 'react';
import Nav from './components/Nav';
import Footer  from './components/Footer';
import Homepage from './pages/Homepage';
import PixelImageAPI from './pages/PixelImageAPI'
import About from './pages/About';
import Parking from './pages/Parking';
import Guessnum from './pages/Guessnum';
import ThreeD from './pages/ThreeD';
import JapaneseCard from './pages/JapaneseCard';
import {Routes, Route} from "react-router-dom";
import "./styles/style.css";
import "antd/dist/antd.css";


function App() {
  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <Nav />
        <Routes >
          <Route path='/' element={<Homepage />}></Route>
          <Route path='/pixelimageAPI' element={<PixelImageAPI/>}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/parking' element={<Parking />}></Route>
          <Route path='/guessnum' element={<Guessnum  />}></Route>
          <Route path='/threeD' element={<ThreeD  />}></Route>
          <Route path='/JapaneseCard' element={<JapaneseCard  />}></Route>
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
