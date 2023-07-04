import { User, Event } from '../../Models';

export const createEvent = async (req, res) => {
  const { tempEventInfoForEdit } = req.body;
  const user = await User.findOne({ accessToken: req.header("Authorization") });

  try {
    const newEvent = await new Event({
      hostId: user._id,
      host: user.username,
      venue: tempEventInfoForEdit.venue,
      county: tempEventInfoForEdit.county,
      eventDate: tempEventInfoForEdit.eventDate,
      eventTime: tempEventInfoForEdit.eventTime,
      game: tempEventInfoForEdit.game,
      openSpots: tempEventInfoForEdit.openSpots,
      totalSpots: tempEventInfoForEdit.totalSpots,
      description: tempEventInfoForEdit.description,
      image: tempEventInfoForEdit.image
    }).save();
    const savedEventInUserSchema = await User.findByIdAndUpdate(user._id, { $addToSet: { hostingEvents: newEvent } });
    if (savedEventInUserSchema) {
        res.status(201).json({
        success: true,
        response: {
          venue: newEvent.venue,
          county: newEvent.county,
          eventDate: newEvent.eventDate,
          eventTime: newEvent.eventTime,
          game: newEvent.game,
          eventId: newEvent._id,
          hostingEvents: user.hostingEvents,
          message: "Event created"
        }
      });
    };
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error.stack
    });
    console.log(error.stack)
  };
};