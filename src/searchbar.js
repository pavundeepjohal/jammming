import React, { useState, useRef, useEffect } from "react"
import Tracklist from "./tracklist"

const CLIENT_ID = "c1bad66b5a59480aa1b44995f38962e7"
const CLIENT_SECRET = "f56b99e1d3dc45b1818f7340a9c20882"

function SearchBar() {
    const searchEntryRef = useRef(null)
    const [searchEntry, setSearchEntry] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [tracks, setTracks] = useState([]);

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
    }, [])

    // Search
    async function submitSearch(e) {
        e.preventDefault();
   
        //Get request using search to get the tracks, using parameters as specified by spotify docs
        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
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
                <form onSubmit={submitSearch}>
                    <input
                        placeholder="Search For Track, Artist, Album..."
                        type="input"
                        ref={searchEntryRef}
                        onChange={e => setSearchEntry(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
                
                {/*<div className="list of album names">
                    {tracks.map((track) => {
                    return (
                        <div>
                            <h2>{track.name}</h2>
                            <h3>{track.album.name} | {track.artists[0].name}</h3>
    
                        </div>
                    )
                })}
            </div>  */}
            <Tracklist listOfTracks={tracks}/>
        </div>
    );
}

export default SearchBar;