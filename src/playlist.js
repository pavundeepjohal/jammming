import React, { useState, useRef } from "react"

function Playlist({ playlistToSpotify, removeTrackFromPlaylist, passedAccessToken }) {
    const [playlistName, setPlaylistName] = useState('')
    const playlistNameRef = useRef(null);

    const submitPlaylist = (e) => {
        e.preventDefault();
        setPlaylistName(playlistNameRef.current.value)
    }

    {/*creating a new list of tracks which are JSON strings and adding them to the 'new' object which is then compared using the Set operator which can only take unique values (cannot use Set of array of Objects) */}
     {/*second line just converts list of JSON strings back into an array of objects which can then be read*/}
    const uniquePlaylistToSpotify = [...new Set(playlistToSpotify.map((track) => JSON.stringify(track)))] 
   .map((track) => JSON.parse(track))

   //converting URIs of unique spotify playlist to an array of strings 
   let trackURIs = (uniquePlaylistToSpotify) => {
        let output = []
        for(let track of uniquePlaylistToSpotify) {
            output.push(track.uri)
        }
        return output
    }
    let trackURIResult = trackURIs(uniquePlaylistToSpotify)

    //saving playlist to spotify
    async function savePlaylist(e) {
        e.preventDefault();

        const searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + passedAccessToken
            }
        }

        //getting user ID's so playlist can be created
        const userID = await fetch('https://api.spotify.com/v1/me', searchParameters)
            .then(response => response.json())
            .then(data => { return data.id })

        //creating the playlist
        const createPlaylistParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + passedAccessToken
            }, 
            body: JSON.stringify({
                'name': playlistName
            })
        }

        //getting playlistID of playlist just created so can add songs to playlist
        const playlistID = await fetch('https://api.spotify.com/v1/users/' + userID + '/playlists', createPlaylistParameters)
        .then(response => response.json())
        .then(data => { return data.id}) 

        //adding songs to playlist
        const addingSongsParameters = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + passedAccessToken
            },
            body: JSON.stringify({
                'uris' : trackURIResult,
                'position': 0
            })
        }

        const addTracksToNewPlaylist = await fetch('https://api.spotify.com/v1/playlists/' + playlistID + '/tracks', addingSongsParameters)
        .then(response => response.json())
        .then(data => data) 
        

    }

    return (
        <div>
            {passedAccessToken ?
            <div>
                <form onSubmit={savePlaylist}>
                    <input
                        type="input"
                        placeholder="New Playlist Name"
                        onChange={e=> setPlaylistName(e.target.value)}
                    />
                    <button type="submit">Save to Spotify</button>
                </form>

                <div>
                    {uniquePlaylistToSpotify.map((track) => {
                    return (
                        <div>
                            <div >
                                <h2>{track.name}</h2>
                                <h3>{track.album.name} | {track.artists[0].name} | {track.uri}</h3>
                            </div>
                            <button
                                type='button'
                                onClick={e => removeTrackFromPlaylist(track.id)}
                            >-</button>
                        </div>
                    );
                })}       
                </div>
            </div>
        :
        <h2></h2>}
        </div>

    )

};

export default Playlist;