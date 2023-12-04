import fs from 'fs';
import promptSync from 'prompt-sync';
import EventTicket from './eventTicket.js';
import User from './user.js';
 
const prompt = promptSync();

export default class Admin {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static serializeToJson(admins) {
    fs.writeFileSync('admin.json', JSON.stringify(admins));
  }

  static deserializeFromJson() {
    try {
      const data = fs.readFileSync('admin.json');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  static login() {
    const admins = Admin.deserializeFromJson();

    const username = prompt("Enter your adminname: ");
    const password = prompt("Enter your password: ");

    const admin = admins.find(a => a.username === username && a.password === password);

    if (admin) {
      console.log("Login successful!");
      return admin;
    } else {
      console.log("Invalid login credentials.");
      return null;
    }
  }
    
  static viewPurchasedTickets() {
  const eventTickets = EventTicket.deserializeFromJson();

  console.log("Purchased Tickets:");
  eventTickets.forEach(ticket => {
    const user = User.findUserById(ticket.buyerId);
    console.log(`Event: ${ticket.eventName}, User: ${user ? user.username : 'User not found'}`);
  });
}
  
  static createNewEvent() {
    const eventTickets = EventTicket.deserializeFromJson();

    const eventId = eventTickets.length + 1;
    const eventName = prompt("Enter the event name: ");
    const prize = parseInt(prompt("Enter the ticket price: "));
    const eventTimeStr = prompt("Enter the event time (YYYY-MM-DDTHH:mm:ss format): ");

    const eventTime = new Date(eventTimeStr);

    const newEventTicket = new EventTicket(eventId, eventName, prize, eventTime, null); // buyerId: null
    eventTickets.push(newEventTicket);

    EventTicket.serializeToJson(eventTickets);
    console.log(`Event "${eventName}" created successfully!`);
  }

  static viewUserPurchases() {
  const eventTickets = EventTicket.deserializeFromJson();
  const users = User.deserializeFromJson();

  console.log("User Purchases:");
  eventTickets.forEach(ticket => {
    const user = users.find(u => u.id === ticket.buyerId);
    console.log(`Event: ${ticket.eventName}, User: ${user ? user.username : 'User not found'}`);
  });
}
}
