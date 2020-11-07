import { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import MainCalendar from './MainCalendar'
import PotluckCalendar from './PotluckCalendar'
class Calendar extends Component {


    render() {
        return (
            <>

                {this.props.user === null ?
                    <div> SOMETHING</div>

                    :
                    <Switch>

                        <Route path="/calendar/main" render={(routerprops) => <MainCalendar {...routerprops} user={this.props.user}/>} />
                        <Route path="/calendar/potluck/:potluck_id" render={(routerprops) => <PotluckCalendar {...routerprops} user={this.props.user}/>} />
                        
                    </Switch>
                }

            </>
        );
    }
}

export default Calendar;