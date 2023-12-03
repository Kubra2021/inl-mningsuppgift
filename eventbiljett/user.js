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

    
    if (!User.currentUser) {
      console.log("Please log in first.");
      return;
    }

    const eventId = eventTickets.length + 1;
    const eventName = prompt("Enter the event name: ");
    const prize = parseInt(prompt("Enter the ticket price: "));
    const eventTimeStr = prompt("Enter the event time (YYYY-MM-DDTHH:mm:ss format): ");

    
    const eventTime = new Date(eventTimeStr);

    const newEventTicket = new EventTicket(eventId, eventName, prize, eventTime, User.currentUser.id);
    eventTickets.push(newEventTicket);

    EventTicket.serializeToJson(eventTickets);
    console.log(`Ticket for ${eventName} purchased successfully!`);
  }
   
    static findUserById(userId) {
    const users = User.deserializeFromJson();
    return users.find(u => u.id === userId);
  }
}
  
