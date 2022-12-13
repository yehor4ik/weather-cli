#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import {printHelp, printSuccess, printError, printWeather} from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from "./services/storage.service.js";
import {getWeather} from "./services/api.sevice.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError('Token has not been set')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token has been saved');
    } catch (e) {
        printError(e.message);
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('City has not been set')
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City has been saved');
    } catch (e) {
        printError(e.message);
    }
}

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city)
        printWeather(weather)
    } catch (e) {
        if (e?.response?.status === 404 || e?.response?.status === 400) {
            printError('Incorrect city');
        } else if (e?.response?.status === 401) {
            printError('Incorrect token');
        } else {
            printError(e.message);
        }

    }
}

const initCLI = () => {
    const args = getArgs(process.argv);

    if (args.h) {
        printHelp();
        return
    }
    if (args.s) {
        saveCity(args.s)
        return;
    }
    if (args.t) {
        saveToken(args.t);
        return;
    }

    getForcast();
};

initCLI()

//6f6fe46b508a6cf297b99f2b3f9b5a78