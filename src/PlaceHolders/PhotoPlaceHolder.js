import { Card, Placeholder } from 'semantic-ui-react'
import React from 'react'


export default function PhotoPlaceHolder (props){
    return(
<Card.Group style={{ margin: "20px auto", justifyContent: "center" }}>
    <Card style={{ width: "220px", margin: "25px" }}>
        <Card.Content>
            <Placeholder>
                <Placeholder.Image square />
            </Placeholder>
        </Card.Content>
    </Card>
    <Card style={{ width: "220px", margin: "25px" }}>
        <Card.Content>
            <Placeholder>
                <Placeholder.Image square />
            </Placeholder>
        </Card.Content>
    </Card>
    <Card style={{ width: "220px", margin: "25px" }}>
        <Card.Content>
            <Placeholder>
                <Placeholder.Image square />
            </Placeholder>
        </Card.Content>
    </Card>
    <Card style={{ width: "220px", margin: "25px" }}>
        <Card.Content>
            <Placeholder>
                <Placeholder.Image square style={{ width: "100px" }} />
            </Placeholder>
        </Card.Content>
    </Card>
    <Card style={{ width: "220px", margin: "25px" }}>
        <Card.Content>
            <Placeholder>
                <Placeholder.Image square />
            </Placeholder>
        </Card.Content>
    </Card>
    <Card style={{ width: "220px", margin: "25px" }}>
        <Card.Content>
            <Placeholder>
                <Placeholder.Image square style={{ width: "100px" }} />
            </Placeholder>
        </Card.Content>
    </Card>
</Card.Group>
)
}