import React, {useState} from 'react'
import { List, Image, Popup } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
function IngredientShow(props) {
  
    
    return (<Link ><Popup trigger={<List.Item style={{ display: "inline-flex", margin: "10px 20px", textAlign: "center", border: "0.5px grey solid", background: "rgba(247, 238, 238, 0.947)",height: "auto", width: "220px", background: "rgba(255,255,255,0.5)", borderRadius: "15px", color: "black", verticalAlign: "middle"}} onClick={() => props.sendToEdit(props.ingredient)}>
                <Image src={props.ingredient.ingredient.image_url} style={{paddingLeft: "10px"  }}/>
                
        <List.Content style={{ alignSelf: "center" }} >
                
                <List.Header style={{ textTransform: 'capitalize' }}>{props.ingredient.ingredient.name}</List.Header>
                <List.Description>
                    Amount you have
                     <br>
                    </br>
                    {props.ingredient.amount} {props.ingredient.amount_type}{props.ingredient.amount > 1 && props.ingredient.amount_type[props.ingredient.amount_type-1] !== "s" ? "s" : null}
                </List.Description>
                </List.Content>
    </List.Item>} basic content="Edit or Convert Me" /></Link>
    )
}

export default IngredientShow