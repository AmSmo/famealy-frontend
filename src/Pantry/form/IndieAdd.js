import React, { useState, useEffect } from 'react'
import { Dropdown, Segment, Grid } from 'semantic-ui-react'
import styled from 'styled-components'
function IndieAdd(props){
    let [spoonId, setSpoonId] = useState(0)
    let [amount, setAmount] = useState(0)
    let [amountType, setAmountType] = useState("oz")
    let [add, setAdd] = useState(false)
    let [item, setItem] = useState({ add: add, spoon_id: props.ingredient.spoon_id, amount: amount, amount_type: amountType })
    
    const handleChange = (e, result) => {
        
        switch (e.target.name) {
            case "amount":
                setAmount(e.target.value)
                props.addList({ add: add, spoon_id: props.ingredient.spoon_id, amount: e.target.value, amount_type: amountType })

                break;
            case "add":
                setAdd(e.target.checked)
                props.addList({ add: e.target.checked, spoon_id: props.ingredient.spoon_id, amount: amount, amount_type: amountType })
                break;
            default:
                 break;
                }
            if (result && result.name === "amountType"){
                    setAmountType(result.value)
                props.addList({ add: add, spoon_id: props.ingredient.spoon_id, amount: amount, amount_type: result.value })
            }
    }       
                
                let options = props.ingredient.possible_units.map(type => {
                    return { key: type, text: type, value: type }
                })
                

                return(
                <form onChange={handleChange}>
                    <div style={{ textTransform: "capitalize", textAlign: "center", display: "inline-flex", width: "260px" }}>
                        <input type="checkbox" name="add" />
                        <span style={{ paddingTop: "4px", paddingLeft: "3px" }}> {props.ingredient.name}</span>

                        <p style={{ float: "right", marginLeft: "auto", marginRight: "35px" }}>
                            <input type="number" value={amount} name="amount" step="0.1" style={{ width: "45px" }} />
                            <Dropdown
                                style={{width: "65px"}}
                                inline
                                name="amountType"
                                options={options}
                                onChange={handleChange}
                                defaultValue={"oz"}
                                placeholder="Amount Type"
                            />
                        </p>
                    </div>
                </form>)}


export default IndieAdd