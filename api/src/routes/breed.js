const { Router } = require('express');
const { getAllBreeds, getBreedById, addBreed } = require('../controllers/breed');
const router = Router();

router.get('/', getAllBreeds);
router.get('/:id', getBreedById);
router.post('/', addBreed);

module.exports = router;