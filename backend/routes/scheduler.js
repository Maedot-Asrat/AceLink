const cron = require('node-cron');
const Session = require('../models/Sessions');

const scheduleReminders = () => {
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const sessions = await Session.find({ 
      sessionDateTime: { $gte: now, $lt: new Date(now.getTime() + 15 * 60 * 1000) },
      reminder: true 
    });

    sessions.forEach(session => {
      // Logic to send reminders, e.g., email, SMS, etc.
      console.log(`Reminder: Session "${session.title}" starts in 15 minutes.`);
    });
  });
};

module.exports = scheduleReminders;
