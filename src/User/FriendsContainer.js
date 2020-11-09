import React, {useEffect, useState} from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import FriendSearchForm from '../Search/forms/FriendSearchForm'
import Friend from './card/Friend'

function FriendsContainer(props) {
    let [friends, setFriends]= useState([])
    let [searchedFriends, setSearchedFriends]= useState([])

    // const unFriend = (friend_id) => {
    //     let token= localStorage.getItem("token")
    //     let configObj = {
    //         method: "POST",
    //         headers: {"content-type": "application/json",
    //                 "accepts": "application/json",
    //                 Authorization: `Bearer ${token}`},
    //         body: JSON.stringify({user:{friend_id}})
    //     }
    //     fetch("http://localhost:3001/users/unfriend", configObj)
    //     .then(resp=> resp.json())
    //     .then(data => setFriends(data))

    // }
    const renderFriends = (people) => {
        return people.map(person =>{
            return( <div>
            <Friend person={person} />
            {/* <button onClick={() => unFriend(person.friendship)}>Delete Friend</button> */}
            </div>)})
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
            setSearchedFriends([])
            props.fixTop(data)})
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
        <Background>
        
        <Corner>
            <h4>Search For Members You Don't Know</h4>
            <FriendSearchForm searchHandler= {searchHandler} />
            
            {searchedFriends.length > 0 ? 
                    
                    <Result style={{paddingLeft: "30px"}}>
                        {renderSearchedFriends(searchedFriends)}
                    </Result>
                : 
            null}
        </Corner>
                <h2 style={{marginTop: "15px"}}>Friends</h2>
        <Middle>
          
        {friends.length > 0 ? 
        <>
            {renderFriends(friends)}
            </>
            :
            <div>No Friends Added.... yet</div>}
            
        </Middle>
            </Background>
    )
    

}

export default withRouter(FriendsContainer)
const Result = styled.div`
display: flexbox;
flex-wrap: wrap;
flex-shrink:2;
width: 100px;
`
const Corner= styled.div`
display: block;
width: 270px;
float: left;
max-height: 92vh;
padding-top: 20px;
padding-left: 30px;
margin: 0px auto;
overflow-Y: scroll;

`

const Middle = styled.div`

padding-left: 100px;
margin: 0 auto;
max-height: 88vh;
max-width: 80vw;
display: flexbox;
flex-wrap: wrap;
overflow-Y: scroll;
`

const Background = styled.div`
padding-top: 10px;
display: inline-table;
background: url("/assets/farm-dinner.png");
position: absolute;
height: 90vh;
width: 100vw;
background-size: cover;
background-repeat: no-repeat;
text-align: center;
margin: 0 auto;
position: relative;
`