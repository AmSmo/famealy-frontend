import React, { Component} from 'react'
import {withRouter} from 'react-router-dom'

import MyIngredients from './MyIngredients.js'


class PantryContainer extends Component {

    state = {
        myIngredients: [],
        edited: {},
        mySuppliedIngredients: []
    }
    
    editIngredient = (ing) => {
        console.log("edited", ing)
        let arrayCopy = this.state.myIngredients
        console.log(arrayCopy)
        let idx = arrayCopy.findIndex( ingredient => ingredient.id === ing.id)
        arrayCopy[idx] = ing
        return this.setState({myIngredients: arrayCopy })
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
        
        fetch("http://localhost:3001/users/add_pantry", configObj)
        .then(resp => resp.json())
        .then(data => this.setState({ myIngredients: data }))
    }

    
    


    componentDidMount= () =>{
        
        let token= localStorage.getItem("token")
        fetch("http://localhost:3001/users/ingredients",{headers:{ Authorization: `Bearer ${token}`}})
        .then(resp => resp.json())
        .then(data=> {
            console.log("check it", data)
            this.setState({myIngredients: data.my_ingredients, mySuppliedIngredients: data.my_supplied_ingredients})})
    }

    render(){   
        
        console.log("round1", this.state.myIngredients)
        return(
            <>
                <MyIngredients myIngredients={this.state.myIngredients} addPantry={this.addPantry} editIngredient={this.editIngredient} convertIngredient={this.convertIngredient} mySuppliedIngredients={this.state.mySuppliedIngredients} />
            </>)
    }

}

export default withRouter(PantryContainer)


