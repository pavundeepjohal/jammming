import React, { useState, useRef } from "react"
import dummyTracks from "./dummyTracks";

function Playlist({ playlistToSpotify, removeTrackFromPlaylist }) {
    const [playlistName, setPlaylistName] = useState('')
    const playlistNameRef = useRef(null);

    const submitPlaylistName = (e) => {
        e.preventDefault();
        setPlaylistName(playlistNameRef.current.value)
    }

    {/*creating a new list of tracks which are JSON strings and adding them to the 'new' object which is then compared using the Set operator which can only take unique values (cannot use Set of array of Objects) */}
     {/*seoncd line just converts list of JSON strings back into an array of objects which can then be read*/}
    const uniquePlaylistToSpotify = [...new Set(playlistToSpotify.map((track) => JSON.stringify(track)))] 
   .map((track) => JSON.parse(track))

    return (
        <div>
            <form onSubmit={submitPlaylistName}>
                <input
                type="text"
                placeholder="New Playlist Name"
                ref={playlistNameRef}
                />
                <h2>{playlistName}</h2>
                <button type="submit">Save to Spotify</button>
            </form>

            <div>
                {uniquePlaylistToSpotify.map((track) => {
                return (
                    <div>
                        <div >
                            <h2>{track.song}</h2>
                            <h3>{track.artist} | {track.album}</h3>
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

    )

};

export default Playlist;