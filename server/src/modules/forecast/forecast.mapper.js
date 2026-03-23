export function mapForecastResponse(items, lat, lon) {
  const safeItems = Array.isArray(items) ? items : [];

  return {
    location: {
      lat: Number(lat),
      lon: Number(lon),
    },
    series: {
      timestamps: safeItems.map((item) => item.dt_forecast),
      temperature: safeItems.map((item) => item.temp_2_cel ?? null),
      precipitation: safeItems.map((item) => item.prate ?? null),
      windSpeed: safeItems.map((item) => item.wind_speed_10 ?? null),
    },
  };
}
