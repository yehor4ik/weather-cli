import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);

};

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
        Without params - weather display
        -s [CITY] to set city
        -h for display 'help'
        -t [API_KEY] for saving token
        `
    );
};

export const printWeather = (res) => {
    console.log(
        dedent`${chalk.bgBlueBright(' WEATHER ')} Weather in ${res.name}
        ${res.weather[0].description}
        Temperature: ${res.main.temp} (fill like ${res.main.feels_like})
        Humidity: ${res.main.humidity}
        Wind speed : ${res.wind.speed}
        `
    );
};

export {printError, printSuccess, printHelp}