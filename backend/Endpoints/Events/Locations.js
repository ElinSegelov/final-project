import { Locations } from "../../Models";

export const locations = async (_, res) => {
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
}