import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import Playlist from './playlist';
import Tracklist from './tracklist';
import SearchBar from './searchbar';


function App() {

  const [searchEntry, setSearchEntry] = useState('');

  
  return (


    <div className="App">
      <header className="App-header">
        <h1>Ja<span>mmm</span>ing</h1>
      </header>
      
      <SearchBar setSearchEntry={setSearchEntry}/>
      <h1>{searchEntry}</h1>
      
      <div className='Results'>
        <Tracklist searchEntry={searchEntry}/>
      </div>

    </div>
  );
}

export default App;
