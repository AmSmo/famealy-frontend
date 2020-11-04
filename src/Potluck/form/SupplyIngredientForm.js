import React, { useState } from 'react'

import styled from 'styled-components'
import { Dropdown } from 'semantic-ui-react'
function AddIngredientCard(props) {
    const ingredient = props.ingredient
    
    let [amountType, setAmountType] = useState("oz")
    const onChange = (e, result) => {
        setAmountType(result.value)
    }
    if (!ingredient.message) {
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
                
                <div style={{ textTransform: 'capitalize' }}>{ingredient.ingredient_name}</div>
                <br></br>
                <form onSubmit={(e) => props.supplyIngredient(e, amountType)}>
                    <input type="hidden" name="id" value={ingredient.ingredient_id} />
                    Add <input type="number" step=".05" placeholder="Amount" name="amount" required/>{' '}
                    <Dropdown
                        inline
                        name="amountType"
                        options={options}
                        onChange={onChange}
                        defaultValue={"oz"}
                        placeholder="Amount Type"
                    />
                    <input type="submit" value="Add to Potluck Stock" />
                </form>

            </Ingredient>)
    } else {
        return null

    }
}

export default AddIngredientCard

const Ingredient = styled.div`
    display: block;
`