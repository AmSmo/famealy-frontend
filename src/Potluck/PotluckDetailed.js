import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Friend from '../User/card/Friend'
import styled from 'styled-components'
import PotluckRecipeCard from './card/PotluckRecipeCard.js'
import { Divider, Grid, Image, Segment } from 'semantic-ui-react'
import RequiredIngredient from './card/RequiredIngredient'
function PotluckDetailed(props) {
    const [name, setName] =useState("")
    const [date, setDate] =useState("")
    const [location, setLocation] =useState("")
    const [ingredients, setIngredients] =useState([])
    const [recipes, setRecipes] =useState([])
    const [guests, setGuests] = useState([])
    const [user, setUser] = useState({})
    const [suppliedIngredients, setSuppliedIngredients] =useState([])
    console.log(ingredients)
    const renderGuests = () => {
        return guests.map(guest => <Friend person={guest} />)
    }

    const renderRecipes = () => {
        return recipes.map(recipe => <PotluckRecipeCard recipe={recipe} / >)
    }

    const renderIngredients = () => {
        return ingredients.map(ingredient => <RequiredIngredient ingredient={ingredient} suppliedIngredients={[ingredients[0]]}/ >)
    }

    async function fetchPotluck() {
        let token = localStorage.getItem("token")
        let currentPotluck = props.match.params.potluckId
        console.log(currentPotluck)
        const resp = await fetch(`http://localhost:3001/potlucks/${currentPotluck}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(resp => resp.json())
            .then(data => {
                let pot = data
                console.log("current", data)
                setName(pot.name)
                setLocation(pot.location)
                setIngredients(pot.ingredients)
                setRecipes(pot.potluck_recipes)
                setGuests(pot.users)
                setDate(pot.date)
                setSuppliedIngredients(pot.suppliedIngredients)
                // setUser(data.user)
            }
            )
    }

    useEffect(()=> {
        fetchPotluck()
    }, [])
    console.log("user", user)
    return (
        <>
            <h1>{name}</h1>
            <h3>{location}, {date}</h3>
            
            <Segment style={{margin: "0 10px"}}inverted>
                {guests.length > 0 ?
                    <>
                        <h2>Guests</h2>
                        <Guests>
                        {renderGuests()}
                    </Guests>
                    </>
                    :
                    null
                }
                <Divider style={{margin: "10px"}} inverted />
                {recipes.length > 0 ?
                    <>
                        <h2>Recipes</h2>
                        <Recipes>
                            {renderRecipes()}
                        </Recipes>
                        </>
                    :
                    null
                }
                <Divider horizontal inverted>
                    
    </Divider>
            </Segment>
            <Segment style={{ margin: "10px 40px" }}>
                <Grid columns={2} relaxed='very' >
                    <Grid.Column>
                        {recipes.length > 0 ?
                            <>
                                <h2>Ingredients Required</h2>
                                <Recipes>
                                    {renderIngredients()}
                                </Recipes>
                            </>
                            :
                            null
                        }

                    </Grid.Column>
                    <Grid.Column>
                        <h2>In Stock</h2>
                        <Ingredients>
                            {renderIngredients()}
                        </Ingredients>
                    </Grid.Column>
                    
                    
                </Grid>

                
                <Divider vertical>Accounted For:</Divider>
            </Segment>


            
            

        </>
        )
    }

const Guests = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`
const Recipes = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`
const Ingredients = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: 55px;
`
export default PotluckDetailed