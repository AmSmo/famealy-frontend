import React, {useEffect, useState} from 'react'
import Profile from './Profile'

function ProfileContainer(props) {
    const [user, setUser] = useState({})
    const [load, setLoad] = useState(false)
    
    async function fetchUser() {
        let token = localStorage.getItem("token")
        const resp = await fetch(`http://localhost:3001/users/${props.match.params.userId}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                setUser(data)
            setLoad(true)})
    }

    useEffect(()=>{ 
        return fetchUser()}, [])

    useEffect(()=>{ 
        return fetchUser()}, [props.match.url])
    return (
        <>
            {load ?
            <Profile user={user} />
        : 
        null}
        </>
    )
}

export default ProfileContainer