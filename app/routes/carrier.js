const express = require('express');
const router = express.Router();
const { Carrier } = require('../models/carrier');

// Create a new carrier
router.post('/', async (req, res) => {
    const carrier = new Carrier(req.body);
    try {
        await carrier.save();
        res.status(201).send(carrier);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all carriers
router.get('/', async (req, res) => {
    try {
        const carriers = await Carrier.find();
        const processed_carriers = [...carriers].map((carrier) => {
            carrier.id = carrier._id ? (carrier._id.$oid ? carrier._id.$oid : carrier._id) : carrier.id;
            return carrier;
        })
        res.send(processed_carriers);
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
});

// Get a carrier by ID
router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const carrier = await Carrier.findById(_id);
        if (!carrier) {
            return res.status(404).send();
        }
        res.send(carrier);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a carrier by ID
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        "name",
        "address",
        "phone",
        "fax",
        "email",
        "notes"
    ];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const carrier = await Carrier.findById(req.params.id);
        if (!carrier) {
            return res.status(404).send();
        }

        updates.forEach((update) => carrier[update] = req.body[update]);
        await carrier.save();
        res.send(carrier);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a carrier by ID
router.delete('/:id', async (req, res) => {
    try {
        const carrier = await Carrier.findByIdAndDelete(req.params.id);

        if (!carrier) {
            return res.status(404).send();
        }

        res.send(carrier);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
