import { AboutUs } from "../../Models";

export const aboutUs = async (req, res) => {
  const accessToken = req.header("Authorization");
  
  if (accessToken) {
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
  } else (
    res.status(401).json({
      success: false,
      response: "Please log in"
    })
  )
}
