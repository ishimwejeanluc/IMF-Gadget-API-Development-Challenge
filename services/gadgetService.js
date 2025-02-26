// services/gadgetService.js
const Gadget = require('../models/Gadget');
const { Op } = require('sequelize');

class GadgetService {
    // Get all gadgets, with optional status filter
    async getAllGadgets(status) {
        const where = status ? { status } : {};
        return await Gadget.findAll({
            where,
            attributes: {
                include: [
                    [
                        Math.floor(Math.random() * 100) + 1, // Random success probability
                        'missionSuccessProbability'
                    ],
                ],
            },
        });
    }

    // Create a new gadget
    async createGadget(name, missionSuccessProbability) {
        return await Gadget.create({
            name,
            missionSuccessProbability,
            status: 'Available',
        });
    }

    // Update an existing gadget
    async updateGadget(id, updates) {
        const gadget = await Gadget.findByPk(id);
        if (!gadget) throw new Error('Gadget not found');

        Object.assign(gadget, updates);
        await gadget.save();
        return gadget;
    }

    // Decommission (soft-delete) a gadget
    async decommissionGadget(id) {
        const gadget = await Gadget.findByPk(id);
        if (!gadget) throw new Error('Gadget not found');

        gadget.status = 'Decommissioned';
        gadget.decommissionedAt = new Date();
        await gadget.save();
        return gadget;
    }

    // Self-destruct (simulate destruction)
    async selfDestructGadget(id, confirmationCode) {
        const validCode = "123456"; // Simulated confirmation code
        if (confirmationCode !== validCode) throw new Error('Invalid confirmation code');

        const gadget = await Gadget.findByPk(id);
        if (!gadget) throw new Error('Gadget not found');

        gadget.status = 'Destroyed';
        await gadget.save();
        return gadget;
    }
}

module.exports = new GadgetService();
