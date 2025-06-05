const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-message", async (req, res) => {
  const { token, chat_id, text } = req.body;

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id,
          text,
          parse_mode: "Markdown",
        }),
      }
    );

    const data = await tgRes.json();
    res.json(data);
  } catch (err) {
    console.error("Telegram error:", err);
    res.status(500).json({ error: "Telegram send failed" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
