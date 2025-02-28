// controllers/gadgetController.js
const GadgetService = require('../services/gadgetService');

class GadgetController {
    // GET /gadgets
    async getAllGadgets(req, res) {
        try {
            const gadgets = await GadgetService.getAllGadgets(req.query.status);
            res.json(gadgets);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // POST /gadgets
    async createGadget(req, res) {
        try {
            
            const gadget = await GadgetService.createGadget();
            res.status(201).json(gadget);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // PATCH /gadgets/:id
    async updateGadget(req, res) {
        try {
            const gadget = await GadgetService.updateGadget(req.params.id, req.body);
            res.json(gadget);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // DELETE /gadgets/:id (Decommission)
    async decommissionGadget(req, res) {
        try {
            const gadget = await GadgetService.decommissionGadget(req.params.id);
            res.json(gadget);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // POST /gadgets/:id/self-destruct
    async selfDestructGadget(req, res) {
        try {
            const gadget = await GadgetService.selfDestructGadget(req.params.id, req.body.confirmationCode);
            res.json({ message: 'Gadget destroyed successfully.', gadget });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new GadgetController();
