import React, {useState} from 'react'

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
            <input type="submit" value="Create Potluck" />
        </form>
    )
}

export default PotluckForm