import { User } from '../../Models';

export const updateUserInfo = async (req, res) => {
  const { email, password } = req.body;
  try {
    const selectedUser = await User.findOne({ accessToken: req.header("Authorization") });
    if (selectedUser && email && password) {
      await User.findByIdAndUpdate(selectedUser._id, { $set: { email, password: bcrypt.hashSync(password, salt) } });
      res.status(200).json({
        success: true,
        response: {
          message: "Your credentials have been updated"
        }
      });
    } else if (password) {
      await User.findByIdAndUpdate(selectedUser._id, { $set: { password: bcrypt.hashSync(password, salt) } });
      res.status(200).json({
        success: true,
        response: {
          message: "Your password have been updated"
        }
      });
    } else if (newEmail) {
      await User.findByIdAndUpdate(selectedUser._id, { $set: { email } });
      res.status(200).json({
        success: true,
        response: {
          message: "Your email have been updated"
        }
      });
    };
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err
    });
  };
};
