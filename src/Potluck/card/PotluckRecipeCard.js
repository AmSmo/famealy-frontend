import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Button, Image } from 'semantic-ui-react'
function PotluckRecipeCard(props) {
    let recipe = props.recipe.recipe
    let supplier = props.recipe.user
    return (
        <div>
             <Card style={{margin: "10px"}}>
                <Card.Content>
                    <Image onClick={() => props.history.push(`/recipes/${recipe.spoon_id}`)} src={recipe.image_url} />
                    <Card.Header>{recipe.name}</Card.Header>
                    <Card.Meta>Needs {recipe.time} minutes</Card.Meta>
                    <Card.Description>Brought By: {supplier.name}</Card.Description>

                    {props.add ?
                        <Card.Content extra>

                            <Button basic color="green" onClick={() => props.addFriend(props.person.id)}>Add Friend</Button>

                        </Card.Content>
                        :
                        null}
                </Card.Content>
            </Card>

        </div>
    )

}

export default withRouter(PotluckRecipeCard)