const express = require("express");
const accRouter = require('./accounts/accounts-router');

const server = express();

server.use(express.json());

server.use('/api/accounts', accRouter);

module.exports = server;
