const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require("cors");
const cardRouter = require("./routes/card")
const gameRouter = require("./routes/game")
const playerRouter = require("./routes/player")
const articleRouter = require("./routes/article")
const deckRouter = require("./routes/deck")
const setupSocket = require("./socket")
const dotenv = require('dotenv');


dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
    },
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

setupSocket(io)

const PORT = process.env.PORT || 4000;

http.listen(PORT, () => {
    console.log(`Server is up and running on port number ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Game Server is running');
});

app.use('/cards', cardRouter);
app.use('/games', gameRouter);
app.use('/players', playerRouter);
app.use('/articles', articleRouter);
app.use('/decks', deckRouter);
