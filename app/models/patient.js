const mongoose = require('mongoose');


const diagnosisCodeSchema = new mongoose.Schema({
    code: { type: String },
    name: { type: String },
}, { _id: false });

const repSchema = new mongoose.Schema({
    name: { type: String },
    phone: { type: String },
    fax: { type: String },
}, { _id: false });

const adjusterSchema = new mongoose.Schema({
    name: { type: String },
    phone: { type: String },
    fax: { type: String },
    company: { type: String }
}, { _id: false });

const patientSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    city: { type: String },
    birthday: {type: String},
    sex: { type: String },
    SSN: { type: String },
    DOI: { type: String },
    DWCNumber: { type: Number },
    diagnosisCodes: { type: [diagnosisCodeSchema] },
    carrierID: { type: String },
    carrierName: { type: String },
    representative: { type: repSchema },
    adjuster: { type: adjusterSchema },
    claimNumber: { type: String },
    docLinks: { type: [String] },
    notes: { type: String },
    id: { type: String },
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true }
});

const Patient = mongoose.model("Patient", patientSchema, "patients")

module.exports = {
    Patient
};
