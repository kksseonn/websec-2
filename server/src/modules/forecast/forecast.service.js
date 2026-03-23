import { HttpError } from "../../shared/errors/http-error.js";
import { mapForecastResponse } from "./forecast.mapper.js";

export async function getForecastByCoords(lat, lon) {
  if (!lat || !lon) {
    throw new HttpError(400, "lat and lon are required");
  }

  const mockForecast = {
    location: {
      lat: Number(lat),
      lon: Number(lon),
    },
    series: {
      timestamps: [
        "2026-03-23T00:00:00Z",
        "2026-03-23T03:00:00Z",
        "2026-03-23T06:00:00Z",
        "2026-03-23T09:00:00Z",
      ],
      temperature: [2, 3, 5, 6],
      precipitation: [0, 0.1, 0.2, 0],
      windSpeed: [4, 5, 6, 5],
    },
  };

  return mapForecastResponse(mockForecast);
}
