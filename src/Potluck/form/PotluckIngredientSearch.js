import React, { useState } from 'react'
import styled from 'styled-components'
import AddIngredientCard from '../../Pantry/card/AddIngredientCard'

function PotluckIngredientSearch(props) {

    let [searchVal, setSearchVal] = useState("")
    let [results, setResults] = useState([])

    const changeHandler = (e) => {
        switch (e.target.name) {
            case "query":
                setSearchVal(e.target.value)
                break;
            default:
                break;
        }
    }

  
    const search = (ingredient) => {
        let token = localStorage.getItem("token")
        fetch(`http://localhost:3001/ingredient_search/${ingredient}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => response.json())
            .then(ingredient => {
                
                setResults([ingredient])
            })
    }


    const searchHandler = (e, ingredientSearch) => {
        e.preventDefault()
        search(ingredientSearch)

    }

    return (
        <>
            <form onSubmit={e => {
                e.preventDefault()
                
                return searchHandler(e, searchVal)
            }}>
                <input type="text" name="query" placeholder="Ingredient" onChange={changeHandler}></input>
                <Button>Search </Button>
            </form>
            {results.length > 0 ?
            <>
            <AddIngredientCard ingredient={results} addPantry={props.addPantry} />
            </>:
            null
        }
        </>
    )

}

export default PotluckIngredientSearch



const Button = styled.button`
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