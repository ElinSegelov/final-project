import { User } from "../../../Models";

export const cancelFriendRequest = async (req, res) => {
  const { _id } = req.body;
  if (_id) {
    const userCancellingRequest = await User.findOne({ accessToken: req.header("Authorization") });
    if (userCancellingRequest) {
      const userGettingCancelled = await User.findOne({ _id });
      try {
        // This finds userSendingRequest and userGettingRequest inside pendingFriends
        const findPendingInUserGettingCancelled = userGettingCancelled.pendingFriends.find((friend) => friend.username === userCancellingRequest.username);
        const findPendingInUserCancellingRequest = userCancellingRequest.pendingFriends.find((friend) => friend.username === userGettingCancelled.username);
        if (findPendingInUserGettingCancelled && findPendingInUserCancellingRequest) {
          const updatedPendingFriendsFromUserGettingCancelled = await User.findByIdAndUpdate({ _id: userGettingCancelled._id },
            { $pull: { pendingFriends: { _id: userCancellingRequest._id } } }, { new: true }
          )
          const updatedPendingFromUserCancellingRequest = await User.findByIdAndUpdate({ _id: userCancellingRequest._id },
            { $pull: { pendingFriends: { _id: userGettingCancelled._id } } }, { new: true }
          )
          if (updatedPendingFriendsFromUserGettingCancelled && updatedPendingFromUserCancellingRequest) {
            res.status(200).json({
              success: true,
              response: {
                message: "We cancelled your request",
                // Kolla om det verkligen behövs så mycket info
                updatedPendingFriendsFromUserGettingCancelled: updatedPendingFriendsFromUserGettingCancelled,
                updatedPendingFromUserCancellingRequest: updatedPendingFromUserCancellingRequest
              }
            })
          } else (
            res.status(400).json({
              success: false,
              response: "Something went wrong. We couldn't cancel your request to this user"
            })
          )
        } else {
          res.status(400).json({
            success: false,
            response: "There is nothing to cancel"
          })
        }
      } catch (err) {
        res.status(400).json({
          success: false,
          response: err.stack
        })
      }
    } else {
      res.status(401).json({
        success: false,
        response: "Please log in"
      })
    }
  } else {
    res.status(400).json({
      success: false,
      response: "Please provide the user ID"
    })
  }

}