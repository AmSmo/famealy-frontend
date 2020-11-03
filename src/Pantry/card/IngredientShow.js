import React from 'react'
import { List, Image } from 'semantic-ui-react'
function IngredientShow(props) {

    
    return (<List.Item style={{ display: "inline-flex", margin: "20px", textAlign: "center", border: "0.5px grey solid", height: "80px", width: "220px", background: "white", borderRadius: "15px", color: "black"}}>
                <Image src={props.ingredient.ingredient.image_url} />
                <List.Content style={{alignSelf: "center"}}>
                
                <List.Header style={{ textTransform: 'capitalize' }}>{props.ingredient.ingredient.name}</List.Header>
        
                <List.Description>
                    Amount you have {props.ingredient.amount} {props.ingredient.amount_type}{props.ingredient.amount > 1 && props.ingredient.amount_type[props.ingredient.amount_type-1] !== "s" ? "s" : null}
                </List.Description>
                </List.Content>
            </List.Item>
    )
}

export default IngredientShow