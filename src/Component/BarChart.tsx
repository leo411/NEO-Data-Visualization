import React from 'react'
import Chart from 'react-google-charts'
import { NearEarthObject, ChartData, Planet } from '../types'
import { getLastOrbitalBody, getAverage } from '../functions'

const BarChart = (props: {
    neoData: NearEarthObject[]
    selectedPlanet: Planet | ''
}) => {
    const neoData = props.neoData
    const selectedPlanet = props.selectedPlanet

    return (
        <Chart
            width={'700px'}
            height={'700px'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={[
                [
                    'NEO Name',
                    'Min Estimated Diameter (km)',
                    'Max Estimated Diameter (km)'
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
                            getAverage(b[1], b[2]) - getAverage(a[1], b[2])
                    )
            ]}
            options={{
                chartArea: { width: '50%' },
                hAxis: {
                    title: 'Min Estimated Diameter (km)',
                    minValue: 0
                },
                vAxis: {
                    title: 'NEO Name'
                }
            }}
        />
    )
}

export default BarChart
