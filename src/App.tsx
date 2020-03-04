import React, { useEffect, useState } from 'react'
import NasaLogo from '../src/Images/NASA_logo.png'
import { NASAData, NearEarthObject } from './types'

import './App.css'

const App: React.FC = () => {
    let [neoData, setNeoData] = useState<NearEarthObject[]>([])

    useEffect(() => {
        fetch('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY')
            .then(response => response.json())
            .then((data: NASAData) => setNeoData(data.near_earth_objects))
    }, [])
    return (
        <div className="App">
            <img src={NasaLogo} className="App-logo" alt="nasalogo" />

            {neoData.map(object => {
                return <h1>{object.name}</h1>
            })}
        </div>
    )
}

export default App
