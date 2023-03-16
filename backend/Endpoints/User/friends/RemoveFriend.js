import { User } from "../../../Models";

export const removeFriend = async (req, res) => {
  const { _id } = req.body;
  if (_id) {
    try {
      const userRemovingFriend = await User.findOne({ accessToken: req.header("Authorization") });
      const userBeingRemoved = await User.findById({ _id })
      console.log(userBeingRemoved)
      if (userRemovingFriend && userBeingRemoved) {
        const updatedFriendListUserRemoving = await User.findOneAndUpdate({ _id: userRemovingFriend._id },
          { $pull: { friendsList: { _id: userBeingRemoved._id } } }, { new: true });
        const updatedFriendListUserBeingRemoved = await User.findOneAndUpdate({ _id: userBeingRemoved._id },
          { $pull: { friendsList: { _id: userRemovingFriend._id } } }, { new: true });
        if (updatedFriendListUserRemoving && updatedFriendListUserBeingRemoved) {
          res.status(200).json({
            success: true,
            response: {
              message: "You are no longer friends"
            }
          })
        } else {
          res.status(400).json({
            success: false,
            message: "We could not delete this friend"
          })
        }
      }

    } catch (err) {
      res.status(500).json({
        success: false,
        response: {
          message: err.stack
        }
      })
    }
  }
}