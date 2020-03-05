import { NearEarthObject, Planet } from './types'

export const getLastOrbitalBody = (neo: NearEarthObject): Planet | null => {
    return neo.close_approach_data?.slice(-1)[0]?.orbiting_body || null
}

export const getAverage = (numberOne: number, numberTwo: number): number => {
    return (numberOne + numberTwo) / 2
}
