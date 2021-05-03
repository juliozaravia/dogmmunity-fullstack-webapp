const { Router } = require('express');
const breedRoutes = require('./breed');
const temperamentRoutes = require('./temperament');

const router = Router();

router.use('/dogs', breedRoutes);
router.use('/temperaments', temperamentRoutes);

module.exports = router;
