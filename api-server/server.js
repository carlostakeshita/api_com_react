require('./server_clean');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const moviesRouter = require('./routes/movies_clean');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/movies', moviesRouter);
const port = process.env.PORT || 3333;

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err && err.stack ? err.stack : err);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

const host = process.env.HOST || '0.0.0.0';
const server = app.listen(port, host, () => {
  console.log(`Movies API server listening on http://${host}:${port}`);
  console.log('Endpoints: GET /movies  POST /movies  GET /movies/:id  PUT /movies/:id  DELETE /movies/:id');
});
server.on('error', (err) => {
  console.error('Server error:', err && err.stack ? err.stack : err);
});
