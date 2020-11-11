import React, { useEffect, useState } from 'react'

import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import PotluckRecipeCard from './card/PotluckRecipeCard.js'
import { Icon, Grid, Segment, Popup, Dimmer, Loader, Image, Card, Placeholder } from 'semantic-ui-react'
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
    const [potPhoto, setPotPhoto] = useState("")
    const [potId, setPotId] = useState(0)
    const [suppliedIngredients, setSuppliedIngredients] =useState([])
    const [popUp, setPopUp] =useState({})
    const [ingredientLoaded, setIngredientLoaded] = useState(false)
    const [topLoaded, setTopLoaded] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
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
                        <br></br>
                        
                    </li>
                </Link>
            )
        })
    }

    const renderRecipes = () => {
        return recipes.map((recipe, idx) => <PotluckRecipeCard key={idx} idx={idx}  recipe={recipe}  deleteRecipe={deleteRecipe}/ >)
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
        
           setSuppliedIngredients([...suppliedIngredients, data])
            setIsOpen(false)})
    }

    const deleteSupplied = (ingredient) => {
        let newArray = suppliedIngredients.filter(ing => ing !== ingredient)
        setSuppliedIngredients(newArray)

        let token = localStorage.getItem("token")
        fetch(`http://localhost:3001/potlucks/eat_ingredient/${ingredient.id}`, {
            method: "POST",
            headers:{"content-type": "application/json",
                "accepts": "application/json",
            Authorization: `Bearer ${token}`}
        }).then(resp=> resp.json())
        .then(console.log)
    }

    const deleteRecipe = (potluckRecipeId)=> {
        let token = localStorage.getItem("token")
        fetch(`http://localhost:3001/potlucks/delete_food/${potluckRecipeId}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accepts": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.json())
        .then(removeRecipe(potluckRecipeId))
    }

    const removeRecipe = (id) => {
        let recipeCopy = recipes
        let newRecipes = recipes.filter(recipe => recipe.potluck_recipe_id !== id)
        setRecipes(newRecipes)
    }

    const sendToPopUp =(ingredient) =>{
        
        setPopUp(ingredient)
        popUp.message = false
    }

    const renderIngredients = () => {
        return ingredients.map((ingredient ,idx) => <RequiredIngredient key={idx} idx={idx} ingredient={ingredient} suppliedIngredients={suppliedIngredients} sendToPopUp={sendToPopUp} supplyIngredient={supplyIngredient}/>)
    }

    const renderSupplied = () => {
        return suppliedIngredients.map((ingredient , idx) => <SuppliedIngredient key={idx} ingredient={ingredient} deleteSupplied={deleteSupplied} />)
    }

    const handleOpen = () =>{
        setIsOpen(true)
    }

    const handleClose = () =>{
        setIsOpen(false)
    }

    async function fetchPotluck() {
        let token = localStorage.getItem("token")
        let currentPotluck = props.match.params.potluckId
        
        await fetch(`http://localhost:3001/potlucks/${currentPotluck}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(resp => resp.json())
            .then(data => {
                let pot = data
                
                setPotPhoto(data.photo)
                setName(pot.name)
                setPotId(pot.id)
                setLocation(pot.location)
                setIngredients(pot.ingredients)
                setRecipes(pot.potluck_recipes)
                setGuests(pot.users)
                setDate(pot.date)
                setSuppliedIngredients(pot.supplied_ingredients)
                setTopLoaded(true)
            }
        )
        .then(() => {
            if (guests.filter(guest => guest.id === parseInt(localStorage.getItem("user"))
            ).length>0){ 
                        setInvited(true) 
                        setTimeout(() => { setIngredientLoaded(true) }, 2300)
                       }else {
                        setInvited(false)
                setTimeout(() => { setIngredientLoaded(true) }, 1160)
                        }
                        
        })
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
            { topLoaded ?
            <>
            <LeftCorner>
            <h1 >{name}</h1>
            <Image src={potPhoto} style={{maxHeight: "180px", borderRadius: "15px", margin: "0 auto"}} />
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
            </>
            :
                    <Segment>
                        <Dimmer active inverted>
                            <Loader size='medium'>Loading</Loader>
                        </Dimmer>

                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                    </Segment>
            }
            </Top>
            { ingredientLoaded ? 
            <>
            {invited ? 
            <Segment style={{ margin: "10px 40px", height: "400px", overflowY:"scroll", overflowX: "hidden"}}>
                    <Grid columns={2} relaxed='very' style={{display: "flex", flexWrap: "wrap"}} >
                        <Grid.Column style={{ height: "380px", overflowY: "scroll"}} >
                        {recipes.length > 0 ?
                                <div style={{ borderRight: "0.2px solid #F8F2F2"}}>
                                <Ing>Ingredients Required</Ing>
                                <Sub>
                                    (click to add)<br></br> 
                                                <span style={{ color: "blue", position: "absolute", left: "40px" }}>Blue means you have enough</span>
                                                <span style={{ color: "red", position:"absolute", right: "40px" }}>Red means you need more</span>
                                </Sub>
                                <br></br>
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
                                <Popup style={{ textAlign: "center" }} open={isOpen} onClose={handleClose} onOpen={handleOpen} trigger={<Link><Icon name="plus" size="large" /></Link>} on='click'>
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

                    </> :

                <Segment>
                    <Dimmer active inverted>
                        <Loader size='medium'>Loading</Loader>
                    </Dimmer>

                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Segment>
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

