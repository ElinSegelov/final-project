import { User, Event } from '../../Models';
import nodemailer from 'nodemailer';

export const applyForSpot = async (req, res) => {
  const { userEmail, username, eventId } = req.body;

  if (!userEmail || !username || !eventId) {
    res.status(400).json({
      success: false,
      message: 'Request requires "userEmail", "username" and "eventId". At least one of these are missing'
    });
  } else {
    try {
      const selectedEvent = await Event.findOne({ _id: eventId });
      if (selectedEvent) {
        try {
          await Event.findOneAndUpdate(selectedEvent._id, { $push: { pendingPartyMembers: userEmail } });
          const host = await User.findOne({ _id: selectedEvent.hostId });

          let transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD,
            }
          });

          const messageToHost = {
            from: process.env.EMAIL,
            to: `${host.email}`,
            subject: `A new player wants to join your party for playing ${selectedEvent.game}`,
            text: `
              Hello ${host.username},

              The player ${username} has applied for a spot at your party for the board game session below.

              ${selectedEvent.game}
              ${selectedEvent.eventDate.slice(0, 10)}
              ${selectedEvent.eventTime}
              ${selectedEvent.county}
              ${selectedEvent.venue}

              Please contact ${username} on their e-mail ${userEmail} and make arrangements for the board gaming session, 
              also let them know if they are accepted to your party or not.

              Please remember to update the number of missing players in your event as you accept new players into 
              your party.
              
              Hope you’ll have a nice time,
              Octahedron 
            `
          };
          transporter.sendMail(messageToHost, (error, info) => {
            if (error) {
              console.error(error.stack)
              Event.findOneAndUpdate(selectedEvent._id, { $pop: { pendingPartyMembers: userEmail } });
            } else {
              console.log('Sent:', info.response)
            };
          });
          res.status(200).json({
            success: true,
            message: 'User has been added to list of pendingPartyMembers and the host of the event has been notified'
          });
        } catch (err) {
          res.status(400).json({
            success: false,
            error: err.stack,
            response: 'Could not add user to list of pendingPartyMembers'
          });
        };
      };
    } catch (err) {
      res.status(500).json({
        success: false,
        response: err.message
      });
    };
  };
};