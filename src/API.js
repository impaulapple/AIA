import axios from 'axios';


const server = axios.create({
    // baseURL: "http://localhost:5000/",
    headers: {
        'Content-Type': 'application/json',
        Pragma: 'no-cache',
        crossdomain: true
    }
});


export const apiGetResult_ML = async (aPayload) => await server.post('/api/predict/ml', aPayload);

export const apiGetResult_DL = async (aPayload) => await server.post('/api/predict/dl', aPayload);
