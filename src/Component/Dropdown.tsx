import React, { useState } from 'react'
import { NearEarthObject, Planet } from '../types'
import { getLastOrbitalBody } from '../functions'
import './Dropdown.css'

const Dropdown = (props: {
    neoData: NearEarthObject[]
    setSelectedPlanet: Function
}) => {
    let [userInputPlanet, setUserInputPlanet] = useState<string>('')
    let [showList, setShowList] = useState<boolean>(false)

    let neoData = props.neoData

    let setSelectedPlanet = props.setSelectedPlanet

    let allOrbitingBodyFromNeoData: Planet[] = neoData
        .map(neo => getLastOrbitalBody(neo))
        .filter(planet => !!planet) as Planet[]

    let selectablePlanets: Planet[] = allOrbitingBodyFromNeoData.reduce(
        (acc: Planet[], currentValue: Planet) =>
            acc.includes(currentValue) ? acc : [...acc, currentValue],
        []
    )
    return (
        <form style={{ position: 'relative', marginBottom: '10px' }}>
            <input
                className="searchbar"
                value={userInputPlanet}
                onChange={e => setUserInputPlanet(e.target.value)}
                onFocus={e => setShowList(true)}
                placeholder={'enter a planet'}
            />
            {showList ? (
                <ul className="dropdownlist">
                    {selectablePlanets
                        .filter(planet =>
                            planet
                                .toLowerCase()
                                .includes(userInputPlanet.toLowerCase())
                        )
                        .map(planet => (
                            <li
                                className="planetsuggestion"
                                onClick={() => {
                                    setSelectedPlanet(planet)
                                    setShowList(false)
                                }}
                            >
                                {planet}
                            </li>
                        ))}
                </ul>
            ) : null}
        </form>
    )
}
export default Dropdown
