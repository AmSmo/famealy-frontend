import React, { useEffect, useState } from 'react'
import MyRecipeCard from './Cards/MyRecipeCard.js'
import { withRouter } from 'react-router-dom'
import PhotoPlaceHolder from '../PlaceHolders/PhotoPlaceHolder'
import SearchForm from '../Search/SearchForm'
import styled from 'styled-components'
function MyRecipes(props) {
    let [loaded, setLoaded] = useState(false)
    const renderRecipes = () => {
        return props.info.recipes.map(recipe => <MyRecipeCard key={recipe.id} recipe={recipe} history={props.history} />)
    }

        useEffect(() => {
            setTimeout(() =>{setLoaded(true)}, 1100)
        })

    return (
        <Background>
            {/* <LeftCorner>

            </LeftCorner>
            <RightCorner>

            </RightCorner> */}
            
            
                {loaded ?
                <Middle >
                    {
                        props.info.recipes.length > 0 ?
                            <>
                                <div style={{ width: "80vw", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                                    {renderRecipes()}



                                </div>
                            </>
                            :
                            null
                            
                    }
                </Middle>
                    :
                    <PhotoPlaceHolder/>
                        }

            
            
            </Background >
    )
}

export default withRouter(MyRecipes)





const Middle = styled.div`

margin: 0 auto;
text-align: center;
display: flex;
height:92vh;
overflow-y: scroll;
flex-wrap: wrap;
justify-contents: space-around;
 h2 {
        margin: auto; 
    }

`



const Background = styled.div`
padding-top: 10px;
// background: url("/assets/tablefull2.png");
position: absolute;
height: 93vh;
width: 100vw;
background-size: cover;
background-repeat: no-repeat;
text-align: center;
margin: 0 auto;
display:table;  
`