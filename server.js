const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = require('./config/db');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
module.exports = server
