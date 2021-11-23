import axios from 'axios';

// Default config for AXIOS
export default axios.create(
    {
        //TODO Incluir url de la API
        baseURL: '',
        responseType: 'json',
        timeout: 6000
    }
)