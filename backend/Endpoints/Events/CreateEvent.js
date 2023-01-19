import { User, Event } from '../../Models';

export const createEvent = async (req, res) => {
  const {
    venue,
    county,
    eventDate,
    eventTime,
    game,
    openSpots,
    totalSpots,
    description,
    hostId,
    host,
    image
  } = req.body;

  const user = await User.findOne({ accessToken: req.header("Authorization") });
  try {
    const newEvent = await new Event({
      hostId,
      host,
      venue,
      county,
      eventDate,
      eventTime,
      game,
      openSpots,
      totalSpots,
      description,
      image
    }).save();
    const savedEventInUserSchema = await User.findByIdAndUpdate(user._id, { $addToSet: { hostingEvents: newEvent } });
    if (savedEventInUserSchema) {
      const host = await User.findOne({ _id: newEvent.hostId })
      res.status(201).json({
        success: true,
        response: {
          venue: newEvent.venue,
          county: newEvent.county,
          eventDate: newEvent.eventDate,
          eventTime: newEvent.eventTime,
          game: newEvent.game,
          eventId: newEvent._id,
          hostingEvents: host.hostingEvents,
          message: "Event created"
        }
      });
    };
  } catch (err) {
    res.status(500).json({
      success: false,
      response: err.stack
    });
  };
};