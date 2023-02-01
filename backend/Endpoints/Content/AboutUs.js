import { AboutUs } from "../../Models";

export const aboutUs = async (_, res) => {
  try {
    const aboutUsInfo = await AboutUs.find({ aboutUs })
    res.status(200).json({
      success: true,
      response: aboutUsInfo
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      response: err.stack
    })
  }
}
