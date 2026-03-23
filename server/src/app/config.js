import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 3001,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  eolApiToken: process.env.EOL_API_TOKEN || "",
};
