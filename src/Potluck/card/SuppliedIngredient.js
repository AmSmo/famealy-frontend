import React from 'react'
import styled from 'styled-components'
import { Popup, Grid, Header, Button } from 'semantic-ui-react'
import SupplyIngredientForm from '../form/SupplyIngredientForm'
function SuppliedIngredient(props) {
    

    return (


        
            <Ingredient >
                {props.ingredient.amount} {props.ingredient.amount_type}{props.ingredient.amount > 1 && props.ingredient.amount_type !== "" && props.ingredient.amount_type[props.ingredient.amount_type.length - 1] !== "s" ? "s" : null} <span style={{ textTransform: 'capitalize' }}><strong>{props.ingredient.ingredient_name}</strong></span>
            </Ingredient>
          

        
    )
    
    }

export default SuppliedIngredient

const Ingredient = styled.div`
    width: 200px;
    text-align: left;
    margin: 0 auto;
`