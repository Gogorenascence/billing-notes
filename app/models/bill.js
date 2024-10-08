const mongoose = require('mongoose');

const diagnosisCodeSchema = new mongoose.Schema({
    code: { type: String },
    name: { type: String },
}, { _id: false });

const procedureCodeSchema = new mongoose.Schema({
    code: { type: String },
    modifier: { type: String },
    units: { type: Number },
    name: { type: String },
}, { _id: false });

const billSchema = new mongoose.Schema({
    patientFirstName: { type: String },
    patientLastName: { type: String },
    diagnosisCodes: { type: [diagnosisCodeSchema] },
    carrierID: { type: String },
    carrierName: { type: String },
    claimNumber: { type: String },
    procedureCodes: { type: [procedureCodeSchema] },
    disputedAreas: { type: [String] },
    DOS: { type: String },
    charge: { type: Number },
    status: { type: String },
    sent: { type: String },
    received: { type: String },
    processed: { type: String },
    paid: { type: Number },
    reconsideration: { type: Boolean },
    cleared: { type: Boolean },
    docLink: { type: String },
    notes: { type: String },
    lastChecked: {type: String},
    id: { type: String },
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true }
});

const Bill = mongoose.model("Bill", billSchema, "bills")

module.exports = {
    Bill
};
