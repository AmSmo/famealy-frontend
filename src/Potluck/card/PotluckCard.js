import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card } from 'semantic-ui-react'

function PotluckCard(props) {
    
    
    const navigate = (potluckId) => {
        props.history.push(`/potlucks/users/${potluckId}`)
    }
    return (

        <div>
            <Card className="fade-in" onClick={() => navigate(props.potluck.id)} style={{margin: "30px 15px", height: "320px"}}>
                <div style={{
                    background: `url("${props.potluck.photo}")`,
                    animationFillMode: "backwards", opacity: "0.9", backgroundSize: "contain", backgroundRepeat: "no-repeat",
                    backgroundPosition: "center", height:"220px"}} >
                </div>
                <Card.Content>

                    
                    <Card.Header>{props.potluck.name}</Card.Header>
                    <Card.Meta>{props.potluck.location}</Card.Meta>
                    <Card.Description>{props.potluck.date}</Card.Description>
                </Card.Content>
            </Card>

        </div>
    )
}

export default withRouter(PotluckCard)