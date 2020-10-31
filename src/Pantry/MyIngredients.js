import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import IngredientShow from './card/IngredientShow'
import IngredientSearch from '../Search/IngredientSearch'
function MyIngredients(props){
    const [myIngredients, setMyIngredients] = useState("")
    
    useEffect(() => {
        setMyIngredients(props.myIngredients)
    });

    const renderMyIngredients = () => {
        if (props.myIngredients.length > 0){
        return myIngredients.map(ingredient => {
        return <IngredientShow ingredient={ingredient} />})
        }
    }   
    return(
        
        <>
            <IngredientSearch addPantry={props.addPantry} myIngredients={myIngredients} />
        <div>INGREDIENTS</div>
        
        {renderMyIngredients()}
        </>
    )
}

export default withRouter(MyIngredients)