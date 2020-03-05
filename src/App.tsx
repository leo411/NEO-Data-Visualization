import React, { useEffect, useState } from 'react'
import NasaLogo from '../src/Images/NASA_logo.png'
import { NASAData, NearEarthObject, Planet } from './types'
import BarChart from './Component/BarChart'
import Dropdown from './Component/Dropdown'
import Table from './Component/Table'
import './App.css'

const App: React.FC = () => {
    let [neoData, setNeoData] = useState<NearEarthObject[]>([])
    let [selectedPlanet, setSelectedPlanet] = useState<Planet | ''>('')
    let [chartTypeShown, setChartTypeShown] = useState<'table' | 'bar'>('bar')

    useEffect(() => {
        fetch('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY')
            .then(response => response.json())
            .then((data: NASAData) => setNeoData(data.near_earth_objects))
    }, [])
    return (
        <div className="App">
            <img src={NasaLogo} className="App-logo" alt="nasalogo" />
            <button
                onClick={() =>
                    setChartTypeShown(
                        chartTypeShown === 'table' ? 'bar' : 'table'
                    )
                }
            >
                Display as a {''}
                {chartTypeShown === 'table' ? 'bar chart ' : 'table'}{' '}
            </button>
            <Dropdown neoData={neoData} setSelectedPlanet={setSelectedPlanet} />
            {chartTypeShown === 'bar' ? (
                <BarChart neoData={neoData} selectedPlanet={selectedPlanet} />
            ) : (
                <Table neoData={neoData} selectedPlanet={selectedPlanet} />
            )}
        </div>
    )
}

export default App
