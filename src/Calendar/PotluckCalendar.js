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
        events: [],
        potluck_id: 0
    }

    moveHandle = ({ event, start, end, isAllDay })=>{
        
        let token = localStorage.getItem("token")
        console.log("start", start, "end", end, "event", event)
        let idx = (this.state.events.findIndex(ri => ri.potluck_recipe_id === event.potluck_recipe_id))
        let toEdit = this.state.events
        
        let newObj = { allDay: false, title: event.title, start: start, end: end, potluck_recipe_id: event.potluck_recipe_id, allDay: isAllDay, supplier: event.supplier, ingredients: event.ingredients }
        let time = start + 1
        if (isAllDay){
            time = null
            
        }
        console.log("final time", newObj)
        toEdit[idx] = newObj
        this.setState({events: toEdit})
        let configObj = {method: "POST", headers:{
            "accepts": "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${token}`
                },
            body: JSON.stringify({potluck_recipe: {time: time}})}
        fetch(`http://localhost:3001/potluck/change_recipe_time/${event.potluck_recipe_id}`, configObj)
        .then(resp=> resp.json())
        .then(console.log)
    }



    recipeEvents = (recipes, date) => {
        return recipes.map((recipe, idx) => {
            
            if (recipe.start_time === null){
                
                let start = new Date(date)
                let finish = new Date(start)
                let fullTime = recipe.recipe.time < 30 ? 30 : recipe.recipe.time
                
                finish.setMinutes(finish.getMinutes() + fullTime)
                return { allDay: true, title: recipe.recipe.name, start: start, end: finish, potluck_recipe_id: recipe.potluck_recipe_id, supplier: recipe.user.name, ingredients: recipe.recipe.recipe_ingredients }
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
                let fullTime = recipe.recipe.time < 30 ? 25 : recipe.recipe.time

                finish.setMinutes(finish.getMinutes() + fullTime)
                
                
                return { allDay: false, title: recipe.recipe.name, start: start, end: finish, potluck_recipe_id: recipe.potluck_recipe_id, supplier: recipe.user.name, ingredients: recipe.recipe.recipe_ingredients }
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
            return this.setState({name: data.name, date: data.date, events: events, potluck_id: data.id})
        })
    }



    render() {
        
        return(
            <>
            {this.state.date ? 
            <Detailed info={this.state} moveHandle={this.moveHandle}/>
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
