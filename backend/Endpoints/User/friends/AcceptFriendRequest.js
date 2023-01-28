import { User } from "../../../Models";

export const AcceptFriendRequest = async (req, res) => {
  const { _id } = req.body;

  if (_id) {
    try {
      const userAcceptingRequest = await User.findOne({ accessToken: req.header("Authorization") });
      if (userAcceptingRequest) {
        const userGettingAccepted = await User.findOne({ _id });
        if (userGettingAccepted) {
          const addingAcceptedUserToFriendsList = await User.findByIdAndUpdate({ _id: userAcceptingRequest._id },
            { $push: { friendsList: userGettingAccepted } }
          )
          if (addingAcceptedUserToFriendsList) {
            const addingUserAcceptingRequestToFriendsList = await User.findByIdAndUpdate({ _id: userGettingAccepted._id },
              { $push: { friendsList: userAcceptingRequest } }
            )
            if (addingUserAcceptingRequestToFriendsList && addingAcceptedUserToFriendsList) {
              const updatedAcceptedUserFromPendingFriends = await User.findByIdAndUpdate({ _id: userAcceptingRequest._id },
                { $pull: { pendingFriends: { _id: userGettingAccepted._id } } }, { new: true }
              )
              const updatedRequestedUserFromPendingFriends = await User.findByIdAndUpdate({ _id: userGettingAccepted._id },
                { $pull: { pendingFriends: { _id: userAcceptingRequest._id } } }, { new: true }
              )
              if (updatedAcceptedUserFromPendingFriends && updatedRequestedUserFromPendingFriends) {
                res.status(200).json({
                  success: true,
                  response: {
                    message: "You are now friends",
                    userAcceptingRequest: updatedAcceptedUserFromPendingFriends,
                    userGettingAccepted: updatedRequestedUserFromPendingFriends
                  }
                })
              }
            } else {
              res.status(400).json({
                success: false,
                response: "We couldn't add this user as a friend. Try again later"
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