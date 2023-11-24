import React, { useState } from "react"
<<<<<<< HEAD:src/tracklist/tracklist.js
import Playlist from "../playlist/playlist";
=======
import Playlist from "./playlist";
>>>>>>> db75bcc1d00e3ae943671a55b06a1f51dd0080c1:src/tracklist.js
import './tracklist.css'


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

    const clearPlaylist = () => {
        setPlaylist([])
    }


    return (
        <div className='tracklistAndPlaylist'>
            {accessToken ?
                <div className='body'>
                    <h2 className='searchResultsHeader'>Search Results</h2>
                    {/*filters the list of songs based on search*/}
                    <div className='resultsList'>
                        {listOfTracks.map(track => {
                        return (
                        <div className='trackResultBox'>
                            <img src={track.album.images[0].url} />
                            <div key={track.id} className='trackResult'>   
                                <div>
                                    <h4>{track.name}</h4>
                                    <h5>{track.album.name} | {track.artists[0].name}</h5>
                                </div>
                            </div>
                            {/*adds the selected songs to a new list*/}
                            <button
                                type='button'
                                value={JSON.stringify(track)}                               
                                onClick={handleAddingSongsToPlaylistButton}
                                className='button'
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
            <Playlist playlistToSpotify={playlist} removeTrackFromPlaylist={removeTrackFromPlaylist} passedAccessToken={accessToken} clearPlaylist={clearPlaylist}/>
        </div>
    )
    
}

export default Tracklist;