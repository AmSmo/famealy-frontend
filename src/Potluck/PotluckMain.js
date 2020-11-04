import React, { useEffect, useState } from 'react'
import PotluckCard from './card/PotluckCard'
import {withRouter }from 'react-router-dom'
import PotluckForm from './form/PotluckForm'
import {Segment, Divider} from 'semantic-ui-react'
function PotluckMain(props) {
    let [myPotlucks, setMyPotlucks] = useState([])
    let [friendPotlucks, setFriendPotlucks] = useState([])


    const createPotluck = (e) =>{
        let token = localStorage.getItem("token")
        let {name, location, date} = e.target
        
        let configObj={
            method: "POST",
            headers: {"content-type": "application/json",
                    "accepts": "application/json",
                Authorization: `Bearer ${token}`},
                body: JSON.stringify({potluck: {name: name.value, date: date.value, location: location.value}})
        }
        fetch("http://localhost:3001/potlucks", configObj)
        .then(resp=> resp.json())
            .then(data => {

                setMyPotlucks(data.my_potlucks)
                setFriendPotlucks(data.friends_potlucks)
    })
    }
    const renderMyPotlucks = () => {
        return myPotlucks.map(currentPotluck => <PotluckCard potluck={currentPotluck} />)
    }


    const renderFriendsPotlucks = () => {
        return friendPotlucks.map(potluck => <PotluckCard potluck={potluck} join={true}/>)
    }


    async function fetchPotlucks() {
        let token = localStorage.getItem("token")
        const resp = await fetch("http://localhost:3001/potlucks", { headers: { Authorization: `Bearer ${token}` } })
            .then(resp => resp.json())
            .then(data => {
                
               setMyPotlucks(data.my_potlucks)
               setFriendPotlucks(data.friends_potlucks)
            }
            )
    }


    useEffect(() => {
        fetchPotlucks()
    }, [])
    
    return (
        <>
            <h2>Create a Potluck</h2>
            <PotluckForm createPotluck={createPotluck} />
            <Segment >
            {myPotlucks.length > 0 ?
                <>
                    <h3>My Potlucks</h3>
                    {renderMyPotlucks()}
                </>
                :<h4>You aren't a part of any Potlucks.  You should Create or Join one.</h4>
            }
                <Divider  />
            {friendPotlucks.length > 0 ?
            <>
                <h3>Friends Potlucks You May Want To Join:</h3>
                    {renderFriendsPotlucks()}
            </>
                :null
            }
            </Segment>
        </>
    )
}

export default withRouter(PotluckMain)