import React, { useRef, useState, useEffect } from 'react';
import './App.css';

import SearchBar from './searchbar/searchbar';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID 
const REDIRECT_URI = "https://pavundeepjohal.github.io/jammming/"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const SCOPE = 'playlist-modify-public' //this just gives the user permissions to create a playlist
const RESPONSE_TYPE = 'token'

function App() {
  const [token, setToken] = useState("");

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
}

     /* Old Method of getting token (did not have a log in screen though
        useEffect(() => {
        //API access token
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }, 
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
        //authParameters is what is the instruction for the POST request, result is the successful returned data from the fetch url and converted into json format, data is doing something with that json data (the action)
       fetch('https://accounts.spotify.com/api/token', authParameters)
       .then(result => result.json())
       .then(data => setAccessToken(data.access_token)) 
    }, []) */
    
  // getting token from url when logged in 
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }
    setToken(token)
  }, [])
  
  return (

  
    <div className="App">
      <header className='header'>
        <h1>Ja<span>mmm</span>ing</h1>
      </header>
      <body>
        {/* if token not available then ask user to login, if it is available then show logout button*/}
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`} className='login'>Login to Spotify</a>
          : <button onClick={logout} className='logout'>Logout</button>
        }
                
      
        <SearchBar passedToken={token}/>
      </body>
    </div>
  );
}

export default App;
