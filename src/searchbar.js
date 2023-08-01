import React, { useState, useRef } from "react"

function SearchBar({setSearchEntry}) {
    const searchEntryRef = useRef(null);

    const submitSearch = (e) => {
        e.preventDefault();
        setSearchEntry(searchEntryRef.current.value)
    }

    return (
        <div>
            <form onSubmit={submitSearch}>
                <input
                type="text"
                placeholder="Search..."
                ref={searchEntryRef}
                />
                <button type="submit">Search</button>
            </form>


        </div>

    )

};

export default SearchBar;

