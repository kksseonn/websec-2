import { Router } from "express";

import { getForecast } from "./forecast.controller.js";

const router = Router();

router.get("/", getForecast);

export default router;
