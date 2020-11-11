import { Card, Placeholder } from 'semantic-ui-react'
import React from 'react'


export default function PhotoPlaceHolder (props){
    
    let cardStyled = props.smaller ? {width : "220px", margin: "20px"} : {width: "280px", margin: "25px"}
    let groupStyled = props.smaller ? { margin: "20px 20px" } : { margin: "20px 130px", justifyContent: "center" }
    return(
<Card.Group style={ groupStyled }>
    <Card style={ cardStyled }>
        <Card.Content>
            <Placeholder>
                <Placeholder.Image square />
            </Placeholder>
        </Card.Content>
    </Card>
    <Card style={ cardStyled }>
        <Card.Content>
            <Placeholder>
                <Placeholder.Image square />
            </Placeholder>
        </Card.Content>
    </Card>
    <Card style={ cardStyled }>
        <Card.Content>
            <Placeholder>
                <Placeholder.Image square />
            </Placeholder>
        </Card.Content>
    </Card>
    <Card style={ cardStyled }>
        <Card.Content>
            <Placeholder>
                <Placeholder.Image square style={{ width: "100px" }} />
            </Placeholder>
        </Card.Content>
    </Card>
    <Card style={ cardStyled }>
        <Card.Content>
            <Placeholder>
                <Placeholder.Image square />
            </Placeholder>
        </Card.Content>
    </Card>
    <Card style={ cardStyled }>
        <Card.Content>
            <Placeholder>
                <Placeholder.Image square style={{ width: "100px" }} />
            </Placeholder>
        </Card.Content>
    </Card>
</Card.Group>
)
}