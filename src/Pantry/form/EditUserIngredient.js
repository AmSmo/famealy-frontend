import React, { useState, useEffect } from 'react'
import { Dropdown } from 'semantic-ui-react'
function EditUserIngredient(props) {
    let [toType, setToType] = useState("oz")
    let [ingredient, setIngredient] = useState("")
    let [amount, setAmount] = useState(0)
    let [ingredientId, setIngredientId] = useState(0)
    let [uiId, setUiId] = useState(0)

    
    let options = props.userIngredient.ingredient.possible_units.map(type => {
        return { key: type, text: type, value: type }
    })

    const onChange = (e, result) => {
        switch (result.name) {
            case "toType":
                setToType(result.value)
                break;
            default:
                break;
        }

    }

    useEffect(()=>{
        setToType(props.userIngredient.amount_type)
        setIngredient(props.userIngredient.ingredient.name)
        setAmount(props.userIngredient.amount)
        setIngredientId(props.userIngredient.ingredient.id)
        setUiId(props.userIngredient.id)
    }, [props.userIngredient])

    const onTypeChange = (e) => {

        switch (e.target.name) {
            case "ingredient":
                setIngredient(e.target.value)
                break
            case "amount":
                setAmount(e.target.value)
                break
            default:
                break;
        }
    }

    const editUserIngredient = (e, result) => {
        e.preventDefault()

        let token = localStorage.getItem("token")
        let configObj = {
            method: "PATCH",
            headers: {
                "accepts": "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ convert: { amount, toType, ingredient } })
        }
        // fetch(`http://localhost:3001/user_ingredients/${props.userIngredient.id`, configObj)
        //     .then(resp => resp.json())
        //     .then(data => setAnswer(data["answer"]))
    }

    return (
        <>
            <h3>Edit My Pantry</h3>
            <form onSubmit={(e) => e.preventDefault()} style={{ textAlign: "left" }}>
                <div style={{ margin: "3px auto", display: "flex", justifyContent: "space-evenly" }}>
                    <input type="text" name="ingredient" value={ingredient} placeholder="Ingredient" required onChange={onTypeChange} /><br></br>
                    <input style={{ width: "60px" }} value={amount} type="number" name="amount" step="0.1" required onChange={onTypeChange} />

                </div>
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <Dropdown
                        simple
                        item
                        value={toType}
                        name="toType"
                        options={options}
                        onChange={onChange}

                    />
                </div>


                <br></br>
                <center><input type="submit" value="Calculate" /></center>
            </form>
        </>
    )
}

export default EditUserIngredient