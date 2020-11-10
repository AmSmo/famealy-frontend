import React, { Component } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'

import moment from 'moment';
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

const DragAndDropCalendar = withDragAndDrop(Calendar)
class Detailed extends Component {
 
    CustomToolbar = () => {
        
        return (
            <>
                <ButtonLeft onClick={() => this.props.history.push(`/potlucks/users/${this.props.info.potluck_id}`)}>Potluck Details</ButtonLeft>
                <ButtonRight onClick={() => this.props.history.push("/calendar/main")}>Back to Main Calendar</ButtonRight>
            </>
        )
    }

    resizeEvent = (resizeType, { event, start, end }) => {
        
        const { events } = this.state;

        const nextEvents = events.map(existingEvent => {
            return existingEvent.id == event.id
                ? { ...existingEvent, start, end }
                : existingEvent;
        });

        this.setState({
            events: nextEvents
        });
    };

    render() {
        
        return (<>
            {this.props.info.date ?
                <><Head>{this.props.info.name} <br></br>{this.props.info.date}</Head>

                    <DragAndDropCalendar
                        style={{ top: "55px", lineHeight:"16px", minHeight: "15px"}}
                        
                        
                        events={this.props.info.events}
                        step={15}
                        showMultiDayTimes
                        date={this.props.info.date}
                        onNavigate={() => { }}
                        min={new Date(0, 0, 0, 6, 0, 0)}
                        max={new Date(0, 0, 0, 22, 0, 0)}
                        components={{toolbar: this.CustomToolbar}}
                        localizer={momentLocalizer(moment)}
                        defaultView={Views.DAY}
                        views={["day", "month"]}
                        
                        onEventDrop={this.props.moveHandle}
                    />

                </> :
                null
            }
        </>
        )
    }
}
export default  withRouter(Detailed)

const Head = styled.div`
    font-size: 34px;
    font-weight: 600;
    line-height: 36px;
    height:80px;
`

const ButtonRight = styled.button`
    display: block;
    right: 10px;
    top: 55px;
    position: absolute;
    margin: 0 auto;
    background-color: #22D9E3;
    border: 2px solid white;
    color: black;
    padding: 2px 16px;
    text-align: center;
    text-decoration: none;
    display: block;
    font-size: 16px;
    font-weight: 500;
    border-radius: 20px;
    
`
const ButtonLeft = styled.button`
    display: block;
    left: 10px;
    top: 55px;
    position: absolute;
    margin: 0 auto;
    background-color: #22D9E3;
    border: 2px solid white;
    color: black;
    padding: 2px 16px;
    text-align: center;
    text-decoration: none;
    display: block;
    font-size: 16px;
    font-weight: 500;
    border-radius: 20px;
    
`