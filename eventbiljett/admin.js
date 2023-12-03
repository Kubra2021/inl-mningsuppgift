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
    static viewUserPurchases() {
    const eventTickets = EventTicket.deserializeFromJson();
    console.log("User Purchases:");

    eventTickets.forEach(ticket => {
      const user = User.findUserById(ticket.buyerId);
      console.log(`Event: ${ticket.eventName}, User: ${user ? user.username : 'User not found'}`);
    });
  }
}
