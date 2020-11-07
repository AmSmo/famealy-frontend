import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import PotluckMain from './PotluckMain'
import PotluckDetailed from './PotluckDetailed.js'

function PotluckContainer(props) {
    
    
    return (
        <>
           <Switch>
                <Route path="/potlucks/main" render={(routerprops) => <PotluckMain {...routerprops} changeTop={props.changeTop}/> } /> 
                <Route path="/potlucks/users/:potluckId" render={(routerprops) => <PotluckDetailed {...routerprops} changeTop={props.changeTop} fixGuests={props.fixGuests} /> } /> 
           </Switch>
        </>
    )


}

export default withRouter(PotluckContainer)