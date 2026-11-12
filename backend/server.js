const http = require("http");

const PORT = process.env.PORT || 3000;
const TANGO_ENV = process.env.TANGO_ENV === "production" ? "production" : "sandbox";
const TANGO_API_BASE =
  process.env.TANGO_API_BASE ||
  (TANGO_ENV === "production"
    ? "https://api.tangocard.com/raas/v2"
    : "https://integration-api.tangocard.com/raas/v2");

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ok", env: TANGO_ENV, apiBase: TANGO_API_BASE }));
  }
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "not found" }));
});

server.listen(PORT, () => console.log(`tango-backend listening on ${PORT} (${TANGO_ENV})`));
