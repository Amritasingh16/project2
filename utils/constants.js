export const scaleFactor = 621 / 900

const baseUrl = 'http://localhost:3001/functionup'
export const collegeDetailsApi = collegeName => `${baseUrl}/collegeDetails?collegeName=${collegeName}`
export const placementInterestApi = `${baseUrl}/interns`
