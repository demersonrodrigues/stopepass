// server.js
const fastify = require('fastify')({ logger: true });
require('dotenv').dotenv.config();

const PORT = process.env.PORT || 3333; 

fastify.listen(PORT, () => console.log(`Server running or port ${PORT}`))