import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import AddIngredientCard from '../Pantry/card/AddIngredientCard'
import IngredientSearchForm from './forms/IngredientSearchForm'
class IngredientSearch extends Component {
    state = {
        ingredients: []
    }

    pantryAdd = (e) => {
        
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
                <IngredientSearchForm searchHandler={this.searchHandler} sortIngredients={this.props.sortIngredients} />
                { this.props.match.keyword === null ?
                    <>
                        
                    </>
                    :
                    <List style={{display: "inline-flex"}}> 
                        
                        {this.renderIngredients()}
                    </List>
                }
            </>
        )
    }
}

export default withRouter(IngredientSearch)