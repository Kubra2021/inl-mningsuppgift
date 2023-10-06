const fs = require('fs');
const readline = require('readline');
const questionsJSON = require('./questions.json');

const questions = questionsJSON.questions;

const answersFile = 'answers.json';
const scoresFile = 'scores.json';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function answerQuestion(questionIndex, userAnswer, userName) {
  const question = questions[questionIndex - 1];
  if (!question) {
    calculateResults(userName);
    return;
  }

  const answer = question.answers[userAnswer] || {};

  for (let animal in answer) {
    if (!scores[animal]) {
      scores[animal] = 0;
    }
    scores[animal] += answer[animal];
  }

  answers.push({
    userName,
    date: new Date(),
    answers: { [questionIndex]: userAnswer },
  });

  const newQuestionIndex = questionIndex + 1;
  if (newQuestionIndex <= questions.length) { 
    rl.question(`${newQuestionIndex}. Question: ${questions[newQuestionIndex - 1].question} (Yes/No): `, (answer) => {
      answerQuestion(newQuestionIndex, answer, userName);
    });
  } else {
    calculateResults(userName);
  }
}

function calculateResults(userName) {
  const results = {};
  for (let animal in scores) {
    results[animal] = (scores[animal] / questions.length) * 100;
  }
  const sortedResults = Object.keys(results).sort((a, b) => results[b] - results[a]);
  console.log(`\n${userName}, your survey results are as follows:`);
  sortedResults.forEach((animal, index) => {
    console.log(`${index + 1}. ${animal}: ${results[animal].toFixed(2)}%`);
  });

  const mostSuitableAnimal = recommendMostSuitableAnimal(results);
  console.log(`\nThe most suitable pet for ${userName}: ${mostSuitableAnimal}`);

  const date = new Date().toLocaleString();
  console.log(`Date of saving answers: ${date}`);

  const savedAnswers = answers.map((answer) => {
    return {
      userName: answer.userName,
      date: date,
      answers: answer.answers,
    };
  });

  fs.writeFileSync(answersFile, JSON.stringify(savedAnswers, null, 2));
  fs.writeFileSync(scoresFile, JSON.stringify(results, null, 2));

  rl.close();
}

function recommendMostSuitableAnimal(results) {
  let highestPercentage = 0;
  let mostSuitableAnimal = '';

  for (let animal in results) {
    if (results[animal] > highestPercentage) {
      highestPercentage = results[animal];
      mostSuitableAnimal = animal;
    }
  }

  return mostSuitableAnimal;
}

const scores = {};
const answers = [];

rl.question("Enter your name: ", (userName) => {
  answerQuestion(1, "", userName);
});





