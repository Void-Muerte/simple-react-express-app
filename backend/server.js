const express = require('express');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const compression = require('compression');
const cors = require('cors');
// local imports
const userRouter = require('./App/routes/user.routes');
const serverPing = require('./App/routes/server.ping');

// declarations based on modules
const app = express();
/**
 * a limit which limits 30 requests from the same api per minute
 * since it is a basic express api, and its for simple CRUD operations, it is worth to note that the limit here
 * is global however we can of course cater for single type of requests
 */
const limiter = rateLimit({
	windowMs: 60 * 1000, // 15 minutes
	limit: 30, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
    message:"Too many requests have been made in a minute!"
})
// middlewares
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(compression());
app.use(cors());

// route middlewares
app.use('/api/sea/', userRouter);
app.use('/', serverPing);



module.exports = app;