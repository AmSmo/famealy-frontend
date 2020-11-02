import React, { useEffect, useState } from 'react'
import PotluckCard from './card/PotluckCard'
import {withRouter }from 'react-router-dom'

function PotluckMain(props) {
    let [myPotlucks, setMyPotlucks] = useState([])
    let [friendPotlucks, setFriendPotlucks] = useState([])

    const renderMyPotlucks = () => {
        return myPotlucks.map(currentPotluck => <PotluckCard potluck={currentPotluck} />)
    }


    const renderFriendsPotlucks = () => {
        friendPotlucks.map(potluck => <PotluckCard potluck={potluck} join={true}/>)
    }


    async function fetchPotlucks() {
        let token = localStorage.getItem("token")
        const resp = await fetch("http://localhost:3001/potlucks", { headers: { Authorization: `Bearer ${token}` } })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
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
            {myPotlucks.length > 0 ?
                <>
                    <div>My Potlucks</div>
                    {renderMyPotlucks()}
                </>
                :null
            }

            {friendPotlucks.length > 0 ?
            <>
                <div>Friends Potlucks You May Want To Join:</div>
                    {renderFriendsPotlucks()}
            </>
                :null
            }
        </>
    )
}

export default withRouter(PotluckMain)