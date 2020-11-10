import React, {useState} from 'react'
import styled from 'styled-components'
import { Popup} from 'semantic-ui-react'
import SupplyIngredientForm from '../form/SupplyIngredientForm'
function RequiredIngredient(props) {
    let [isOpen, setIsOpen]=useState(false)
    
    const supplyIngredient = (e, amountType) => {
        props.supplyIngredient(e, amountType)
        setIsOpen(false)}


    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    if (props.suppliedIngredients === []){
        return <></>
    }
    const have = () => {
        
        let supplied = (props.suppliedIngredients.find(suppliedIngredient => suppliedIngredient.ingredient_id === props.ingredient.ingredient_id))
        if (supplied) {
            if (supplied.amount >= props.ingredient.amount) {
                return "blue"
            } else {
                return "red"
            }
        } else {
            return "black"
        }
        return "black"
    }
    
    return (
    
        
            <Popup trigger={
        <Ingredient onClick={()=> props.sendToPopUp(props.ingredient)} style={{color: `${have()}`}}>    
            {props.ingredient.amount_type ?
            <>{props.ingredient.amount} {props.ingredient.amount_type}{props.ingredient.amount > 1 && props.ingredient.amount_type !== "" && props.ingredient.amount_type !== null && props.ingredient.amount_type[props.ingredient.amount_type.length - 1] !== "s"  ? "s" : null} <span style={{ textTransform: 'capitalize' }}><strong>{props.ingredient.ingredient_name}</strong></span></>
            :
            <>
            {props.ingredient.description}
            </>
            }
    </Ingredient>} on='click' open={isOpen} onClose={handleClose} onOpen={handleOpen}
            flowing >

    <SupplyIngredientForm ingredient={props.ingredient} supplyIngredient={supplyIngredient}/>
</Popup>)
}



export default RequiredIngredient

const Ingredient = styled.div`
    width: 200px;
    text-align: left;
    margin: 0 auto;
`