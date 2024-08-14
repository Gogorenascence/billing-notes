const express = require('express');
const router = express.Router();
const { Bill } = require('../models/bill');

// Create a new bill
router.post('/', async (req, res) => {
    const bill = new Bill(req.body);
    try {
        await bill.save();
        res.status(201).send(bill);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all bills
router.get('/', async (req, res) => {
    try {
        const bills = await Bill.find();
        const processed_bills = [...bills].map((bill) => {
            bill.id = bill._id ? (bill._id.$oid ? bill._id.$oid : bill._id) : bill.id;
            return bill;
        })
        res.send(processed_bills);
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
});

// Get a bill by ID
router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const bill = await Bill.findById(_id);
        if (!bill) {
            return res.status(404).send();
        }
        res.send(bill);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a bill by ID
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        "patientFirstName",
        "patientLastName",
        "carrierID",
        "carrierName",
        "claimNumber",
        "DOS",
        "procedureCodes",
        "diagnosisCodes",
        "disputedAreas",
        "charge",
        "status",
        "sent",
        "received",
        "processed",
        "paid",
        "docLink",
        "lastChecked",
        "notes"
    ];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates!',
            content: updates.filter(update => !allowedUpdates.includes(update))
        });
    }

    try {
        const bill = await Bill.findById(req.params.id);
        if (!bill) {
            return res.status(404).send();
        }

        updates.forEach((update) => bill[update] = req.body[update]);
        await bill.save();
        res.send(bill);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a bill by ID
router.delete('/:id', async (req, res) => {
    try {
        const bill = await Bill.findByIdAndDelete(req.params.id);

        if (!bill) {
            return res.status(404).send();
        }

        res.send(bill);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
