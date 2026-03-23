import cors from "cors";
import express from "express";

import { config } from "./config.js";
import forecastRoutes from "../modules/forecast/forecast.routes.js";
import settlementsRoutes from "../modules/settlements/settlements.routes.js";
import { errorHandler } from "../shared/middleware/error-handler.js";
import { notFound } from "../shared/middleware/not-found.js";

const app = express();

app.use(
  cors({
    origin: config.clientUrl,
  }),
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    message: "Server is running",
  });
});

app.use("/api/settlements", settlementsRoutes);
app.use("/api/forecast", forecastRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
