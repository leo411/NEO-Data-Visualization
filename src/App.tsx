import React, { useEffect, useState } from 'react'
import NasaLogo from '../src/Images/NASA_logo.png'
import { NASAData, NearEarthObject, Planet, ChartData } from './types'
import Dropdown from './Component/Dropdown'
import './App.css'
import Chart from 'react-google-charts'
import { neoToChartData } from './functions'

const App: React.FC = () => {
    let [neoData, setNeoData] = useState<NearEarthObject[]>([])
    let [selectedPlanet, setSelectedPlanet] = useState<Planet | ''>('')
    let [chartTypeShown, setChartTypeShown] = useState<'table' | 'bar'>('bar')
    let [page, setPage] = useState<number>(0)
    let [maxPage, setMaxPage] = useState<number>()
    let [filteredNeoDataForChart, setFilteredNeoDataForChart] = useState<ChartData[]>([])

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

    useEffect(()=> {
        setFilteredNeoDataForChart(neoToChartData(neoData, selectedPlanet))
    }, [neoData, selectedPlanet])

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
                Display as a
                {chartTypeShown === 'table' ? ' bar chart ' : ' table'}
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
            <Chart
                style={{ color: '#000' }}
                width={chartTypeShown === 'bar' ? '700px' : '500px'}
                height={chartTypeShown === 'bar' ? '500px' : ''}
                chartType={chartTypeShown === 'bar' ? 'BarChart' : 'Table'}
                loader={<div>Loading Chart</div>}
                data={[
                    [
                        { type: 'string', label: 'NEO Name' },
                        {
                            type: 'number',
                            label: 'Min Estimated Diameter (km)'
                        },
                        { type: 'number', label: 'Max Estimated Diameter (km)' }
                    ],
                    ...filteredNeoDataForChart
                ]}
                options={
                    chartTypeShown === 'bar'
                        ? {
                              chartArea: { width: '50%' },
                              hAxis: {
                                  title: 'Min Estimated Diameter (km)',
                                  minValue: 0
                              },
                              vAxis: {
                                  title: 'NEO Name'
                              }
                          }
                        : {
                              showRowNumber: true
                          }
                }
            />
        </div>
    )
}

export default App
