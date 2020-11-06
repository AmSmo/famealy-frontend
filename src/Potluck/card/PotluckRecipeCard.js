import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Card, Button, Image } from 'semantic-ui-react'
function PotluckRecipeCard(props) {
    let recipe = props.recipe.recipe
    let supplier = props.recipe.user
    // OLD STYLE
    // return (
    //     <div>
    //          <Card style={{margin: "10px"}}>
    //             <Card.Content>
    //                 <Image onClick={() => props.history.push(`/recipes/${recipe.spoon_id}`)} src={recipe.image_url} />
    //                 <Card.Header>{recipe.name}</Card.Header>
    //                 <Card.Meta>Needs {recipe.time} minutes</Card.Meta>
    //                 <Card.Description>Brought By: {supplier.name}</Card.Description>

    //                 {props.add ?
    //                     <Card.Content extra>

    //                         <Button basic color="green" onClick={() => props.addFriend(props.person.id)}>Add Friend</Button>

    //                     </Card.Content>
    //                     :
    //                     null}
    //             </Card.Content>
    //         </Card>

    //     </div>)
    
    let back = props.idx % 2 === 0 ? "white" : "#D3D3D3"
    
        console.log(props.idx)
             return (
                 <Link style={{ textDecoration: 'none' }}>
                     <li onClick={() => props.history.push(`/recipes/${recipe.spoon_id}`)} style={{ background: back, margin: "2px 0" }}>
                         {recipe.name}
                         <span style={{ color: "grey", float: "right" }}>
                             {supplier.name}
                         </span>
                     </li>
                 </Link>
             )
         
    

}

export default withRouter(PotluckRecipeCard)