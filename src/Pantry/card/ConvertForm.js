import React, {useState, useEffect} from 'react'
import {Dropdown, Button } from 'semantic-ui-react'
function ConvertForm(props) {
    let [amountType, setAmountType] = useState("oz")
    let [toType, setToType] = useState("oz")
    const allowedTypes = ["oz", "cup", "g", "tbsp", "tsp", "lb", "kg", "large", "medium", "small", "slice", "can", "clove"]
    let options = allowedTypes.map(type => {
        return {key: type, text:type, value: type}
    })
    const onChange = (e, result) => {
        setAmountType(result.value)
    }
    const fetchMeasurements = (e) => {
        console.log(e.target)
    }
    return (
        <>
            <h3>Convert Measurements</h3>
            <form onSubmit={fetchMeasurements} style={{textAlign: "left"}}>
                <div style={{ margin: "3px auto", display: "flex", justifyContent: "space-evenly" }}>
                <input type="text" name="ingredient" placeholder="Ingredient"  /><br></br>
                    <input style={{ width: "60px" }}type="number" name="amount" step="0.1"/>
                
                <Dropdown
                    placeholder='From'
                    
                    options={options}
                    onChange={onChange}
                    
                    
                />
                </div>
                <div style={{display: "flex",justifyContent: "space-evenly"}}>
                    <span>Convert to</span>
               
                <Dropdown
                    simple
                    item
                    name="toType"
                    options={options}
                    onChange={onChange}
                    defaultValue={"oz"}
                    />
                </div>
                
                
                <br></br>
                <center><input type="submit" value="Calculate" /></center>
            </form>
        </>
    )
}

export default ConvertForm