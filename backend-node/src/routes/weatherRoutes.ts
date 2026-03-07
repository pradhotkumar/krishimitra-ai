import express from "express";
import { getWeather } from "../services/weatherService";

const router = express.Router();

router.get("/weather", async (req, res) => {

  try {

    const location = req.query.location as string;

    const weather = await getWeather(location || "Bangalore");

    res.json({
      success: true,
      data: weather
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Weather fetch failed"
    });

  }

});

export default router;
