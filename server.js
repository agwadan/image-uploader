const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');

app.use(express.json());

/* Serving static files */
app.use(express.static(path.join(__dirname, 'public')));

/* setup view engine */
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: path.join(__dirname, 'views'),
  partialsDir: path.join(__dirname, 'views/partials')
}))

/* Calling routes */
app.use('/', require('./server/router/router'))

app.listen(3000, () => console.log('server running on port 3000'));