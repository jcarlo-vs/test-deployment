const express = require('express');
const app = express();
const port = 3000;
const winston = require('winston');
const axios = require('axios');

const routes = require('./routes');

// Configure Winston logger with better formatting
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'express-app' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          return `${timestamp} [${level}]: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
          }`;
        })
      ),
    }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info('Incoming request', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });
  next();
});

app.get('/', (req, res) => {
  logger.info('Home route accessed');
  res.send('Hello World new one');
});

app.get('/test', (req, res) => {
  // random message from the array
  const randomMessages = [
    'You are a genius',
    'You are a smart',
    'You are a good',
    'You are a bad',
    'You are a ugly',
    'You are a handsome',
    'You are a beautiful',
    'You are a ugly',
    'You are a handsome',
    'You are a beautiful',
  ];
  const randomMessage =
    randomMessages[Math.floor(Math.random() * randomMessages.length)];

  logger.info('Test route accessed', { message: randomMessage });
  res.json({ message: randomMessage });
});

app.get('/new-route', (req, res) => {
  logger.info('New route accessed');
  // i wanna check the ip of the request
  const ip = req.ip;
  logger.info(`IP of the request: ${ip}`);
  res.json({ message: 'New route accessed', ip });
});

app.get('/api/v1/users', async (req, res) => {
  try {
    const users = await axios.get('https://jsonplaceholder.typicode.com/users');
    res.status(200).json(users.data);
  } catch (error) {
    logger.error('Error fetching users', { error: error.message });
    res.status(500).json({ message: 'Error fetching users' });
  }
});

app.use('/', routes);

app.use((req, res) => {
  logger.error('Route not found', { url: req.url });
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
