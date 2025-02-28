// services/gadgetService.js
const Gadget = require('../models/Gadget');
const { fn, col , literal} = require('sequelize');

// Array of possible codenames
const codenames = [
    "The Nightingale",
    "The Kraken",
    "The Phoenix",
    "The Chimera",
    "The Leviathan",
    "The Spectre",
    "The Griffin",
    "The Manticore",
    "The Hydra",
    "The Cerberus"
];

class GadgetService {
    
    async getAllGadgets(status) {
        const where = status ? { status } : {};
        const gadgets = await Gadget.findAll({
            where,
            attributes: {
                include: [
                    // Generate a random success probability between 50 and 100
                    [literal('FLOOR(RANDOM() * 50 + 50)'), 'missionSuccessProbability'], // PostgreSQL
                ],
            },
        });
        return gadgets;
    }

    // Create a new gadget
    async createGadget() {
        // Generate a random codename from the array
        const codename = codenames[Math.floor(Math.random() * codenames.length)];

        return await Gadget.create({
            name: codename, // Use the codename as the name
            status: 'Available', // Default status
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
