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
  
  if (
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
    image) {     

    try {
      const selectedEvent = await Event.findOne({ _id });
      const user = await User.findOne({ accessToken: req.header("Authorization") });
      const host = await User.findOne({ _id: selectedEvent.hostId });
      if (user.username === host.username) {
        if (selectedEvent) {
          const eventUpdatedFromModel = await Event.findOneAndUpdate(selectedEvent._id,
            { $set: {
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
              } 
            }
          );
          if (eventUpdatedFromModel) {
            const updatedHostingEvents = await User.findOneAndUpdate({ _id: user._id, 'hostingEvents._id': selectedEvent._id },
            { $set: { 
              'hostingEvents.$.venue': venue,
              'hostingEvents.$.county': county,
              'hostingEvents.$.game': game,
              'hostingEvents.$.openSpots': openSpots,
              'hostingEvents.$.totalSpots': totalSpots,
              'hostingEvents.$.description': description,
              'hostingEvents.$.eventDate': eventDate,
              'hostingEvents.$.eventTime': eventTime,
              'hostingEvents.$.eventName': eventName,
              'hostingEvents.$.image': image
            }}, { new: true } );

            if (updatedHostingEvents) {
              res.status(200).json({
                success: true,
                response: {
                  eventUpdatedFromModel: eventUpdatedFromModel,
                  hostingEvents: updatedHostingEvents.hostingEvents,
                  message: "The event has been updated"
                }
              });
            }  
          };
        } else {
          res.status(400).json({
            success: false,
            response: {
              message: "Event was not found"
            }
          });
        };
      } else {
        res.status(401).json({
          success: false,
          response: {
            message: "Unauthorized attempt to edit event"
          }
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        response: err
      });
    };
  }
};