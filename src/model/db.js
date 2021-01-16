const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBKEY}@${process.env.DBSTRING}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
}, (err) => {
  !err ? console.log('logado') : console.log('erro para logar' + err);
});

require('./schema/angularbook_schema');
