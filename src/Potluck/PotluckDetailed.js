import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Friend from '../User/card/Friend'
import styled from 'styled-components'
import PotluckRecipeCard from './card/PotluckRecipeCard.js'

function PotluckDetailed(props) {
    const [name, setName] =useState("")
    const [date, setDate] =useState("")
    const [location, setLocation] =useState("")
    const [ingredients, setIngredients] =useState([])
    const [recipes, setRecipes] =useState([])
    const [guests, setGuests] = useState([])
    const [suppliedIngredients, setSuppliedIngredients] =useState([])

    const renderGuests = () => {
        return guests.map(guest => <Friend person={guest} />)
    }

    const renderRecipes = () => {
        return recipes.map(recipe => <PotluckRecipeCard recipe={recipe} / >)
    }

    async function fetchPotluck() {
        let token = localStorage.getItem("token")
        let currentPotluck = props.match.params.potluckId
        console.log(currentPotluck)
        const resp = await fetch(`http://localhost:3001/potlucks/${currentPotluck}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                setName(data.name)
                setLocation(data.location)
                setIngredients(data.ingredients)
                setRecipes(data.potluck_recipes)
                setGuests(data.users)
                setDate(data.date)
                setSuppliedIngredients(data.suppliedIngredients)
            }
            )
    }

    useEffect(()=> {
        fetchPotluck()
    }, [])

    return (
        <>
            <h1>{name}</h1>
            <h3>{location}, {date}</h3>
            { guests.length > 0 ? 
                <Guests>
                    <h2>Guests</h2>
                        {renderGuests()}
                </Guests>
                :
                null
            }
            { recipes.length > 0 ? 
                <Recipes>
                    <h2>Recipes</h2>
                        {renderRecipes()}
                </Recipes>
                :
                null
            }

            

        </>
        )
    }

const Guests = styled.div`
`
const Recipes = styled.div`
`
export default PotluckDetailed