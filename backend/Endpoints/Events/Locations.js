import { Locations } from "../../Models";

export const locations = async (req, res) => {
  const accessToken = req.header("Authorization");
  
  if (accessToken) {
    try {
      const allLocations = await Locations.find({ locations })
      res.status(200).json({
        success: true,
        response: allLocations
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



