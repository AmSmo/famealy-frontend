import React from 'react'
import { withRouter } from 'react-router-dom'

function FriendSearchForm(props){
    
    
    return(
        <form onSubmit={props.searchHandler}>
            <input type="text" name="query" placeholder="Search"></input>
            <input type="radio" name="type" defaultChecked="true" value="name"/> Name 
            <input type="radio" name="type" value="email"/> Email
            <input type="radio" name="type" value="username" /> Username
            <input type="submit" value="Search" />
        </form>
    )

}

export default withRouter(FriendSearchForm)