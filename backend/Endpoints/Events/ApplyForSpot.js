import { User, Event } from '../../Models';
import nodemailer from 'nodemailer';

export const applyForSpot = async (req, res) => {
  const { userEmail, username, eventId } = req.body;

  if (!userEmail || !username || !eventId) {
    res.status(400).json({
      success: false,
      message: 'Request requires "userEmail", "username" and "eventId". At least one of these are missing'
    })
  } else {
    try {
      const selectedEvent = await Event.findOne({ _id: eventId })
      if (selectedEvent) {
        try {
          await Event.findOneAndUpdate(selectedEvent._id, { $push: { pendingPartyMembers: userEmail } });
          const host = await User.findOne({ _id: selectedEvent.hostId })

          let transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD,
            },
          })

          const messageToHost = {
            from: process.env.EMAIL,
            to: `${host.email}`,
            subject: `${username} wants to join your party for playing ${selectedEvent.game}`,
            html: `
              <p>
                User <span style="color:#DE605B; font-size: 1.2rem;">${username}</span> wants to join your party.
                Please contact <span style="color:#DE605B; font-size: 1.2rem;">${username}</span> on ${userEmail}
              </p>
              <div style="
                padding: 1rem 2rem;
                border-radius: 0.6rem;
                color: #FFF;
                background-color: #363c46;">

                <h3 style="color: #DE605B;">${selectedEvent.game}</h3>
                <img style="width: 10rem;" src=${selectedEvent.image} alt="game" />
                <p><span style="color: #DE605B;">Location:</span> ${selectedEvent.county}, ${selectedEvent.venue}</p>
                <p><span style="color: #DE605B;">Time:</span> ${selectedEvent.eventTime}</p>
                <p>
                  <span style="color: #DE605B;">Open spots:</span> ${selectedEvent.openSpots} / ${selectedEvent.totalSpots}
                </p>
              </div>
            `
          }
          transporter.sendMail(messageToHost, (error, info) => {
            if (error) {
              console.error(error.stack)
              Event.findOneAndUpdate(selectedEvent._id, { $pop: { pendingPartyMembers: userEmail } });
            } else {
              console.log('Sent:', info.response)
            }
          })
          res.status(200).json({
            success: true,
            message: 'User has been added to list of pendingPartyMembers and the host of the event has been notified'
          })
        } catch (err) {
          res.status(400).json({
            success: false,
            error: err.stack,
            response: 'Could not add user to list of pendingPartyMembers'
          })
        }
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        response: err.message
      })
    }
  }
}