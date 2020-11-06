import React, { Component } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, Views, momentLocalizer, Events } from 'react-big-calendar'
import moment from 'moment';

// const ColoredDateCellWrapper = ({ children }) =>
//     React.cloneElement(React.Children.only(children), {
//         style: {
//             backgroundColor: 'lightblue',
//         },
//     })

const MainCalendar = ({ localizer }) => {
    return(
    <Calendar
        selectable
        onSelectSlot={e=>console.log(e)}
        events={[]}
        // views={allViews}
        step={60}
        showMultiDayTimes
        // max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
        defaultDate={new Date(2020, 11, 12)}
        // components={{
        //     timeSlotWrapper: ColoredDateCellWrapper,
        // }}
        localizer={momentLocalizer(moment)}
        views={['day', 'week', 'month']}
    />
    )}
export default MainCalendar