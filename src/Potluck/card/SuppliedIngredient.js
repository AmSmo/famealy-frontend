import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {Popup, Icon} from 'semantic-ui-react'
function SuppliedIngredient(props) {
    const notPlural = ["", "medium", "small", "large"]
    
    return (


        <Ingredient className="scale-in-hor-right">
                {parseInt(localStorage.getItem("user")) === props.ingredient.user_id ? <Link><Icon name="minus" onClick={() => props.deleteSupplied(props.ingredient)}/></Link> : null}
                <Popup trigger={
                <span>{props.ingredient.amount} {props.ingredient.amount_type}{props.ingredient.amount > 1 && !notPlural.includes(props.ingredient.amount_type)  && props.ingredient.amount_type[props.ingredient.amount_type.length - 1] !== "s" ? "s" : null} <span style={{ textTransform: 'capitalize' }}><strong>{props.ingredient.ingredient_name}</strong></span></span>
            }
            on='hover'>{props.ingredient.supplier}</Popup>
            </Ingredient>

          

        
    )
    
    }

export default SuppliedIngredient

const Ingredient = styled.div`
    width: 200px;
    text-align: left;
    margin: 0 auto;
`