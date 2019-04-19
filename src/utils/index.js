
export const  isBlank = (str)=> str.length === 0
export const  clean = (errors)=> !(errors.startPoint || errors.endPoint || errors.date || errors.passengersNb)
