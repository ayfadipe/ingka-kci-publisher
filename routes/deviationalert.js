const express = require('express');
const {deviationalerts,createDeviation} = require('../controllers/deviationalert');

const router = express.Router({ mergeParams: true });

router
  .get('/',deviationalerts)
  .post('/create',createDeviation);
 

module.exports = router;
