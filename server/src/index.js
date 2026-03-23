import app from "./app/app.js";
import { config } from "./app/config.js";

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
