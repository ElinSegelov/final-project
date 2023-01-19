import { User, Event } from '../../Models';

export const deleteEvent = async (req, res) => {
  const { eventId } = req.body;
  if (eventId) {
    try {
      const eventToDelete = await Event.findOne({ _id: eventId });
      const user = await User.findOne({ accessToken: req.header("Authorization") });
      const host = await User.findById({ _id: eventToDelete.hostId });

      if (user.username === host.username) {
        if (eventToDelete) {
          const deletedEventFromSchema = await Event.findByIdAndDelete({ _id: eventId });          
          const updatedHostingEvents = await User.findOneAndUpdate({ _id: eventToDelete.hostId },
            { $pull: { hostingEvents: { _id: eventToDelete._id } } }, { new: true });
 
          if (updatedHostingEvents && deletedEventFromSchema) {
            res.status(200).json({
              success: true,
              response: {
                deletedEventFromSchema: deletedEventFromSchema,
                hostingEvents: updatedHostingEvents.hostingEvents,
                message: "The event has been deleted"
              }
            });
          } else {
            res.status(500).json({
              success: false,
              response: {
                message: "Something went wrong. The event could not be removed from the data base"
              }
            });
          };
        } else {
          res.status(400).json({
            success: false,
            response: {
              message: "Could not find event."
            }
          });
        };
      } else {
        res.status(401).json({
          success: false,
          response: {
            message: "Unauthorized attempt to delete event"
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
  } else {
    res.status(400).json({
      success: false,
      response: {
        message: "Please supply relevant parameters"
      }
    });  
  };
};