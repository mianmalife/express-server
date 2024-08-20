import http from "node:http"

const app = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" })
  res.end("hello nodejs...")
})

app.listen(8888)