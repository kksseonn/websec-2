import { getForecastByCoords } from "./forecast.service.js";

export async function getForecast(req, res, next) {
  try {
    const { lat, lon } = req.query;
    const forecast = await getForecastByCoords(lat, lon);

    res.json(forecast);
  } catch (error) {
    next(error);
  }
}
