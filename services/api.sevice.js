import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

export const getWeather = async (city) => {
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
    if (!token) {
        throw new Error('The api key is not set, set it throw command -t [API_KEY]');
    }

    const cityGeocoding = await getCityGeocoding(city, token);
    if (cityGeocoding.length === 0) throw new Error('Incorrect city');

    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            lat: cityGeocoding[0].lat,
            lon: cityGeocoding[0].lon,
            appid: token,
            units: 'metric'
        }
    });
    return response.data;
};
const getCityGeocoding = async (city, token) => {
    const {data} = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: city,
            appid: token
        }
    })
    return data;
}