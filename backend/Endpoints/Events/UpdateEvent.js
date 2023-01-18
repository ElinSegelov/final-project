import { User, Event } from '../../Models';

export const updateEvent = async (req, res) => {
  const {
    _id,
    venue,
    county,
    game,
    openSpots,
    totalSpots,
    description,
    eventDate,
    eventTime,
    eventName,
    image
  } = req.body;

  const selectedEvent = await Event.findOne({ _id })
  try {
    if (selectedEvent) {
      const eventUpdated = await Event.findOneAndUpdate(selectedEvent._id,
        { $set: { venue, county, game, openSpots, totalSpots, description, eventDate, eventTime, eventName, image } });
      if (eventUpdated) {
        const host = await User.findOne({ _id: selectedEvent.hostId })
        res.status(200).json({
          success: true,
          response: {
            updatedEvent: selectedEvent,
            hostingEvents: host.hostingEvents,
            message: "The event has been updated"
          }
        })
      }
    } else {
      res.status(400).json({
        success: false,
        response: {
          message: "Event was not found"
        }
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      response: err
    })
  }
};