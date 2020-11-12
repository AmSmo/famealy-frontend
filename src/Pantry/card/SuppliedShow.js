import React from 'react'
import { List, Image, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
function SuppliedShow(props) {

return(
    <Link ><Popup trigger={<List.Item className="fade-in" style={{ display: "inline-flex", margin: "10px 20px", textAlign: "center", border: "0.5px grey solid",  width: "220px", borderRadius: "15px", color: "black", height: "auto" }} onClick={() => props.sendToEdit(props.ingredient)}>
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