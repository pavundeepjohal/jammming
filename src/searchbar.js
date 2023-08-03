import React, { useState, useEffect } from "react"
import Tracklist from "./tracklist"

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID 
const REDIRECT_URI = "http://localhost:3000"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = 'token'

function SearchBar() {

    const [searchEntry, setSearchEntry] = useState("");
    const [token, setToken] = useState("");
    const [tracks, setTracks] = useState([]);

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

    // Search
    async function submitSearch(e) {
        e.preventDefault();
   
        //Get request using search to get the tracks, using parameters as specified by spotify docs
        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }

        //this is a fetch that searches by tracks, the first .then converts response to objects to be manipulated so it is readable in a console.log(). the second .then is what to do with those objects, in this case we are setting the tracks to an array called Tracks
        const searchResults = await fetch('https://api.spotify.com/v1/search?q=' + searchEntry + '&type=track&limit=10', searchParameters)
            .then(response => response.json())
            .then(data => {
                setTracks(data.tracks.items)
            })

        //getting user ID's
        const userID = await fetch('https://api.spotify.com/v1/me/id', searchParameters)
            .then(response => response.json())
            .then(data => console.log(data))
    }

    return (
        <div className="App">
           <h1>Searching Playaround Thingy draft</h1>
            {/*including login functionality */}           
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}
                
                {token ? 
                <div>
                    <form onSubmit={submitSearch}>
                        <input
                            placeholder="Search For Track, Artist, Album..."
                            type="input"
                            onChange={e => setSearchEntry(e.target.value)}
                        />
                        <button type="submit" >Search</button>
                    </form>
               </div> 
                : 
                <h2>Please Login</h2>
                }
                <Tracklist listOfTracks={tracks}/>  
        </div>
    );
}

export default SearchBar;