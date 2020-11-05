import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
function IngredientSearchForm(props) {
    const [ingredientSearch, setIngredientSearch] = useState('')


    const changeHandler = (e) => {
        setIngredientSearch(e.target.value)
    }
    
        return (
            <>
            <h3>Find Ingredient</h3>
        <form onSubmit={e => {
            e.preventDefault()
            return props.searchHandler(e, ingredientSearch)}}>
            <input type="text" name="query" placeholder="Ingredient" onChange={changeHandler}></input>
            <Button>Search </Button>
        </form>
        </>
    )

}

export default withRouter(IngredientSearchForm)

const Button = styled.button`
    margin: 5px auto;
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