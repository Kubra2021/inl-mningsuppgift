import EventTicket from './eventTicket.js';
import User from './user.js';
import Admin from './admin.js';

import fs from 'fs';
import promptSync from 'prompt-sync';

const prompt = promptSync();


let currentUser = null;

function startProgram() {
  console.log("Welcome to the Event Ticketing System!");
  console.log("1. Login as User");
  console.log("2. Login as Admin");
  console.log("3. Create New Account");

  const choice = parseInt(prompt("Enter your choice: "));

  switch (choice) {
    case 1:
      currentUser = User.login();
      if (currentUser) {
        userMenu();
      } else {
        console.log("Invalid login credentials. Please try again.");
        startProgram();
      }
      break;
    case 2:
      currentUser = Admin.login();
      if (currentUser) {
        adminMenu();
      } else {
        console.log("Invalid login credentials. Please try again.");
        startProgram();
      }
      break;
    case 3:
      User.createAccount();
      startProgram();
      break;
    default:
      console.log("Invalid choice. Please try again.");
      startProgram();
  }
}

function userMenu() {
  console.log(`Welcome, ${currentUser.username}!`);
  console.log("1. Buy Event Ticket");
  console.log("2. Logout");

  const choice = parseInt(prompt("Enter your choice: "));

  switch (choice) {
    case 1:
      User.buyEventTicket();
      userMenu();
      break;
    case 2:
      currentUser = null;
      startProgram();
      break;
    default:
      console.log("Invalid choice. Please try again.");
      userMenu();
  }
}

function adminMenu() {
  console.log("Welcome, Admin!");
  console.log("1. View User Purchases");
  console.log("2. Create New Event");
  console.log("3. Logout");

  const choice = parseInt(prompt("Enter your choice: "));

  switch (choice) {
    case 1:
      Admin.viewUserPurchases();
      adminMenu();
      break;
    case 2:
      Admin.createNewEvent(); 
      adminMenu();
      break;
    case 3:
      currentUser = null;
      startProgram();
      break;
    default:
      console.log("Invalid choice. Please try again.");
      adminMenu();
  }
}



startProgram();
