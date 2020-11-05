import React, {useState} from 'react'
import styled from 'styled-components'
function PotluckForm(props) {
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [date, setDate]= useState("")

    const createPotluck = (e) => {
        e.preventDefault()
        props.createPotluck(e)
        e.target.reset()
        setName("")
        setLocation("")
    }
    const changeHandler = (e) =>{
        
        
        switch (e.target.name){
            case "name":
                setName(e.target.value)
                break;
            case "location":
                setLocation(e.target.value)
                break;
            case "date":
                setDate(e.target.value)
                break;
            default: 
                break;
        }
    }
    return (
        <form onSubmit={(e) => createPotluck(e)}>
            <input type="text" placeholder="Name of Potluck" value={name} name="name" onChange={changeHandler}/>
            <input type="text" placeholder="Location of Potluck" value={location} name="location" onChange={changeHandler}/>
            <input type="date" name="date" onChange={changeHandler}/>
            <Button>Create Potluck </Button>
        </form>
    )
}

export default PotluckForm

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