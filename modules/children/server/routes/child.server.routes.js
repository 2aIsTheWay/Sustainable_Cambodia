/* Dependencies */
var child = require('../controllers/child.server.controller.js'), 
    express = require('express'), 
    router = express.Router();

router.route('/')
  .get(child.list)

router.route('/:childId')
  .get(child.read)

module.exports = router;