import { Router } from "express";

import {
  getSettlements,
  getSettlementsBySearch,
} from "./settlements.controller.js";

const router = Router();

router.get("/", getSettlements);
router.get("/search", getSettlementsBySearch);

export default router;
