import React, { Component } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import Detailed from './Detailed.js'
class PotluckCalendar extends Component {
    state = {
        name: "",
        date: null,
        events: []
    }

    CustomToolbar = () => {
    return (
        <Button onClick={()=> this.props.history.push("/calendar/main")}>Back to Main Calendar</Button>
    )
}

    recipeEvents = (recipes, date) => {
        return recipes.map((recipe, idx) => {
            console.log("check here", recipe.start_time)
            if (recipe.start_time === null){
                
                let start = new Date(date)
                let finish = new Date(start)
                finish.setMinutes(finish.getMinutes() + recipe.recipe.time)
                return {allDay: true, title: recipe.recipe.name, start: start, end: finish }
            }else{

                let dateMath = date.split("-")
                let year = parseInt(dateMath[0])
                let month = parseInt(dateMath[1]) - 1
                let day = parseInt(dateMath[2]) - 1
                let timed = recipe.start_time.split("T")[1]
                timed = timed.split(":")
                let hour = timed[0]-5
                let minute = timed[1]
                let start = new Date(year, month, day, hour, minute)
                let finish = new Date(start)
                finish.setMinutes(finish.getMinutes() + recipe.recipe.time)
                
                console.log("fin", finish)
                
                return { allDay: false, title: recipe.recipe.name, start: start, end: finish }
            }
        })
    }

    
    componentDidMount = () => {
        let potluck_id = (this.props.match.params.potluck_id)
        let token = localStorage.getItem("token")
        fetch(`http://localhost:3001/potlucks/${potluck_id}`, {headers:
            {Authorization: `Bearer ${token}`}})
        .then(resp=> resp.json())
        .then(data=>{
            let events = this.recipeEvents(data.potluck_recipes, data.date)
            return this.setState({name: data.name, date: data.date, events: events})
        })
    }



    render() {
        console.log("why",this.state)
        return(
            <>
            {this.state.date ? 
            <Detailed info={this.state}/>
                :
                null}
                </>
        )
    }
}
export default withRouter(PotluckCalendar)

const Head= styled.div`
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