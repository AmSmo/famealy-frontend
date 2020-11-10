
import React from 'react'
const BASE_API = 'http://localhost:3001/'
export default function Edit(props){
    const uploadPhoto = (e, user) => {

    e.preventDefault()
    const data = new FormData(e.target)
    let configObj = {
        method: "PATCH",    
        body: data
    }

        fetch(BASE_API + `potlucks/42`, configObj)
        
}

return(
    <form onSubmit={uploadPhoto}>
        <input type="file" name="photo" />
        <input type="submit" value="upload photo" />
        
    </form>
)
}