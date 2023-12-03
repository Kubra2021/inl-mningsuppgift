import fs from 'fs';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export default class EventTicket {
  constructor(id, eventName, prize, eventTime, buyerId) {
    this.id = id;
    this.eventName = eventName;
    this.prize = prize;
    this.eventTime = eventTime;
    this.buyerId = buyerId;
  }

  static serializeToJson(eventTickets) {
    fs.writeFileSync('eventTicket.json', JSON.stringify(eventTickets));
  }

  static deserializeFromJson() {
    try {
      const data = fs.readFileSync('eventTicket.json');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
}