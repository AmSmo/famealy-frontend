import React, { useState } from 'react'
import { List, Image, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
function SuppliedShow(props) {

return(
    <Link ><Popup trigger={<List.Item style={{ display: "inline-flex", margin: "20px", textAlign: "center", border: "0.5px #fff solid", height: "80px", width: "220px", background: "rgba(255,255,255,0.5)", borderRadius: "15px", color: "black" }} onClick={() => props.sendToEdit(props.ingredient)}>
        <Image src={props.ingredient.image_url} style={{ paddingLeft: "10px" }} />

        <List.Content style={{ alignSelf: "center" }} >

            <List.Header style={{ textTransform: 'capitalize' }}>{props.ingredient.ingredient_name}</List.Header>
            <List.Description>
                For {props.ingredient.potluck_name}
                     <br>
                </br>
                {props.ingredient.amount} {props.ingredient.amount_type}{props.ingredient.amount > 1 && props.ingredient.amount_type[props.ingredient.amount_type - 1] !== "s" ? "s" : null}
            </List.Description>
        </List.Content>
    </List.Item>} basic content="Edit or Convert Me" /></Link>
)
}

export default SuppliedShow