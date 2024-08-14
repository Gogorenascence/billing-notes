const express = require('express');
const router = express.Router();
const { Patient } = require('../models/patient');

// Create a new patient
router.post('/', async (req, res) => {
    const patient = new Patient(req.body);
    try {
        await patient.save();
        res.status(201).send(patient);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        const processed_patients = [...patients].map((patient) => {
            patient.id = patient._id ? (patient._id.$oid ? patient._id.$oid : patient._id) : patient.id;
            return patient;
        })
        res.send(processed_patients);
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
});

// Get a patient by ID
router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const patient = await Patient.findById(_id);
        if (!patient) {
            return res.status(404).send();
        }
        patient.id = patient._id ? (patient._id.$oid ? patient._id.$oid : patient._id) : patient.id;
        res.send(patient);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a patient by ID
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        "firstName",
        "lastName",
        "city",
        "birthday",
        "sex",
        "SSN",
        "DOI",
        "DWCNumber",
        "diagnosisCodes",
        "carrierID",
        "carrierName",
        "representative",
        "adjuster",
        "claimNumber",
        "docLinks",
        "notes"
    ];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).send();
        }

        updates.forEach((update) => patient[update] = req.body[update]);
        await patient.save();
        res.send(patient);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a patient by ID
router.delete('/:id', async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);

        if (!patient) {
            return res.status(404).send();
        }

        res.send(patient);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
