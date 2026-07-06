import "dotenv/config";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.API_PORT || 3000;
const dbPath = path.resolve(__dirname, "../src/data/db.json");
const dbContent = fs.readFileSync(dbPath, "utf-8");
const db = JSON.parse(dbContent);

app.get("/api/builder", (req, res) => {
  try {
    setTimeout(() => {
      res.json(db.builderData);
    }, 600);
  } catch (error) {
    res.status(500).json({ error: "Failed to read database" });
  }
});

// fallback for production builds that is probably not needed as you'll only run it on dev but it's there anyways
const distPath = path.resolve(__dirname, "../dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Backend API listening on port ${PORT}`);
});
