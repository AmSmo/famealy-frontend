import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';

class MainCalendar extends Component{
    
    
    render(){
        let events = this.props.user.potlucks.map(potluck => {
            let day = moment(potluck.date)
            let dayAfter = moment(potluck.date).add(1, 'day')
            console.log("momentum", day.toString(), "plus", dayAfter.toString())
            return({
            start: day.toString(), end: dayAfter.toString(), allDay:true, title: potluck.name, potluck_id: potluck.id})})
        console.log(events)
    return (
        <Calendar
            selectable
            onSelectEvent={(potluck,e) => this.props.history.push(`/calendar/potluck/${potluck.potluck_id}`)}
            events={events}
            // views={allViews}
            step={60}
            showMultiDayTimes
            // max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
            defaultDate={new Date()}
            
            localizer={momentLocalizer(moment)}
            views={['week', 'month']}
        />
    )}
}
export default withRouter(MainCalendar)
