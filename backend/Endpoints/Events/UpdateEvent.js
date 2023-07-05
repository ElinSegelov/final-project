import { User, Event } from '../../Models';

export const updateEvent = async (req, res) => {
  const {tempEventInfoForEdit} = req.body;
  if (tempEventInfoForEdit) {         
    try {
      const selectedEvent = await Event.findOne({ _id: tempEventInfoForEdit._id });
      const user = await User.findOne({ accessToken: req.header("Authorization") });
      const host = await User.findOne({ id: selectedEvent.hostId });
      if (user.username === host.username) {
        if (selectedEvent) {
          const eventUpdatedFromModel = await Event.findOneAndUpdate( { _id: tempEventInfoForEdit._id },
            { $set: {
                venue: tempEventInfoForEdit.venue,
                county: tempEventInfoForEdit.county,
                game: tempEventInfoForEdit.game,
                openSpots: tempEventInfoForEdit.openSpots,
                totalSpots: tempEventInfoForEdit.totalSpots,
                description: tempEventInfoForEdit.description,
                eventDate: tempEventInfoForEdit.eventDate,
                eventTime: tempEventInfoForEdit.eventTime,
                eventName: tempEventInfoForEdit.eventName,
                image: tempEventInfoForEdit.image
              } 
            }
          );
          if (eventUpdatedFromModel) {
            const updatedHostingEvents = await User.findOneAndUpdate({ _id: user._id, 'hostingEvents._id': selectedEvent._id },
            { $set: { 
              'hostingEvents.$.venue': tempEventInfoForEdit.venue,
              'hostingEvents.$.county': tempEventInfoForEdit.county,
              'hostingEvents.$.game': tempEventInfoForEdit.game,
              'hostingEvents.$.openSpots': tempEventInfoForEdit.openSpots,
              'hostingEvents.$.totalSpots': tempEventInfoForEdit.totalSpots,
              'hostingEvents.$.description': tempEventInfoForEdit.description,
              'hostingEvents.$.eventDate': tempEventInfoForEdit.eventDate,
              'hostingEvents.$.eventTime': tempEventInfoForEdit.eventTime,
              'hostingEvents.$.eventName': tempEventInfoForEdit.eventName,
              'hostingEvents.$.image': tempEventInfoForEdit.image
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
            };
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
      };
    } catch (err) {
      res.status(500).json({
        success: false,
        response: {
          message: err.stack
        }
      });
    };
  };
};