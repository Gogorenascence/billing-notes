const mongoose = require('mongoose');


const carrierSchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    phone: { type: [String] },
    fax: { type: String },
    email: { type: String },
    notes: { type: String },
    id: { type: String },
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true }
});

const Carrier = mongoose.model("Carrier", carrierSchema, "carriers")

module.exports = {
    Carrier
};
