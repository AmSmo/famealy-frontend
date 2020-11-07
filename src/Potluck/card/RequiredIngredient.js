import React from 'react'
import styled from 'styled-components'
import { Popup} from 'semantic-ui-react'
import SupplyIngredientForm from '../form/SupplyIngredientForm'
function RequiredIngredient(props) {
    
    if (props.suppliedIngredients === []){
        return <></>
    }
    const have = () => {
        
        return props.suppliedIngredients.find(suppliedIngredient => suppliedIngredient.ingredient_id === props.ingredient.ingredient_id) ? "blue" : "black"
    }
    
    return (
    
    
            <Popup trigger={
        <Ingredient onClick={()=> props.sendToPopUp(props.ingredient)} style={{color: `${have()}`}}>    
            {props.ingredient.amount} {props.ingredient.amount_type}{props.ingredient.amount > 1 && props.ingredient.amount_type !== "" && props.ingredient.amount_type !== null && props.ingredient.amount_type[props.ingredient.amount_type.length - 1] !== "s"  ? "s" : null} <span style={{ textTransform: 'capitalize' }}><strong>{props.ingredient.ingredient_name}</strong></span>
    </Ingredient>} on='click'
            flowing >

    <SupplyIngredientForm ingredient={props.ingredient} supplyIngredient={props.supplyIngredient}/>
</Popup>)
}



export default RequiredIngredient

const Ingredient = styled.div`
    width: 200px;
    text-align: left;
    margin: 0 auto;
`