import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import {Icon} from 'semantic-ui-react'
function PotluckRecipeCard(props) {
    let recipe = props.recipe.recipe
    let supplier = props.recipe.user
    
    
    let back = props.idx % 2 === 0 ? "white" : "#D3D3D3"
    
        
             return (
                 <>
                 <Link style={{ textDecoration: 'none' }}>
                     <li onClick={() => props.history.push(`/recipes/${recipe.spoon_id}`)} style={{ background: back, margin: "2px 0", width: "200px" }}>
                         {recipe.name}
                         <span style={{ color: "grey", float: "right" }}>
                             {supplier.name}
                         </span>
                     </li>
                 </Link>
                 { parseInt(localStorage.getItem("user")) === props.recipe.user.id ? <Link><Icon name="minus" onClick={() => props.deleteRecipe(props.recipe.potluck_recipe_id)} /></Link> : null }
                 </>
             )
         
    

}

export default withRouter(PotluckRecipeCard)