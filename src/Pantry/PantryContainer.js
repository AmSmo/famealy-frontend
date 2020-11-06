import React, { Component} from 'react'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import MyIngredients from './MyIngredients.js'


class PantryContainer extends Component {

    state = {
        myIngredients: [],
        edited: {},
        mySuppliedIngredients: [],
        list: 0,
        max: 1
    }
    
    editIngredient = (ing) => {
        console.log("edited", ing)
        let arrayCopy = this.state.myIngredients
        console.log(arrayCopy)
        let idx = arrayCopy.findIndex( ingredient => ingredient.id === ing.id)
        arrayCopy[idx] = ing
        return this.setState({myIngredients: arrayCopy })
    }
    
    addBulk = (e, result) => {
        e.preventDefault()
        console.log(e)
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
            <Background>
                <MyIngredients myIngredients={this.state.myIngredients} addPantry={this.addPantry} editIngredient={this.editIngredient} convertIngredient={this.convertIngredient} mySuppliedIngredients={this.state.mySuppliedIngredients} addBulk={this.addBulk} />
            </Background>)
    }

}

export default withRouter(PantryContainer)


const Background = styled.div`
padding-top: 10px;

background: url("/assets/tablefull2.png");
position: absolute;
height: 93vh;
width: 100vw;
background-size: cover;
background-repeat: no-repeat;
text-align: center;
margin: 0 auto;
display:table;  
`