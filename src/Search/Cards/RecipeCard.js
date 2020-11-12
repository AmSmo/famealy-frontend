import React from 'react'
import {withRouter} from 'react-router-dom'

import {Card, CardContent, Image} from 'semantic-ui-react'

function RecipeCard(props){
    
    const navigate = (spoon_id) =>{
        
        props.history.push(`/recipes/${spoon_id}`)
    }
    return(
        <Card 
            onClick={() => navigate(props.recipe.id)} style={{margin: "20px", flexGrow: "1", height: "390px"}}>
            <Image src={`https://spoonacular.com/recipeImages/${props.recipe.image}`} style={{ height: "280px", width: "auto", overflow: "hidden", verticalAlign:"middle", objectFit: "cover"}} />
            <CardContent style={{alignContent: "center"}}>
            <Card.Header style={{fontSize: "17"}}>{props.recipe.title}</Card.Header>
            <Card.Meta> {`Ready in ${props.recipe.readyInMinutes} minutes`}</Card.Meta>
            <Card.Description>{`Servings: ${props.recipe.servings}`}</Card.Description>
            </CardContent>
        </Card>


        //  <Card style={{margin: "15px", width: boxWidth }} onClick={() => {
                
        //        return props.add ? null :  props.history.push(`/user/profile/${props.person.id}`)}}
        //     >
        //         <Card.Content>
                    
        //             <Image src={props.person.profile} style={{maxHeight: "170px"}}/>
        //             <Card.Header>{props.person.name}</Card.Header>
        //             <Card.Meta>{props.person.email_address}</Card.Meta>
        //             <Card.Description>{props.person.location}</Card.Description>

        //             {props.add ?
        //             <Card.Content extra>
                        
        //                 <Button basic color="green" onClick={() => props.addFriend(props.person.id)}>Add Friend</Button>
                        
        //             </Card.Content>
        //                 :
        //                 null}
        //         </Card.Content>
        //     </Card>

        
    )
}

export default withRouter(RecipeCard)
