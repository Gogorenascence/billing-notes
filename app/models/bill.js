const mongoose = require('mongoose');


const procedureCodeSchema = new mongoose.Schema({
    procedureCode: { type: String },
    modifier: { type: String },
    units: { type: Number },
    name: { type: String },
}, { _id: false });

const billSchema = new mongoose.Schema({
    patientID: { type: String },
    patientFirstName: { type: String },
    patientLastName: { type: String },
    carrierID: { type: String },
    carrierName: { type: String },
    claimNumber: { type: String },
    DOS: { type: String },
    procedureCodes: { type: [procedureCodeSchema] },
    charge: { type: Number },
    status: { type: String },
    sent: { type: String },
    received: { type: String },
    paid: { type: String },
    docLink: { type: String },
    notes: { type: String },
    id: { type: String },
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true }
});

const Bill = mongoose.model("Bill", billSchema, "bills")

module.exports = {
    Bill
};
