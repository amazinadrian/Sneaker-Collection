const express = require('express');
const router = express.Router();
const shoeController = require('../controller/shoeController');

router.get('/', shoeController.homepage);
router.get('/brands', shoeController.exploreBrands);
router.get('/brands/:id', shoeController.exploreBrandsById);
router.get('/collection/:id', shoeController.exploreCollection);
router.get('/add-sneaker', shoeController.addShoes);
router.post('/add-sneaker', shoeController.addShoesOnPost);
router.delete('/collection/:id', shoeController.deleteShoesById);
router.get('/collection/:id/edit', shoeController.editShoes);
router.put('/collection/:id', shoeController.updateShoesOnPut);
router.get('/about-us', shoeController.aboutUs);





module.exports = router;