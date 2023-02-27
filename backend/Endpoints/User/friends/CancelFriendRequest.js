import { User } from "../../../Models";

export const CancelFriendRequest = async (req, res) => {
    const { _id } = req.body;
    if (_id) {
      const userCancellingRequest = await User.findOne({ accessToken: req.header("Authorization") });
      if (userCancellingRequest) {
        const userGettingCancelled = await User.findOne({ _id });
        if (userGettingCancelled) {
          const updatedPendingFriendsFromUserGettingCancelled = await User.findByIdAndUpdate({ _id: userGettingCancelled._id},
           { $pull: { pendingFriends: { _id: userCancellingRequest._id } } }, { new: true }
          )
          const updatedPendingFromUserCancellingRequest = await User.findByIdAndUpdate({ _id: userGettingCancelled._id},
           { $pull: { pendingFriends: { _id: userCancellingRequest._id } } }, { new: true }
          )
          if (updatedPendingFriendsFromUserGettingCancelled && updatedPendingFromUserCancellingRequest) {
            //! DUBBELKOLLA STATUS OCH RESPONSE. 201
            res.status(200).json({
              success: true,
              response: {
                message: "We cancelled your request",
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
        }
      } else {
        res.styatus(401).json({
          success: false,
          response: "Please log in"
        })
      } 
    } else {
      res.styatus(401).json({
        success: false,
        response: "We couldn't find this user to be added as a friend"
      })
    }

 }