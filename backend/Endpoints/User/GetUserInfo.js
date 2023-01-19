import { User } from '../../Models';

export const getUserInfo = async (req, res) => {
  const allUserInfo = [];
  const selectedUser = await User.findOne({ accessToken: req.header("Authorization") });
  allUserInfo.push(selectedUser);
  const userInfo = allUserInfo.map((user) => {
    return ({
      username: user.username,
      email: user.email,
      hostingEvents: user.hostingEvents,
      attendingEvent: user.attendingEvents
    });
  });
  try {
    res.status(200).json({
      success: true,
      response: userInfo
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err
    });
  };
};