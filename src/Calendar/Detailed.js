import React, { Component } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
class Detailed extends Component {
 
    CustomToolbar = () => {
        return (
            <Button onClick={() => this.props.history.push("/calendar/main")}>Back to Main Calendar</Button>
        )
    }


    render() {
        console.log("Events", this.props.info.events)
        return (<>
            {this.props.info.date ?
                <><Head>{this.props.info.name} <br></br>{this.props.info.date}</Head>

                    <Calendar
                        style={{ top: "55px"}}

                        onSelectEvent={e => console.log(e)}
                        events={this.props.info.events}
                        step={30}
                        showMultiDayTimes
                        date={this.props.info.date}
                        onNavigate={() => { }}
                        components={{toolbar: this.CustomToolbar}}
                        localizer={momentLocalizer(moment)}
                        defaultView={Views.DAY}
                        views={["day", "month"]}
                        
                    />

                </> :
                null
            }
        </>
        )
    }
}
export default withRouter(Detailed)

const Head = styled.div`
    font-size: 34px;
    font-weight: 600;
    line-height: 36px;
    height:80px;
`

const Button = styled.button`
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