import React, { useEffect, useState } from 'react'
import NasaLogo from '../src/Images/NASA_logo.png'
import { NASAData, NearEarthObject, Planet } from './types'
import BarChart from './Component/BarChart'

import './App.css'
import Dropdown from './Component/Dropdown'

const App: React.FC = () => {
    let [neoData, setNeoData] = useState<NearEarthObject[]>([])
    let [selectedPlanet, setSelectedPlanet] = useState<Planet | ''>('')

    useEffect(() => {
        fetch('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY')
            .then(response => response.json())
            .then((data: NASAData) => setNeoData(data.near_earth_objects))
    }, [])
    return (
        <div className="App">
            <img src={NasaLogo} className="App-logo" alt="nasalogo" />
            <Dropdown neoData={neoData} setSelectedPlanet={setSelectedPlanet} />
            <BarChart neoData={neoData} selectedPlanet={selectedPlanet} />
        </div>
    )
}

export default App
