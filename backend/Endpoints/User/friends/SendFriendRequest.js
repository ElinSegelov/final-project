import { User } from "../../../Models";

export const SendFriendRequest = async (req, res) => {
  const { _id } = req.body;

  if (_id) {
    try {
      const userSendingRequest = await User.findOne({ accessToken: req.header("Authorization") });
      if (userSendingRequest) {
        const userGettingRequest = await User.findOne({ _id });
        if (userGettingRequest) {
          const addingUserSendingRequestToPendingFriends = await User.findByIdAndUpdate({ _id: userGettingRequest._id },
            { $push: { pendingFriends: userSendingRequest } }, { new: true }
          )
          if (addingUserSendingRequestToPendingFriends) {
            const addingUserGettingRequestToPendingFriends = await User.findByIdAndUpdate({ _id: userSendingRequest._id },
              { $push: { pendingFriends: userGettingRequest } }, { new: true }
            )
            if (addingUserSendingRequestToPendingFriends && addingUserGettingRequestToPendingFriends) {
              res.status(200).json({
                success: true,
                response: {
                  userSendingRequest: addingUserSendingRequestToPendingFriends,
                  userGettingRequest: addingUserGettingRequestToPendingFriends
                }
              })
            }
          } else {
            res.status(400).json({
              success: false,
              response: "We couldn't send the friend invitation to this user"
            })
          }
        } else {
          res.status(400).json({
            success: false,
            response: "We couldn't send the friend invitation to this user"
          })
        }
      } else {
        res.status(400).json({
          success: false,
          response: "Please log in"
        })
      }
    } catch (err) {
      res.status(400).json({
        success: false,
        response: err.stack
      })
    }
  } else {
    res.status(400).json({
      success: false,
      response: "We couldn't find this user to be added as a friend"
    })
  }
}