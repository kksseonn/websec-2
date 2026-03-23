import { getAllSettlements, searchSettlements } from "./settlements.service.js";

export function getSettlements(req, res) {
  const settlements = getAllSettlements();

  res.json(settlements);
}

export function getSettlementsBySearch(req, res) {
  const query = req.query.q?.trim() || "";
  const type = req.query.type?.trim() || "name";
  const results = searchSettlements(query, type);

  res.json(results);
}
