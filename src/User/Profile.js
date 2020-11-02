import React, {useEffect, useState} from 'react'
import { Card, Image, Divider, Grid, Segment } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import Friend from '../User/card/Friend'
import QuickRecipe from '../Recipes/Cards/QuickRecipe.js'

function Profile(props) {
    
    const [random, setRandom] = useState({})
    
    const renderFriends = () => {
        return props.user.friends.map(person => <Friend person={person} />)
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
        const resp = await fetch('http://localhost:3001/recipes/random', {headers: {Authorization: `Bearer ${token}`}})
        .then(resp=> resp.json())
        .then(data => setRandom(data))
    }

    useEffect(()=> {
        fetchRandom()
    }, [])

    console.log(props.match)
    return (<div>
        <h1>{props.user.username}'s Profile</h1>
        <Segment>
            <Segment inverted>
    <Grid columns={2} relaxed='very'>
                <Grid.Column inverted style={{textAlign: "left", marginTop:"20px"}}>
                        <div style={{ marginLeft: "5% 25%"}}>
                    <p>Name: {props.user.name}</p>
                    <p>Username: {props.user.username}</p>
                    <p>Email: {props.user.email_address}</p>
                    <p>Location: {props.user.location}</p>
                    </div>
                </Grid.Column>
                <Grid.Column >
                    {renderRandom()}
                </Grid.Column>
            </Grid>
            <Divider vertical style={{left:"45%"}}>They May Like</Divider>

        </Segment>
            <Divider inverted />

            <h3>Some Details</h3>
            <Divider horizontal inverted>
                Horizontal
    </Divider>
            <Segment inverted style={{display: "grid"}}>
                <h2>Their Recipes</h2>
                    <div style={{display:"flex"}}>
                        {renderRecipes()}
                    </div>

                <Divider inverted />
                <h2>Their Friends</h2>
                
                    <div style={{display:"flex"}}>
                        {renderFriends()}
                    </div>
                
            </Segment>
        </Segment>
    </div>
    )
}

export default withRouter(Profile)