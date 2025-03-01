// controllers/gadgetController.js
const GadgetService = require('../services/gadgetService');

class GadgetController {
    // GET /gadgets
    async getAllGadgets(req, res) {
        try {
            const gadgets = await GadgetService.getAllGadgets();
            res.json(gadgets);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // GET gadgets by status
    async getGadgetsByStatus(req, res) {
        const { status } = req.query;
        try {
            const gadgets = await GadgetService.getGadgetsByStatus(status);
            res.json(gadgets);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // POST /gadgets
    async createGadget(req, res) {
        try {
            const gadget = await GadgetService.createGadget();
            res.status(201).json(gadget);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // PATCH /gadgets/:id
    async updateGadget(req, res) {
        const { id } = req.params;
        const updates = req.body;
        try {
            const gadget = await GadgetService.updateGadget(id, updates);
            res.json(gadget);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // DELETE /gadgets/:id (Decommission)
    async decommissionGadget(req, res) {
        const { id } = req.params;
        try {
            const gadget = await GadgetService.decommissionGadget(id);
            res.json(gadget);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // POST /gadgets/:id/self-destruct
    async selfDestructGadget(req, res) {
        const { id } = req.params;
        const { confirmationCode } = req.body;
        try {
            const gadget = await GadgetService.selfDestructGadget(id, confirmationCode);
            res.json(gadget);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new GadgetController();
