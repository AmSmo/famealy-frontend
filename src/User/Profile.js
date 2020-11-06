import React, {useEffect, useState} from 'react'
import { Card, Image, Divider, Grid } from 'semantic-ui-react'
import {withRouter, Link} from 'react-router-dom'

import QuickRecipe from '../Recipes/Cards/QuickRecipe.js'

function Profile(props) {
    
    const [random, setRandom] = useState({})
    
    const renderFriends = () => {
        return props.user.friends.map((person, idx) => {
            let back = idx % 2 === 0 ? "white" : "#D3D3D3"
            return (
                <Link style={{ textDecoration: 'none' }}>
                <li onClick={() => props.history.push(`/user/profile/${person.id}`)}key={idx} style={{background: back, margin:"2px 0"}}> 
                    {person.name} 
                    <span style={{color: "grey", float:"right"}}> 
                        {person.email_address}
                    </span>
                </li>
            </Link>
            )})
    }
    const renderPotlucks = () => {
        return props.user.potlucks.map((potluck, idx) => {
            let back = idx % 2 === 0 ? "white" : "#D3D3D3"
            return (
                <Link style={{ textDecoration: 'none' }}>
                <li onClick={() => props.history.push(`/potlucks/users/${potluck.id}`)}key={idx} style={{background: back, margin:"2px 0"}}> 
                    {potluck.name} 
                    <span style={{color: "grey", float:"right"}}> 
                        {potluck.date}
                    </span>
                </li>
            </Link>
            )})
    }

    useEffect(()=>{
        fetchRandom()
    }, [props.user])
    const renderRecipes = () => {
        return props.user.recipes.map(recipe => <QuickRecipe recipe={recipe}/>)
    }
    const renderRandom = () => {
        if (random.name){
            return (
                <>
                <Card onClick={()=> props.history.push(`/recipes/${random.spoon_id}`)}>
                    <Card.Content>
                        <Image src= {random.image_url} />
                        <Card.Header>{random.name}</Card.Header>
                    </Card.Content>
                </Card>
                </>
            )
        }
    }
    async function fetchRandom() {
        let token = localStorage.getItem("token")
        await fetch('http://localhost:3001/recipes/random', {headers: {Authorization: `Bearer ${token}`}})
        .then(resp=> resp.json())
        .then(data => setRandom(data))
    }

    useEffect(()=> {
        fetchRandom()
    }, [])
    console.log(props.user)
    
    return (<div>
        <h1>{props.user.username}'s Profile</h1>
        
           
            <Grid columns={4} style={{border: "none", width: "95vw", margin: "10px auto"}}>
                <Grid.Column style={{paddingLeft: "30px"}} >
                    <h2>Recommended for Them:</h2>
                    {renderRandom()}
                </Grid.Column>
                <Grid.Column  style={{textAlign: "center", marginTop:"50px"}}>
                        <div style={{ marginLeft: ""}}>
                    <p>Name: {props.user.name}</p>
                    <p>Username: {props.user.username}</p>
                    <p>Email: {props.user.email_address}</p>
                    <p>Location: {props.user.location}</p>
                    </div>
                </Grid.Column>
                <Grid.Column >
                <h2>Their Friends</h2>

                <ul style={{ listStyle: "none", textAlign: "left", display: "block", flexWrap: "wrap", height: "200px", overflowY:"scroll", maxWidth: "250px", marginLeft: "50px" }}>
                    {props.user.friends ? renderFriends() : null}
                </ul>
                </Grid.Column>
                <Grid.Column >
                <h2>Their Potlucks</h2>

                <ul style={{ listStyle: "none", textAlign: "left", display: "block", flexWrap: "wrap", height: "200px", overflowY:"scroll", maxWidth: "250px", marginLeft: "50px" }}>
                    {props.user.potlucks ? renderPotlucks() : <li>None</li>}
                </ul>
                </Grid.Column>
            </Grid>
            

        
            

            
         
    
        
                <h2>Their Recipes</h2>
                    <div style={{display:"flex", flexWrap: "wrap", justifyContent: "center"}}>
                        {props.user.recipes ? renderRecipes() : null}
                    </div>

                <Divider inverted />
            
                
            
        
    </div>
    )
}

export default withRouter(Profile)