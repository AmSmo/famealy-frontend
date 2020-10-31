import React from 'react'
import { withRouter } from 'react-router-dom'

function FriendSearchForm(props){
    const searchHandler = (e) => {
        e.preventDefault()
        let token = localStorage.getItem("token")
        fetch("http://localhost:3001/user_search", {
            method: "POST",
            headers: {'content-type': "application/json",
                    'accepts': 'application/json',
                     Authorization: `Bearer ${token}`},
            body: JSON.stringify({type: e.target.type.value, query: e.target.query.value}) })
        .then(resp => resp.json())
        .then (console.log)
        e.preventDefault()
      
    } 
    
    return(
        <form onSubmit={searchHandler}>
            <input type="text" name="query" placeholder="Search"></input>
            <input type="radio" name="type" value="name"/> Name 
            <input type="radio" name="type" value="email"/> Email
            <input type="radio" name="type" value="username" /> Username
            <input type="submit" value="Search" />
        </form>
    )

}

export default withRouter(FriendSearchForm)