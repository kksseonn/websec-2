import app from "./app/app.js";
import { config } from "./app/config.js";

app.listen(config.port, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${config.port}`);
});
