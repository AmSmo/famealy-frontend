import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
function FriendSearchForm(props){
    
    
    return(
        <form onSubmit={props.searchHandler} style={{paddingLeft: "20px"}}>
            <input type="text" name="query" placeholder="Search"></input>
            <div style={{textAlign: "left", paddingLeft: "15px"}}>
                <Radio> <input type="radio" name="type" defaultChecked="true" value="name" /> Name</Radio>
            <Radio><input type="radio" name="type" value="email" /> Email</Radio>
            <Radio><input type="radio" name="type" value="username" /> Username</Radio>
            <input style={submitButton} type="submit" value="Search" />
            </div>
        </form>
    )

}

export default withRouter(FriendSearchForm)

const Radio = styled.div`
width: 80px;
input{
vertical-align:middle;}
`

const submitButton = {
    margin: "0 auto",
    backgroundColor: "#22D9E3",
    border: "2px solid white",
    color: "black",
    padding: "2px 16px",
    textAlign: "center",
    textDecoration: "none",
    display: "block",
    fontSize: "16px",
    fontWeight: "500",
    borderRadius: "20px",
    boxShadow: "turquoise 1px 1px 1px"

}