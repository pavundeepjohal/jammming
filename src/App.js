import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import SearchBar from './searchbar';
import Tracklist from './tracklist';


function App() {

  
  return (


    <div className="App">
      <header className="App-header">
        <h1>Ja<span>mmm</span>ing</h1>
      </header>
      
      <SearchBar />
      
      <div className='Results'>
      </div>

    </div>
  );
}

export default App;
