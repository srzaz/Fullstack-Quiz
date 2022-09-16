import axios from 'axios'
const baseUrl = '/api/results'


const getResults = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default {getResults}