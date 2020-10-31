import React, { Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Route, Switch } from 'react-router-dom';
import MyIngredients from './MyIngredients.js'
import IngredientSearch from '../Search/IngredientSearch'

class PantryContainer extends Component {

    state = {
        myIngredients: []
    }

    addPantry = (e, amount_type) => {
        let token = localStorage.getItem("token")
        e.preventDefault()
        const ingredient_id = e.target.id.value
        const amount = e.target.amount.value
        let configObj = {method: "POST",
                        headers: {Authorization: `Bearer ${token}`,
                    "content-type": "application/json",
                    "accepts": "application/json"},
                body: JSON.stringify({pantry: {amount_type, amount}, other_info:{ingredient_id: ingredient_id}})}
        console.log(configObj)
        fetch("http://localhost:3001/users/add_pantry", configObj)
        .then(resp => resp.json())
        .then(data => this.setState({ myIngredients: data }))
    }

    componentDidMount= () =>{
        let token= localStorage.getItem("token")
        fetch("http://localhost:3001/users/ingredients",{headers:{ Authorization: `Bearer ${token}`}})
        .then(resp => resp.json())
        .then(data=> this.setState({myIngredients: data}))
    }

    render(){
        
        return(
            <>
            <MyIngredients myIngredients={this.state.myIngredients} addPantry={this.addPantry}/>
        </>)
    }

}

export default withRouter(PantryContainer)