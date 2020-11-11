import React, {useState} from 'react'
import styled from 'styled-components'
import { withRouter, Link } from 'react-router-dom'
import { Popup, Grid, Divider,Modal } from 'semantic-ui-react'
function MyRecipeCard(props) {
    let [isOpen, setIsOpen] = useState(false)
    let [view, setIsView] = useState(false)
    const renderIng = () => {
        return props.recipe.recipe_ingredients.map(ing => {
            return <li>{(ing.ingredient.name)}</li>
        })
    }

    const handleOpen = () => {
        setIsView(false)
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false)
        setIsView(false)
    }

    // style={{border: "0.5px #fff solid", background: "rgba(255,255,255,0.5)"}} 
    return (
        <Popup style={{opacity: "0.7"}} trigger={<Link>
            <div className="fade-in recipe" onClick={(e) => {
                return e.target.className.includes("recipe") ? props.history.push(`/recipes/${props.recipe.spoon_id}`) : null}}
                style={{
                    background: `url("${props.recipe.image_url}")`,
                    animationFillMode: "backwards", opacity: "0.9", backgroundSize: "cover", 
                    backgroundPosition: "center", width: "280px", height: "310px", margin: "20px", 
                    display: "grid", border: "0.5px grey solid", borderRadius: "10px", zIndex: "1"
                }}>


                <div style={{ alignContent: "middle", background: "whitesmoke", border: "0.5 solid black", height: "fit-content", width: "fit-content", justifySelf: "center", alignSelf: "center", padding: "10px", borderRadius: "15px", opacity: ".8", fontWeight: "700", alignSelf: "end" }}>{props.recipe.name}</div>

                <Modal inverted style={{textAlign: "center"}} onClick={handleClose}open={isOpen} onClose={handleClose} onOpen={handleOpen} trigger={<Button> Quick Details</Button>} flowing hoverable on='click'>
                    <h2>{props.recipe.name}</h2>
                    <Grid columns={2} style={{margin: "auto"}}>
                        <Grid.Column style={{ listStyle: "none", textTransform: "capitalize", marginLeft: "43px" }}>


                            <h2>Ingredients Required</h2>
                            <div>
                                {renderIng()}
                            </div>

                        </Grid.Column>
                        <Divider vertical></Divider>
                        <Grid.Column style={{ width: "320px" }}>
                            {props.recipe.description}
                        </Grid.Column>

                    </Grid>
                </Modal>
            </div> </Link>} content="View Recipe" offset={[0, -80]} basic on="hover" open={view} onClose={()=> setIsView(false)} onOpen={()=>setIsView(true)} position="top center"/>
        
    )
}

export default withRouter(MyRecipeCard)

const style = {
                borderRadius: 0,
    opacity: 0.7,
    padding: '2em',
}

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
    height: 40px;
    align-self: flex-end;
    z-index: 10;
`