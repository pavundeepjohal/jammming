import React, { useState } from "react"
import Playlist from "./playlist";



function Tracklist({ listOfTracks, accessToken }) {
    const [playlist, setPlaylist] = useState([]);

    const handleAddingSongsToPlaylistButton = (e) => {
        const value = e.target.value;
        const jsonToObject = JSON.parse(value)
        setPlaylist([...playlist, jsonToObject]);  
    }

    const removeTrackFromPlaylist = (id) => {
        const updatedList = playlist.filter((track) => track.id !== id)
        setPlaylist(updatedList)
    }


    return (
        <div>
            {accessToken ?
                <div>
                    <h1 className='searchResultsHeader'>Results</h1>
                    {/*filters the list of songs based on search*/}
                    <div className='resultsList'>
                        {listOfTracks.map(track => {
                        return (
                        <div>
                            <div key={track.id}>
                                <h2>{track.name}</h2>
                                <h3>{track.album.name} | {track.artists[0].name}</h3>
                            </div>
                            {/*adds the selected songs to a new list*/}
                            <button
                                type='button'
                                value={JSON.stringify(track)}                               
                                onClick={handleAddingSongsToPlaylistButton}
                            >+</button>
                        </div>
                    
                        )
                    })}
            
                    </div>
                </div>
            :
            <h2></h2>
        }
            {/*sends selected songs list to be generated in playlist.js component*/}
            <Playlist playlistToSpotify={playlist} removeTrackFromPlaylist={removeTrackFromPlaylist} passedAccessToken={accessToken}/>
        </div>
    )
    
}

export default Tracklist;