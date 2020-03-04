import React from 'react'
import Chart from 'react-google-charts'
import { NearEarthObject, ChartData } from '../types'

const getAverage = (numberOne: number, numberTwo: number): number => {
    return (numberOne + numberTwo) / 2
}
const BarChart = (props: { neoData: NearEarthObject[] }) => {
    const neoData = props.neoData

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
