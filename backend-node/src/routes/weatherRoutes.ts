import express, { Request, Response } from "express";

const router = express.Router();

router.get("/weather", (req: Request, res: Response) => {

  const location = (req.query.location as string) || "Unknown";

  const weatherData = {
    location,
    temperature: 28,
    humidity: 65,
    conditions: "Sunny",
    wind_speed: 12
  };

  res.status(200).json({
    success: true,
    data: weatherData
  });

});

export default router;
