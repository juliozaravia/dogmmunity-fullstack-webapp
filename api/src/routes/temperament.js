const { Router } = require('express');
const { getAllTemperaments } = require('../controllers/temperament');
const router = Router();

router.get('/', getAllTemperaments);

module.exports = router;