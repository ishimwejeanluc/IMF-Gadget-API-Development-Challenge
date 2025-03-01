// routes/gadgets.js
const express = require('express');
const router = express.Router();
const GadgetController = require('../controllers/gadgetController');

// Define routes and map to controller methods
router.get('/', GadgetController.getAllGadgets);
router.get('/status', GadgetController.getGadgetsByStatus);
router.post('/', GadgetController.createGadget);
router.patch('/:id', GadgetController.updateGadget);
router.delete('/:id', GadgetController.decommissionGadget);
router.post('/:id/self-destruct', GadgetController.selfDestructGadget);

module.exports = router;
