import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Раздача статических файлов (фронта)
app.use(express.static(__dirname));

// POST-запрос в Telegram
app.post("/send-message", async (req, res) => {
  const { token, chat_id, text } = req.body;

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id,
        text,
        parse_mode: "Markdown",
      }),
    });

    const data = await tgRes.json();
    res.json(data);
  } catch (err) {
    console.error("Telegram error:", err);
    res.status(500).json({ error: "Telegram send failed" });
  }
});

app.get("/", (req, res) => {
  res.send("API is working ✅");
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Запуск сервера
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
