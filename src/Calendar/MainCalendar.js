import React, { Component, useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, Views, momentLocalizer, Events } from 'react-big-calendar'
import moment from 'moment';

class MainCalendar extends Component{
    
    ColoredDateCellWrapper = ({ children }) =>
        React.cloneElement(React.Children.only(children), {
            style: {
                backgroundColor: 'lightblue',
            },
        })
    
    render(){
        let events = this.props.user.potlucks.map(potluck => potluck.date)
        console.log(events)
    return (
        <Calendar
            selectable
            onSelectSlot={e => console.log(e)}
            events={[{start: new Date(2020, 10, 22), end: new Date(2021,0,23), allDay: true, title: "STUFF"}]}
            // views={allViews}
            step={60}
            showMultiDayTimes
            // max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
            defaultDate={new Date(2020, 11, 12)}
            components={{
                timeSlotWrapper: this.ColoredDateCellWrapper,
            }}
            localizer={momentLocalizer(moment)}
            views={['day', 'week', 'month']}
        />
    )}
}
export default MainCalendar
