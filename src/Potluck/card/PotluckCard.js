import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Button } from 'semantic-ui-react'

function PotluckCard(props) {
    
    
    const navigate = (potluckId) => {
        props.history.push(`/potlucks/users/${potluckId}`)
    }
    return (

        <div>
            <Card onClick={() => navigate(props.potluck.id)}>
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