import React, { useEffect, useState } from 'react'

import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import PotluckRecipeCard from './card/PotluckRecipeCard.js'
import { Icon, Grid, Segment, Popup } from 'semantic-ui-react'
import RequiredIngredient from './card/RequiredIngredient'
import SuppliedIngredient from './card/SuppliedIngredient'
import SlideShow from './card/SlideShow'
import PotluckIngredientSearch from './form/PotluckIngredientSearch'
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
                        <span style={{ color: "grey", float: "right", marginRight:"15px" }}>
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

    const deleteSupplied = (ingredient) => {
        let token = localStorage.getItem("token")
        fetch(`http://localhost:3001/potlucks/eat_ingredient/${ingredient.id}`, {
            method: "POST",
            headers:{"content-type": "application/json",
                "accents": "application/json",
            Authorization: `Bearer ${token}`}
        }).then(resp=> resp.json())
        .then(fetchPotluck())
    }
    const sendToPopUp =(ingredient) =>{
        
        setPopUp(ingredient)
        popUp.message = false
    }

    const renderIngredients = () => {
        return ingredients.map(ingredient => <RequiredIngredient ingredient={ingredient} suppliedIngredients={suppliedIngredients} sendToPopUp={sendToPopUp} supplyIngredient={supplyIngredient}/>)
    }

    const renderSupplied = () => {
        return suppliedIngredients.map(ingredient => <SuppliedIngredient ingredient={ingredient} deleteSupplied={deleteSupplied} />)
    }

    async function fetchPotluck() {
        let token = localStorage.getItem("token")
        let currentPotluck = props.match.params.potluckId
        
        await fetch(`http://localhost:3001/potlucks/${currentPotluck}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(resp => resp.json())
            .then(data => {
                let pot = data
                
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
        <Background>  
            <Top style={{ border: "none", width: "95vw", margin: "10px auto", background: "#F8F8F8", borderRadius: "10px" }}>
            <LeftCorner>
            <h1 >{name}</h1>
            <h3 >{location}, {date}</h3>
                    {invited ?
                    <>
                        <Button onClick={() => leavePotluck()}>Leave Potluck</Button> 
                        <Button onClick={() => props.history.push(`/calendar/potluck/${potId}`)}>Go To Potluck Schedule</Button> 
                    </>
                        :
                       null
                    }
                
            </LeftCorner>
        <Middle>
            {guests.length > 0 ?
            <>
                <h3>Guests</h3>
                <ul style={{ listStyle: "none", textAlign: "left", display: "block", flexWrap: "wrap", height: "100px", overflowY: "scroll",maxWidth: "250px",  }}>
                
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
                            <Recipes style={{ width: "300px", textAlign: "left", display: "flex", overflowY: "scroll"}} >
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
            <Segment style={{ margin: "10px 40px", height: "400px", overflowY:"scroll", overflowX: "hidden"}}>
                    <Grid columns={2} relaxed='very' style={{display: "flex", flexWrap: "wrap"}} >
                        <Grid.Column style={{ height: "380px", overflowY: "scroll"}} >
                        {recipes.length > 0 ?
                                <div style={{ borderRight: "0.2px solid #F8F2F2"}}>
                                <Ing>Ingredients Required</Ing>
                                <Sub>(click to add) </Sub>
                                <Recipes style={{display: "flexbox"}}>
                                    {renderIngredients()}
                                </Recipes>
                            </div>
                            :
                            <>
                            <Ing>Ingredients Required</Ing>
                            <br></br>
                            <br></br>
                            <div>No recipes means no Ingredients... You might get hungry</div>
                            </>
                        }

                    </Grid.Column>
                        
                    
                        <Grid.Column style={{ height: "380px", overflowY: "scroll", overflowX: "hidden" }} >
                            <Ing>In Stock</Ing>
                            <Sub>(hover over to see who's bringing it) </Sub>
                            <span style={{float:"right"}}>
                                <Popup style={{ textAlign: "center" }} trigger={<Link><Icon name="plus" size="large" /></Link>} on='click'>
                                    <PotluckIngredientSearch addPantry={supplyIngredient} / >
                                </Popup>
                            </span>
                            
                        <Ingredients>                            
                            {renderSupplied()}
                            
                        </Ingredients>
                            
                    </Grid.Column>
                    
                    
                </Grid>

                
                
            </Segment>
            :           
            <>
                        <h2> No Details Available</h2>
                        <h4>Join Event to Find Out More</h4>
                    <Button onClick={() => joinPotluck()}>Join Potluck</Button>
                        </>
                    }

            
            

        </Background>
        )
    }
    
    
export default withRouter(PotluckDetailed)



const Recipes = styled.ul`
    display: flex;
    list-style: none;
    overflowY: scroll;
    flex-wrap: wrap;
    height: 150px;

`
const Ingredients = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: 55px;
`

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

const Background = styled.div`
padding-top: 10px;
background: url("/assets/farm-dinner.png");
display: inline-table;   
height: 90vh;
width: 100vw;
background-size: cover;
background-repeat: no-repeat;
text-align: center;
margin: 0 auto;
position: relative;
`

