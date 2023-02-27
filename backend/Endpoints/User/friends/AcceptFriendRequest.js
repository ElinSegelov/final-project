import { User } from "../../../Models";

export const AcceptFriendRequest = async (req, res) => {
  const { _id } = req.body;

  if (_id) {
    const userGettingAccepted = await User.findOne({ _id });
    const userAcceptingRequest = await User.findOne({ accessToken: req.header("Authorization") });
    if (userAcceptingRequest) {
      try {
        if (userGettingAccepted.friendsList.length > 0) {
          const findIfAlreadyFriends = userAcceptingRequest.friendsList.find((friend) => friend.username === userGettingAccepted.username);
          if (findIfAlreadyFriends.username === userGettingAccepted.username) {
            res.status(400).json({
              success: false,
              response: "Already friends"
            });
          }
        } else {
          const addingAcceptedUserToFriendsList = await User.findByIdAndUpdate({ _id: userAcceptingRequest._id },
            { $push: { friendsList: { _id: userGettingAccepted._id, username: userGettingAccepted.username, friendsAt: new Date() } } }
          );

          if (addingAcceptedUserToFriendsList) {
            const addingUserAcceptingRequestToFriendsList = await User.findByIdAndUpdate({ _id: userGettingAccepted._id },
              { $push: { friendsList: { _id: userAcceptingRequest._id, username: userAcceptingRequest.username, friendsAt: new Date() } } }
            );

            if (addingUserAcceptingRequestToFriendsList && addingAcceptedUserToFriendsList) {
              const updatedAcceptedUserFromPendingFriends = await User.findByIdAndUpdate({ _id: userAcceptingRequest._id },
                { $pull: { pendingFriends: { _id: userGettingAccepted._id } } }, { new: true }
              );
              const updatedRequestedUserFromPendingFriends = await User.findByIdAndUpdate({ _id: userGettingAccepted._id },
                { $pull: { pendingFriends: { _id: userAcceptingRequest._id } } }, { new: true }
              );

              if (updatedAcceptedUserFromPendingFriends && updatedRequestedUserFromPendingFriends) {
                res.status(201).json({
                  success: true,
                  response: {
                    message: "You are now friends",
                    userAcceptingRequest: updatedAcceptedUserFromPendingFriends,
                    userGettingAccepted: updatedRequestedUserFromPendingFriends
                  }
                });
              }
            }
          }
        }
      } catch (err) {
        res.status(400).json({
          success: false,
          response: err.stack
        });
      }
    } else {
      res.status(401).json({
        success: false,
        response: "Unauthorized request. Please log in"
      });
    }
  } else {
    res.status(400).json({
      success: false,
      response: "We couldn't find this user to be added as a friend"
    })
  }
}