import React, { useState } from 'react'

const Dropdown = () => {
    let [userInputPlanet, setUserInputPlanet] = useState<string>()
    return (
        <form>
            <input
                value={userInputPlanet}
                onChange={e => setUserInputPlanet(e.target.value)}
                placeholder={'enter a planet'}
            ></input>
        </form>
    )
}
export default Dropdown
