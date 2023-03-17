import { User } from "../../../Models";

export const sendFriendRequest = async (req, res) => {
  const { _id } = req.body;

  if (_id) {
    const userGettingRequest = await User.findOne({ _id });
    const userSendingRequest = await User.findOne({ accessToken: req.header("Authorization") });
    if (userSendingRequest) {
      try {
        const findIfPending = userSendingRequest.pendingFriends.find((friend) => friend.username === userGettingRequest.username);
        console.log(findIfPending)
        if (findIfPending === undefined) {
          const findIfAlreadyFriends = userSendingRequest.friendsList.find((friend) => friend.username === userGettingRequest.username);
          if (findIfAlreadyFriends === undefined) {
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
          } else {
            res.status(400).json({
              success: false,
              response: "Already friends"
            });
          }
        } else {
          res.status(400).json({
            success: false,
            response: "You have already sent a friend request"
          });
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
        response: "Unauthorized request. Please log in"
      })
    }
  } else {
    res.status(400).json({
      success: false,
      response: "Please provide the user ID that you want to delete"
    })
  }
}