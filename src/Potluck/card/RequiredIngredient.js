import React from 'react'
import styled from 'styled-components'
function RequiredIngredient(props) {
    console.log(props)
    const have = () => {
        return props.suppliedIngredients.find(suppliedIngredient => suppliedIngredient.ingredient_id === props.ingredient.ingredient_id) ? "blue" : "black"
    }
    return (
    
    
    <Ingredient style={{color: `${have()}`}}>    
            {props.ingredient.amount} {props.ingredient.amount_type}{props.ingredient.amount > 1 && props.ingredient.amount_type !== "" && props.ingredient.amount_type[props.ingredient.amount_type.length - 1] !== "s"  ? "s" : null} <span style={{ textTransform: 'capitalize' }}><strong>{props.ingredient.ingredient_name}</strong></span>
    </Ingredient>
    )
}

export default RequiredIngredient

const Ingredient = styled.div`
    width: 200px;
    text-align: left;
    margin: 0 auto;
`