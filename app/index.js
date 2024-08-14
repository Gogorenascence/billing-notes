const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require("cors");
const patientRouter = require("./routes/patient")
const billRouter = require("./routes/bill")
const carrierRouter = require("./routes/carrier")
const icdcodeRouter = require("./routes/icdcode")
const dotenv = require('dotenv');


dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const http = require("http").createServer(app);
// const io = require("socket.io")(http, {
//     cors: {
//         origin: "*",
//     },
// });

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// setupSocket(io)

const PORT = process.env.PORT || 4000;

http.listen(PORT, () => {
    console.log(`Server is up and running on port number ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use('/patients', patientRouter);
app.use('/bills', billRouter);
app.use('/carriers', carrierRouter);
app.use('/icdcodes', icdcodeRouter);
