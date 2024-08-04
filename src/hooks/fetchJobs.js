import axios from 'axios'

export const getJobs = async () => {
    try {
        const response = await axios.get('/data.json')
        return response.data
    }
    catch (error) {
        console.log(error.message)
    }
}