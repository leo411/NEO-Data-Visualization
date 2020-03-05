import React from 'react'
import Chart from 'react-google-charts'
import { NearEarthObject, ChartData, Planet } from '../types'
import { getLastOrbitalBody, getAverage } from '../functions'
import './Table.css'

const Table = (props: {
    neoData: NearEarthObject[]
    selectedPlanet: Planet | ''
}) => {
    let neoData = props.neoData
    let selectedPlanet = props.selectedPlanet
    return (
        <Chart
            className="table"
            width={'500px'}
            chartType="Table"
            loader={<div>Loading Chart</div>}
            data={[
                [
                    { type: 'string', label: 'NEO Name' },
                    { type: 'number', label: 'Min Estimated Diameter (km)' },
                    { type: 'number', label: 'Max Estimated Diameter (km)' }
                ],
                ...neoData
                    .filter(
                        (neo: NearEarthObject) =>
                            !!neo?.estimated_diameter?.kilometers &&
                            (!selectedPlanet ||
                                getLastOrbitalBody(neo) === selectedPlanet)
                    )
                    .map(
                        neo =>
                            [
                                neo.name.length > 18
                                    ? neo.name_limited
                                    : neo.name,
                                neo.estimated_diameter.kilometers
                                    .estimated_diameter_min,
                                neo.estimated_diameter.kilometers
                                    .estimated_diameter_max
                            ] as ChartData
                    )
                    .sort(
                        (a, b) =>
                            getAverage(b[1], b[2]) - getAverage(a[1], a[2])
                    )
            ]}
            options={{
                showRowNumber: true
            }}
        />
    )
}

export default Table
