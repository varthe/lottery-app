import http from "http"
import fs from "fs"
import path from "path"
import crypto from "crypto"

const sendHtml = (res) => {
  fs.readFile("./index.html", (err, content) => {
    if (err) {
      sendText(res, 500, "Internal Server Error")
      return
    }
    res.writeHead(200, { "Content-Type": "text/html" })
    res.end(content)
  })
}

const sendText = (statusCode, text, res) => {
  res.writeHead(statusCode, { "Content-Type": "text/plain" })
  res.end(text)
}

const handleGenerate = (res) => {
  const numbers = []
  const maxAttempts = 1000 // To be safe. If something goes wrong we don't want to be stuck in an infinite loop.
  let attempts = 0

  while (numbers.length < 6 && attempts < maxAttempts) {
    const randomNum = crypto.randomInt(1, 50)
    if (!numbers.includes(randomNum)) numbers.push(randomNum)
    attempts++
  }

  if (numbers.length !== 6 || attempts >= maxAttempts)
    throw new Error("Could not generate lottery numbers")

  const sortedNumbers = numbers.sort((a, b) => a - b)

  res.writeHead(200, { "Content-Type": "application/json" })
  res.end(JSON.stringify(sortedNumbers))
}

const server = http.createServer((req, res) => {
  const { url, method } = req
  try {
    if (url === "/" && method === "GET") return sendHtml(res)
    if (url === "/generate" && method === "GET") return handleGenerate(res)

    res.writeHead(404, { "Content-Type": "text/plain" })
    res.end("Not Found")
  } catch (error) {
    console.log("ERROR:", error)
    res.writeHead(500, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ error: "Internal Server Error" }))
  }
})

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
