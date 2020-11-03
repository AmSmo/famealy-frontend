import React from 'react'
import {withRouter} from 'react-router-dom'
import { Card, Image, Divider, Grid, Segment } from 'semantic-ui-react'
function QuickRecipe(props) {


    return (
        <>
            <Card onClick={() => props.history.push(`/recipes/${props.recipe.spoon_id}`)} style={{margin: "20px"}}>
                <Card.Content>
                    <Image src={props.recipe.image_url} />
                    <Card.Header>{props.recipe.name}</Card.Header>
                </Card.Content>
            </Card>
        </>
    )
}

export default withRouter(QuickRecipe)