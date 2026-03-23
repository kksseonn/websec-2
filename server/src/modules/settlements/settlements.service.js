import settlements from "../../data/settlements-top-1000.json" with { type: "json" };

export function getAllSettlements() {
  return settlements;
}

export function searchSettlements(query, type = "name") {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return settlements
    .filter((item) => {
      const name = item.name.toLowerCase();
      const region = item.region.toLowerCase();

      if (type === "region") {
        return region.includes(normalizedQuery);
      }

      if (type === "all") {
        return (
          name.includes(normalizedQuery) || region.includes(normalizedQuery)
        );
      }

      return name.includes(normalizedQuery);
    })
    .sort((a, b) => b.population - a.population)
    .slice(0, 20);
}
