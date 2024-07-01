import React from 'react';
import './App.css';
import Banner from './components/Banner';
import Movie from './components/Movie';
import Navbar from './components/Navbar';
import WatchList from './components/WatchList';
 // Import Search component
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={ <>
            <Banner />
            <Movie />
          </>} />
          <Route path="/WatchList" element={<WatchList />} />
        
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
