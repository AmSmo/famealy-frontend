import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

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
            <input type="submit" value="Search" onClick={(e) => props.searchHandler(e, ingredientSearch)} />
        </form>
        </>
    )

}

export default withRouter(IngredientSearchForm)