import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Button, Image } from 'semantic-ui-react'
function Friend(props) {
    let style = props.add ? {marginTop:"10px", width: "190px", } : { margin: "15px", width: "230px", height: "260px", alignContent: "center" }
    
    return(
        <div>
            <Card className="fade-in" style={style} onClick={() => {
                
               return props.add ? null :  props.history.push(`/user/profile/${props.person.id}`)}}
            >
                <Card.Content>
                    
                    <Image src={props.person.profile} style={{height: "160px"}}/>
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