import React from 'react'

export default function Filter({updateSearch}) {

    const handleSearch = (event) => {
        updateSearch(event.target.value)
    }

    return (
        <>
            <form className='header-items'>                    
                <input type='text' placeholder='search' onChange={handleSearch} />
                <i type='submit' className='fa fa-search'></i>
            </form>
        </>
    )
}
