import { User } from "../../../Models";

export const SendFriendRequest = async (req, res) => {
  const { _id } = req.body;

  if (_id) {
    const userGettingRequest = await User.findOne({ _id });
    const userSendingRequest = await User.findOne({ accessToken: req.header("Authorization") });
    if (userSendingRequest) {
      try {
        if (userSendingRequest.friendsList.length > 0) {
          // This checks if the userGetting Requested is already in the friendList of the user Sending the request
          const findIfAlreadyFriends = userSendingRequest.friendsList.find((friend) => friend.username === userGettingRequest.username);

          if (findIfAlreadyFriends.username === userGettingRequest.username) {
            res.status(400).json({
              success: false,
              response: "Already friends"
            });
          }
        } else if (userSendingRequest.pendingFriends.length > 0) {
          // This checks if the userSending the request has already sent a request
          const findIfPending = userSendingRequest.pendingFriends.find((friend) => friend.username === userGettingRequest.username);
          if (findIfPending.username === userGettingRequest.username) {
            res.status(400).json({
              success: false,
              response: "You have already sent a friend request"
            });
          }
        } else {
          const addingUserSendingRequestToPendingFriends = await User.findByIdAndUpdate({ _id: userGettingRequest._id },
            { $push: { pendingFriends: { _id: userSendingRequest._id, username: userSendingRequest.username } } }, { new: true }
          );
          if (addingUserSendingRequestToPendingFriends) {
            const addingUserGettingRequestToPendingFriends = await User.findByIdAndUpdate({ _id: userSendingRequest._id },
              { $push: { pendingFriends: { _id: userGettingRequest._id, username: userGettingRequest.username } } }, { new: true }
            );
            if (addingUserSendingRequestToPendingFriends && addingUserGettingRequestToPendingFriends) {
              res.status(201).json({
                success: true,
                response: {
                  message: `We have sent a friend request to ${userGettingRequest.username}`,
                  userSendingRequest: {
                    _id: userSendingRequest._id,
                    username: userSendingRequest.username
                  },
                  userGettingRequest: {
                    _id: userGettingRequest._id,
                    username: userGettingRequest.username
                  },
                }
              });
            }
          } else {
            res.status(400).json({
              success: false,
              response: "We couldn't send the friend request to this user"
            });
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
    });
  }
}