const readline = require('readline');
const fs = require('fs').promises;
const { program } = require('commander');
require('colors');
program.option(
    '-f, --file [type]',
    'file for saving game results',
    'results.txt',
);
program.parse(process.argv);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let count = 0;
const logFile = program.opts().file;
const mind = Math.floor(Math.random() * 10) + 1;

const isValid = value => {
    if (isNaN(value)) {
        console.log('Enter the number!'.red);
        return false;
    }
    if (value < 1 || value > 10) {
        console.log('The number must be in the range 1 to 10'.red);
        return false;
    }
    return true;
};

const log = async data => {
    try {
        await fs.appendFile(logFile, `${data}\n`);
        console.log(`Result successfully saved to file ${logFile}`.green);
    } catch (err) {
        console.log(`Failed to save file ${logFile}`.red);
    }
};

const game = () => {
    rl.question(
        'Enter a number from 1 to 10: '.yellow,
        value => {
            let a = +value;
            if (!isValid(a)) {
                game();
                return;
            }
            count += 1;
            if (a === mind) {
                console.log('Congratulations, you guessed the number in %d steps'.green, count);
                log(`${new Date().toLocaleDateString()}: Congratulations, you guessed the number in ${count} steps`)
                .finally(() => rl.close());
                return;
            }
            console.log('You haven`t guessed yet, try again'.red);
            game();
        },
    );
};

game();