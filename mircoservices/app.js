const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');

const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocketServer({ server });

webSocketServer.on('connection', async (clientWebSocket) => {
  handleWebSocketConnection(clientWebSocket);
});

server.listen(9000);