import React from 'react'
import { List, Image, Popup } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
function IngredientShow(props) {
    const noPlural = ["small", "medium", "large"]
    
    return (<Link ><Popup trigger={<List.Item className="fade-in" style={{ display: "inline-flex", margin: "10px 20px", textAlign: "center", border: "0.5px grey solid", height: "auto", width: "220px", background: "rgba(255,255,255,0.5)", borderRadius: "15px", color: "black", verticalAlign: "middle", justifyContent: "center"}} onClick={() => props.sendToEdit(props.ingredient)}>
                <Image src={props.ingredient.ingredient.image_url} style={{paddingLeft: "10px"  }}/>
                
        <List.Content style={{ alignSelf: "center", textAlign: "center" }} >
                
            <List.Description style={{ alignSelf: "center", textAlign: "center", padding: "7px 10px", flexGrow: "1" }}>
                    You have
                     <br>
                    </br>
                {props.ingredient.amount} {props.ingredient.amount_type}{props.ingredient.amount > 1 && props.ingredient.amount_type[props.ingredient.amount_type - 1] !== "s" && !noPlural.includes(props.ingredient.amount_type)? "s" : null}
                <List.Header style={{ textTransform: 'capitalize', fontWeight: "600" }}>{props.ingredient.ingredient.name}</List.Header>
                </List.Description>
                </List.Content>
    </List.Item>} basic content="Edit or Convert Me" /></Link>
    )
}

export default IngredientShow