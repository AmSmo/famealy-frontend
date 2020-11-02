import React from 'react'

function IngredientShow(props) {

    
    return (<div>
       <img width="50px" src={props.ingredient.ingredient.image_url} />
                <div style={{textTransform: 'capitalize'}}>{props.ingredient.ingredient.name}</div>
                <br></br>
                Amount you have {props.ingredient.amount} {props.ingredient.amount_type}{props.ingredient.amount > 1 ? "s" : null}
            </div>
    )
}

export default IngredientShow