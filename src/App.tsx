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
    let [page, setPage] = useState<number>(0)
    let [maxPage, setMaxPage] = useState<number>()

    useEffect(() => {
        fetch(
            `http://www.neowsapp.com/rest/v1/neo/browse?page=${page}&size=20&api_key=DEMO_KEY`
        )
            .then(response => response.json())
            .then((data: NASAData) => {
                setMaxPage(data.page.total_pages)
                setNeoData(data.near_earth_objects)
            })
            .catch(error =>
                alert(
                    'The chart cannot be loaded. The chart cannot get the data from the server'
                )
            )
    }, [page])

    return (
        <div className="App">
            <img src={NasaLogo} className="App-logo" alt="nasalogo" />
            <button
                className="button"
                onClick={() =>
                    setChartTypeShown(
                        chartTypeShown === 'table' ? 'bar' : 'table'
                    )
                }
            >
                Display as a {''}
                {chartTypeShown === 'table' ? 'bar chart ' : 'table'}{' '}
            </button>
            <div>
                {page === 0 ? null : (
                    <button className="button" onClick={e => setPage(page - 1)}>
                        Previous set of NEOs
                    </button>
                )}
                {maxPage && page >= maxPage ? null : (
                    <button className="button" onClick={e => setPage(page + 1)}>
                        Next set of NEOs
                    </button>
                )}
            </div>
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
