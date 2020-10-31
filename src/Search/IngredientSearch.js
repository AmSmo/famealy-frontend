import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import AddIngredientCard from '../Pantry/card/AddIngredientCard'
import IngredientSearchForm from './forms/IngredientSearchForm'
class IngredientSearch extends Component {
    state = {
        ingredients: []
    }

    pantryAdd = (e) => {
        console.log(e.target)
    }
    search = (ingredient) => {
        let token = localStorage.getItem("token")
        fetch(`http://localhost:3001/ingredient_search/${ingredient}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => response.json())
        .then(ingredient => this.setState({ ingredients: [ingredient] }))
    }
    componentDidMount = () => {
        this.search()
    }

    searchHandler = (e, ingredientSearch) => {
        e.preventDefault()
        // this.props.match.params.ingredient = ingredientSearch
        this.search(ingredientSearch)
    }


    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.match.params.ingredient !== prevProps.match.params.ingredient){
            this.search()
            return true
        }
            
        }

    renderIngredients = () =>{
        
        
        if (this.state.ingredients.length > 0){
            return <AddIngredientCard addPantry={this.props.addPantry} ingredient={this.state.ingredients} myingredients={this.props.myingredients}/> }
    }
            
    

    render() {
        return (
            <>
                <IngredientSearchForm searchHandler={this.searchHandler} />
                { this.props.match.keyword === null ?
                    <>
                        
                    </>
                    :
                    <>
                        
                        {this.renderIngredients()}
                    </>
                }
            </>
        )
    }
}

export default withRouter(IngredientSearch)