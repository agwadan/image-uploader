const route = require('express').Router();

/* routes */
route.get('/', (req, res) => {
  res.render('main');
})

module.exports = route;