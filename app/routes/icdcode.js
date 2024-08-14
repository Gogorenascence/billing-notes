const express = require('express');
const router = express.Router();
const { ICDCode } = require('../models/icdcode');

// Create a new icdcode
router.post('/', async (req, res) => {
    const icdcode = new ICDCode(req.body);
    try {
        await icdcode.save();
        res.status(201).send(icdcode);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all icdcodes
router.get('/', async (req, res) => {
    try {
        const icdcodes = await ICDCode.find();
        const processed_icdcodes = [...icdcodes].map((icdcode) => {
            icdcode.id = icdcode._id ? (icdcode._id.$oid ? icdcode._id.$oid : icdcode._id) : icdcode.id;
            return icdcode;
        })
        res.send(processed_icdcodes);
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
});

// Get a icdcode by ID
router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const icdcode = await ICDCode.findById(_id);
        if (!icdcode) {
            return res.status(404).send();
        }
        res.send(icdcode);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a icdcode by ID
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        "code",
        "name"
    ];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const icdcode = await ICDCode.findById(req.params.id);
        if (!icdcode) {
            return res.status(404).send();
        }

        updates.forEach((update) => icdcode[update] = req.body[update]);
        await icdcode.save();
        res.send(icdcode);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a icdcode by ID
router.delete('/:id', async (req, res) => {
    try {
        const icdcode = await ICDCode.findByIdAndDelete(req.params.id);

        if (!icdcode) {
            return res.status(404).send();
        }

        res.send(icdcode);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
