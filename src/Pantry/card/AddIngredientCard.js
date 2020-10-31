import React, {useState} from 'react'

import styled from 'styled-components'
import { Dropdown } from 'semantic-ui-react'
function AddIngredientCard(props) {
    const ingredient = props.ingredient[0]
    let [amountType, setAmountType] = useState("oz")
    const onChange = (e, result) => {
        setAmountType(result.value)
    }
    if (!ingredient.message){
        const options = []
        ingredient.possible_units.map(unit => {
            options.push({
                key: unit,
                text: unit,
                value: unit
            })
        })
       
        
        return (
            <Ingredient>
                <img width="50px" src={ingredient.image_url} />
                <div style={{textTransform: 'capitalize'}}>{ingredient.name}</div>
                <br></br>
                <form onSubmit={(e) => props.addPantry(e, amountType)}>
                    <input type="hidden" name="id" value={ingredient.spoon_id}/>
                    Add <input type="number" step=".05" placeholder="Amount" name="amount" />{' '}
                    <Dropdown
                        inline
                        name="amountType"
                        options={options}
                        onChange={onChange}
                        defaultValue={"oz"}
                        placeholder="Amount Type"
                    />
                    <input type="submit" value="Add to Pantry"/>
                </form>

            </Ingredient>)
    }else{
        return null
    
    }
}

export default AddIngredientCard

const Ingredient = styled.div`
    display: block;
`