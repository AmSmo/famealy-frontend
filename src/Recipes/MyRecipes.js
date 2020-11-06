import React from 'react'
import MyRecipeCard from './Cards/MyRecipeCard.js'
import {withRouter} from 'react-router-dom'
import { Segment } from 'semantic-ui-react'
import SearchForm from '../Search/SearchForm'
import styled from 'styled-components'
function MyRecipes(props){
   
    const renderRecipes = () => {
        return props.info.recipes.map(recipe => <MyRecipeCard key={recipe.id} recipe={recipe} history={ props.history} />)
    }

    return(
        <Background>
        <LeftCorner>

        </LeftCorner>
            <RightCorner>

            </RightCorner>
         <Middle >
                
                {props.info.recipes.length > 0 ?
                    <>
                        <h2>Recipes</h2>
                        <div style={{width: "80vw", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                            {renderRecipes()}
                        </div>
                        </>
                    :
                    <>
                <h2>You don't have any recipes</h2>
                <p>Search for some:</p>
                <SearchForm />
                </>
                }

            </Middle>
            
            </Background>
    )
}

export default withRouter(MyRecipes)


const LeftCorner = styled.div`
display: block;
width: 220px;
float: left;
height: 80vh;
padding-top: 40px;
padding-left: 30px;
margin: 0px auto;
background: url("/assets/fork2.png");
background-repeat: no-repeat;
background-size: contain;
background-position-x: 80px;

// background-position-y: 20px;

`


const Middle = styled.div`

margin: 0 auto;
text-align: center;
display: flex;
flex-wrap: wrap;
justify-contents: space-around;
 h2 {
        margin: auto; 
    }

`


const RightCorner = styled.div`
   
    display: block;
    width: 220px;
    float: right;
    height: 80vh;
    padding-top: 40px;
    margin: 0px auto;
    right: 20px;
    background: url("/assets/knife2.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position-x: 80px;
    // background-position-y: 20px;
   
`


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