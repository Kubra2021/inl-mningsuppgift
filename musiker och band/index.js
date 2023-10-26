import Musician from './musiker.js'; // Import the Musician class from 'musiker.js'
import Band from './band.js'; // Import the Band class from 'band.js'

const music = new Musician(); // Create a new Musician instance
const band = new Band(); // Create a new Band instance

import readline from 'readline'; // Import the 'readline' module for user input
import fs from 'fs'; // Import the 'fs' module for file system operations

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function saveDataToJSON(filename, data) {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2)); // Save data to a JSON file
}

function loadDataFromJSON(filename) {
  try {
    const rawData = fs.readFileSync(filename); // Load data from a JSON file
    return JSON.parse(rawData);
  } catch (err) {
    return [];
  }
}

function printBands(bands) {
  bands.forEach((band, index) => {
    console.log(`${index + 1}. ${band.name}`);
  });
}

function printMusicians(musicians) {
  musicians.forEach((musician, index) => {
    console.log(`${index + 1}. ${musician.name}`);
  });
}

const bands = loadDataFromJSON('bands.json'); // Load band data from a JSON file
const musicians = loadDataFromJSON('musicians.json'); // Load musician data from a JSON file

function mainMenu() {
  console.log('\n-- Musician and Band Management --');
  console.log('1. Add Band');
  console.log('2. Add Musician');
  console.log('3. List Bands');
  console.log('4. List Musicians');
  console.log('5. Exit');
  rl.question('Please select an option: ', (choice) => {
    switch (choice) {
      case '1':
        createBand();
        break;
      case '2':
        createMusician();
        break;
      case '3':
        printBands(bands);
        mainMenu();
        break;
      case '4':
        printMusicians(musicians);
        mainMenu();
        break;
      case '5':
        rl.close();
        break;
      default:
        console.log('Invalid option, please try again.');
        mainMenu();
    }
  });
}

function createBand() {
  rl.question('Band name: ', (name) => {
    rl.question('Band information: ', (info) => {
      rl.question('Formation year: ', (formationYear) => {
        rl.question('Dissolution year (if applicable): ', (dissolutionYear) => {
          const band = new Band(name, info, parseInt(formationYear), dissolutionYear ? parseInt(dissolutionYear) : null);
          bands.push(band);
          saveDataToJSON('bands.json', bands);
          console.log(`${name} band successfully created.`);
          mainMenu();
        });
      });
    });
  });
}

function createMusician() {
  rl.question('Musician name: ', (name) => {
    rl.question('Musician information: ', (info) => {
      rl.question('Birth year: ', (birthYear) => {
        const musician = new Musician(name, info, parseInt(birthYear));
        musicians.push(musician);
        saveDataToJSON('musicians.json', musicians);
        console.log(`${name} musician successfully created.`);
        mainMenu();
      });
    });
  });
}

mainMenu();
