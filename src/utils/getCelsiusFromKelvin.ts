
export const getCelsiusFromKelvin = (kelvin: number): number => {
    return Math.round(kelvin - 273.15)
}