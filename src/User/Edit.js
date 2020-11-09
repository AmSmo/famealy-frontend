
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

        fetch(BASE_API + `users/${props.user.id}`, configObj)
        
}
console.log(props)
return(
    <form onSubmit={uploadPhoto}>
        <input type="file" name="profile" />
        <input type="submit" value="upload photo" />
        
    </form>
)
}