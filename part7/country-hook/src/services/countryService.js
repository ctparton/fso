import axios from 'axios'

const getCountry = async (country) => {
    const response = await axios.get(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`)
    return response
}

export default {
    getCountry
}
