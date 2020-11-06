import React, { useEffect, useState } from 'react'
import Friend from '../User/card/Friend'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PotluckRecipeCard from './card/PotluckRecipeCard.js'
import { Divider, Grid, Segment } from 'semantic-ui-react'
import RequiredIngredient from './card/RequiredIngredient'
import SuppliedIngredient from './card/SuppliedIngredient'
import SlideShow from './card/SlideShow'
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
    console.log("PLD", props)
    // const renderGuests = () => {
    //     return guests.map(guest => <Friend person={guest} />)
    // }

    const renderGuests = () => {
        return guests.map((person, idx) => {
            let back = idx % 2 === 0 ? "white" : "#D3D3D3"
            return (
                <Link style={{ textDecoration: 'none' }}>
                    <li onClick={() => props.history.push(`/user/profile/${person.id}`)} key={idx} style={{ background: back, margin: "2px 0" }}>
                        {person.name}
                        <span style={{ color: "grey", float: "right" }}>
                            {person.email_address}
                        </span>
                    </li>
                </Link>
            )
        })
    }

    const renderRecipes = () => {
        return recipes.map((recipe, idx) => <PotluckRecipeCard key={idx} idx={idx}  recipe={recipe}  / >)
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
            props.changeTop(potId)
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
            setInvited(!invited)
            props.fixGuests(data)}
            )
    }

    useEffect(()=> {
        fetchPotluck()
    }, [])

    useEffect(() =>{
        fetchPotluck()
    }, [invited])

    
    return (
        <>  
        <Top>
            <LeftCorner>
            <h1 >{name}</h1>
            <h3 >{location}, {date}</h3>
                    {invited ?
                        <Button onClick={() => leavePotluck()}>Leave Potluck</Button> :
                       null
                    }
                
            </LeftCorner>
        <Middle>
            {guests.length > 0 ?
            <>
                <h3>Guests</h3>
                <ul style={{ listStyle: "none", textAlign: "left", display: "block", flexWrap: "wrap", height: "100px", overflowY: "scroll", maxWidth: "250px", marginLeft: "50px" }}>
                
                    {guests ? renderGuests() : null}
                </ul>
                </>
                :
                <div>No Ones Coming!</div>
            }
        </Middle>
        <MidRight>
                    {recipes.length > 0 ?
                        <>
                            <h3>Recipes</h3>
                            <Recipes>
                                {renderRecipes()}
                            </Recipes>
                        </>
                        :
                        <div>No one has decided what to make... Be The First!</div>
                    }
            </MidRight>
            <OuterRight>
                    <h3>What You'll Be Eating</h3>
                    <SlideShow images={recipes} />
            </OuterRight>
            
            </Top>
            {invited ? 
            <Segment style={{ margin: "10px 40px" }}>
                <Grid columns={2} relaxed='very' >
                    <Grid.Column>
                        {recipes.length > 0 ?
                            <>
                                <Ing>Ingredients Required</Ing>
                                <Sub>(hover over to add) </Sub>
                                <Recipes>
                                    {renderIngredients()}
                                </Recipes>
                            </>
                            :
                            <>
                            <Ing>Ingredients Required</Ing>
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
            :           
            <>
                        <h2> No Details Available</h2>
                        <h4>Join Event to Find Out More</h4>
                    <Button onClick={() => joinPotluck()}>Join Potluck</Button>
                        </>
                    }

            
            

        </>
        )
    }

const Guests = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`
const Recipes = styled.ul`
    display: block;
    list-style: none;
    overflowY: scroll;

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

const LeftCorner = styled.div`
display: block;
width: 300px;
float: left;

width: 23%;
margin-left: 30px;

`
const Top=styled.div`
display: flex;
justify-content: space-around;
`
const Middle = styled.div`


width: 23%;
display: block;
margin: 30px auto;
`

const MidRight = styled.div`
display: block;

width: 23%;
margin: 30px auto;
`
const OuterRight = styled.div`
display: block;
width: 23%;

`

const Sub = styled.h6`
    margin: 0;
    padding: 0
`

const Ing = styled.h2`
    margin: 0;
`