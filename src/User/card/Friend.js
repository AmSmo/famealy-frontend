import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Button } from 'semantic-ui-react'
function Friend(props) {
    return(
        <div>
            <Card>
                <Card.Content>
                    <Card.Header>{props.person.name}</Card.Header>
                    <Card.Meta>{props.person.email_address}</Card.Meta>
                    <Card.Description>{props.person.location}</Card.Description>

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

export default withRouter(Friend)