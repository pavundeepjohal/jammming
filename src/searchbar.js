import React, { useState, useEffect } from "react"
import Tracklist from "./tracklist"

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID 
const REDIRECT_URI = "http://localhost:3000"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const SCOPE = 'playlist-modify-public' //this just gives the user permissions to create a playlist
const RESPONSE_TYPE = 'token'

function SearchBar({ passedToken }) {

    const [searchEntry, setSearchEntry] = useState("");
    const [tracks, setTracks] = useState([]);

    // Search and eventually move all the spotify API stuff to a spotify file
    async function submitSearch(e) {
        e.preventDefault();
   
        //Get request using search to get the tracks, using parameters as specified by spotify docs
        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + passedToken
            }
        }

        //this is a fetch that searches by tracks, the first .then converts response to objects to be manipulated so it is readable in a console.log(). the second .then is what to do with those objects, in this case we are setting the tracks to an array called Tracks
        const searchResults = await fetch('https://api.spotify.com/v1/search?q=' + searchEntry + '&type=track&limit=10', searchParameters)
            .then(response => response.json())
            .then(data => {
                setTracks(data.tracks.items)
            })
    }

    return (
        <div className="App">
           <h1>Searching Playaround Thingy draft</h1>
            {/*including login functionality */}           
                
                {passedToken ? 
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
                <Tracklist listOfTracks={tracks} accessToken={passedToken}/>  
        </div>
    );
}

export default SearchBar;