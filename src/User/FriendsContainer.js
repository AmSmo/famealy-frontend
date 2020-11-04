import React, {useEffect, useState} from 'react'
import { withRouter } from 'react-router-dom'
import FriendSearchForm from '../Search/forms/FriendSearchForm'
import Friend from './card/Friend'

function FriendsContainer(props) {
    let [friends, setFriends]= useState([])
    let [searchedFriends, setSearchedFriends]= useState([])

    const renderFriends = (people) => {
        return people.map(person => <Friend person={person} />)
    }
    const renderSearchedFriends = (people) => {
        return people.map(person => <Friend person={person} add={"true"} addFriend={addFriend}/>)
    }

    const addFriend = (friendId) => {
        
        let token = localStorage.getItem("token")
        let configObj = {
            method: "POST",
            headers: { "content-type": "application/json", "accepts": "application/json", Authorization: `Bearer ${token}`},
            body: JSON.stringify({friendId})

        }
        fetch("http://localhost:3001/users/add_friend", configObj)
        .then(resp => resp.json())
        .then(data=> {
            setFriends(data)
            setSearchedFriends([])})
    }

    async function fetchFriends(){
        let token = localStorage.getItem("token")
        await fetch("http://localhost:3001/users/friends", { headers: { Authorization: `Bearer ${token}` } })
            .then(resp => resp.json())
            .then(data => setFriends(data)
            )
    }

    useEffect(() => {
        return () => {
            setSearchedFriends([]);
        };
    }, []);
   useEffect(() => {
        fetchFriends()}, [])

    const searchHandler = (e) => {
        e.preventDefault()
        let token = localStorage.getItem("token")
        fetch("http://localhost:3001/user_search", {
            method: "POST",
            headers: {
                'content-type': "application/json",
                'accepts': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ type: e.target.type.value, query: e.target.query.value })
        })
            .then(resp => resp.json())
            .then(data => setSearchedFriends(data))
        e.preventDefault()

    } 
    
    return(
        <>
        <FriendSearchForm searchHandler= {searchHandler} />
        {searchedFriends.length > 0 ? 
            <div>
                <h2>Found friends</h2>
                {renderSearchedFriends(searchedFriends)}
        </div>
            : 
        null}
        {friends.length > 0 ? 
        <>
        <h2>Friends</h2>
            {renderFriends(friends)}
            </>
            :
            <div>No Friends Added.... yet</div>}

            </>
    )
    

}

export default withRouter(FriendsContainer)