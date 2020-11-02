import { NearEarthObject, Planet, ChartData } from './types'

export const getLastOrbitalBody = (neo: NearEarthObject): Planet | null => {
    return neo.close_approach_data?.slice(-1)[0]?.orbiting_body || null
}

export const getAverage = (numberOne: number, numberTwo: number): number => {
    return (numberOne + numberTwo) / 2
}

export const removeDuplicates = (array : any[]) : any[] => array
    .reduce((acc: Planet[], currentValue: Planet) => acc.includes(currentValue) ? acc : [...acc, currentValue], [])

export const neoToChartData = (neoData: NearEarthObject[], selectedPlanet: Planet | '') : ChartData[] => {
    return neoData.filter((neo: NearEarthObject) => !!neo?.estimated_diameter?.kilometers)
            // keep only neo that matches selected planet
            .filter((neo: NearEarthObject) => !selectedPlanet || getLastOrbitalBody(neo) === selectedPlanet)
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
}