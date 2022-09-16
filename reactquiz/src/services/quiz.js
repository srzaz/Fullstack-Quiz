import axios from 'axios'
const baseUrl = '/api/results'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}


const getQuestions = () => {
    const request = axios.get("https://opentdb.com/api.php?amount=10&difficulty=easy")
    return request.then(response => response.data)
}

const postResults = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

export default {getQuestions, postResults, setToken}