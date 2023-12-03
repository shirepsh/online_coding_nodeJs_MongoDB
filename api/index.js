require('dotenv').config();

const express = require('express');

const http = require('http');

const app = express();
const server = http.createServer(app);

app.get('/', async (req, res) => {
    res.send("200")
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})