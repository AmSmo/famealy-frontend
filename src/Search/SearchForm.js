import React, { useState } from 'react'
import styled from 'styled-components'
function SearchForm(props) {
    const [recipeKeyword, setRecipeKeyword] = useState('')
    const [ingredientKeyword, setIngredientKeyword] = useState('')


    const changeHandler = (e) => {
        switch (e.target.name) {
            case "recipeKeyword":
                setRecipeKeyword(e.target.value)
                break;
            case "ingredientKeyword":
                setIngredientKeyword(e.target.value)
                break;
            default:

                break;

        }
    }
    return(
                <>
                <p style={head}>Welcome to FaMealy</p>
                
                <div style={loginStyle}>
                
                    <div style={{ maxWidth: 450 }}>
                        <h2>
                           Recipe Search
                        </h2>
                        <form size='large'>
                            <>
                                <input type="text" onChange={changeHandler} value={recipeKeyword} name="recipeKeyword" placeholder='Recipe Keyword' />
                                <input type="text"
                                    
                                    icon='lock'
                                    name="ingredientKeyword"
                                    
                                    placeholder='ingredientKeyword'
                                    onChange={changeHandler}
                                    value={ingredientKeyword}
                                />

                                <Button>
                                    Search
                                </Button>
                            </>
                        </form>
                        
                    </div>
                
            </div>
            </>
)
}
export default SearchForm

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

const head = {
    fontSize: "4em",
}
const loginStyle = {
    background: "#4CD4A9",
    width: "250px",
    height: "300px",
    border: ".1px solid black",
    display: "block",
    margin: "30px auto",
    padding: "20px"
}