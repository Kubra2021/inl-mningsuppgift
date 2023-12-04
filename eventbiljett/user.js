import fs from 'fs';
import promptSync from 'prompt-sync';
import EventTicket from './eventTicket.js';



const prompt = promptSync();

export default class User {

  static currentUser = null;

  constructor(id, username, password, email, phone) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
  }

  static serializeToJson(users) {
    fs.writeFileSync('user.json', JSON.stringify(users));
  }

  static deserializeFromJson() {
    try {
      const data = fs.readFileSync('user.json');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  static createAccount() {
    const users = User.deserializeFromJson();

    const id = users.length + 1;
    const username = prompt("Enter a username: ");
    const password = prompt("Enter a password: ");
    const email = prompt("Enter your email: ");
    const phone = prompt("Enter your phone number: ");

    const newUser = new User(id, username, password, email, phone);
    users.push(newUser);

    User.serializeToJson(users);
    console.log("Account created successfully!");
  }

  static login() {
    const users = User.deserializeFromJson();

    const username = prompt("Enter your username: ");
    const password = prompt("Enter your password: ");

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      console.log("Login successful!");
      
      User.currentUser = user;
      return user;
    } else {
      console.log("Invalid login credentials.");
      return null;
    }
  }

  static buyEventTicket() {
    const eventTickets = EventTicket.deserializeFromJson();
    const currentUser = User.currentUser;

    if (!currentUser) {
      console.log("Please log in first.");
      return;
    }

    console.log("Available Events:");
    eventTickets.forEach(ticket => {
      console.log(`Event ID: ${ticket.id}, Name: ${ticket.eventName}, Price: ${ticket.prize}, Time: ${ticket.eventTime}`);
    });

    const selectedEventId = parseInt(prompt("Enter the Event ID to purchase a ticket: "));
    const selectedEvent = eventTickets.find(ticket => ticket.id === selectedEventId);

    if (!selectedEvent) {
      console.log("Invalid Event ID. Please try again.");
      return;
    }

    const newEventTicket = new EventTicket(selectedEventId, selectedEvent.eventName, selectedEvent.prize, selectedEvent.eventTime, currentUser.id);
    eventTickets.push(newEventTicket);

    EventTicket.serializeToJson(eventTickets);
    console.log(`Ticket for "${selectedEvent.eventName}" purchased successfully!`);
  }
  static findUserById(userId) {
  const users = User.deserializeFromJson();
  return users.find(user => user.id === userId);
}
}

  
