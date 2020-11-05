import React, { useEffect, useState } from 'react'
import Friend from '../User/card/Friend'
import styled from 'styled-components'
import PotluckRecipeCard from './card/PotluckRecipeCard.js'
import { Divider, Grid, Segment } from 'semantic-ui-react'
import RequiredIngredient from './card/RequiredIngredient'
import SuppliedIngredient from './card/SuppliedIngredient'

function PotluckDetailed(props) {
    const [name, setName] =useState("")
    const [date, setDate] =useState("")
    const [location, setLocation] =useState("")
    const [ingredients, setIngredients] =useState([])
    const [recipes, setRecipes] =useState([])
    const [guests, setGuests] = useState([])
    
    const [invited, setInvited] = useState()
    const [potId, setPotId] = useState(0)
    
    const [suppliedIngredients, setSuppliedIngredients] =useState([])
    const [popUp, setPopUp] =useState({})
    
    const renderGuests = () => {
        return guests.map(guest => <Friend person={guest} />)
    }

    const renderRecipes = () => {
        return recipes.map(recipe => <PotluckRecipeCard recipe={recipe}  / >)
    }

    const supplyIngredient = (e,result) =>{
        e.preventDefault()
        let amount = e.target.amount.value
        let spoon_id = e.target.id.value
        let amount_type = result
        let token = localStorage.getItem("token")
        let configObj = {method: "POST",
        headers: {"content-type": "application/json",
        "accepts": "application/json", Authorization: `Bearer ${token}`},
        body: JSON.stringify({ingredients: {amount, spoon_id, amount_type, potId}})}
        fetch("http://localhost:3001/potlucks/bring_ingredient", configObj)
        .then(resp=> resp.json())
        .then(data => {
           setSuppliedIngredients([...suppliedIngredients, data])})
    }

    const sendToPopUp =(ingredient) =>{
        
        setPopUp(ingredient)
        popUp.message = false
    }

    const renderIngredients = () => {
        return ingredients.map(ingredient => <RequiredIngredient ingredient={ingredient} suppliedIngredients={suppliedIngredients} sendToPopUp={sendToPopUp} supplyIngredient={supplyIngredient}/>)
    }

    const renderSupplied = () => {
        return suppliedIngredients.map(ingredient => <SuppliedIngredient ingredient={ingredient} />)
    }

    async function fetchPotluck() {
        let token = localStorage.getItem("token")
        let currentPotluck = props.match.params.potluckId
        
        await fetch(`http://localhost:3001/potlucks/${currentPotluck}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(resp => resp.json())
            .then(data => {
                let pot = data
                console.log(pot)
                setName(pot.name)
                setPotId(pot.id)
                setLocation(pot.location)
                setIngredients(pot.ingredients)
                setRecipes(pot.potluck_recipes)
                setGuests(pot.users)
                setDate(pot.date)
                setSuppliedIngredients(pot.supplied_ingredients)

            }
        )
        .then(() => {
            (guests.filter(guest => guest.id === parseInt(localStorage.getItem("user"))
            ).length>0 ? setInvited(true) : setInvited(false))})
    }

    const leavePotluck = () => {
        let token = localStorage.getItem("token")
        let configObj = {
            method: "POST",
            headers: {
                "accepts": "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ potluck_id: potId })

        }
        fetch("http://localhost:3001/users/leave_potluck", configObj)
            .then(resp => resp.json())
            .then(data => {
                
                if (data.message) {
                    return props.history.push('/potlucks/main')
                }
                
                setGuests(data)
            setInvited(!invited)}
            )
        props.history.push('/potlucks/main')
    }
    const joinPotluck = () => {
        let token = localStorage.getItem("token")
        let configObj ={
            method: "POST",
            headers: {"accepts" : "application/json",
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`},
            body: JSON.stringify({potluck_id: potId})
            
        }
        fetch("http://localhost:3001/users/join_potluck", configObj)
        .then(resp => resp.json())
        .then(data => {setGuests(data)
            setInvited(!invited)})
    }

    useEffect(()=> {
        fetchPotluck()
    }, [])

    useEffect(() =>{
        fetchPotluck()
    }, [invited])

    
    return (
        <>
            <h1>{name}</h1>
            <h3>{location}, {date}</h3>
            {invited ? 
            <Button onClick={()=> leavePotluck()}>Leave Potluck</Button>:
            <Button onClick= {()=> joinPotluck()}>Join Potluck</Button>
            }
            <Segment style={{margin: "0 10px"}}>
                {guests.length > 0 ?
                    <>
                        <h2>Guests</h2>
                        <Guests>
                        {renderGuests()}
                    </Guests>
                    </>
                    :
                    <div>No Ones Coming!</div>
                }
                <Divider style={{margin: "10px"}}  />
                {recipes.length > 0 ?
                    <>
                        <h2>Recipes</h2>
                        <Recipes>
                            {renderRecipes()}
                        </Recipes>
                        </>
                    :
                    <div>No one has decided what to make... Be The First!</div>
                }
                <Divider horizontal >
                    
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
                            <>
                            <h2>Ingredients Required</h2>
                            <br></br>
                            <br></br>
                            <div>No recipes means no Ingredients... You might get hungry</div>
                            </>
                        }

                    </Grid.Column>
                    <Grid.Column>
                        <h2>In Stock</h2>
                        <Ingredients>                            
                            {renderSupplied()}
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

const Button = styled.button`
    margin: 5px auto;
    background-color: #22D9E3;
    border: 2px solid white;
    color: black;
    padding: 2px 16px;
    text-align: center;
    text-decoration: none;
    display: block;
    font-size: 16px;
    font-weight: 500;
    border-radius: 20px;
    
`