const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const path = require('path');

const cors = require('cors');
app.use(cors());

let emailFunction = require('./email');

app.use(bodyParser.json({ limit: '10mb' }));

app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));

app.get('/', (req, res) => {
    res.sendStatus(200);json()
});

app.get('/entries', (req, res) => {
    res.json(db.getAll());
});

app.get('/entries/:id', (req, res) => {
    const item = db.getById(Number(req.params.id));
    item ? res.json(item) : res.status(404).send('Not found');
});

app.post('/entries', (req, res) => {
    const { name, dob, image } = req.body;
    const id = db.addEntry(name, dob, image);
    res.status(201).json({ id });
});

app.post('/checkout', async (req, res) => {
    const sent = await emailFunction.send(req.body.email, "Succesfull Purchase", req.body.items);
    res.status(201).json({message: "Success"});
});

app.put('/entries/:id', (req, res) => {
    const { name, dob, image } = req.body;
    const updated = db.updateEntry(Number(req.params.id), name, dob, image);
    updated ? res.sendStatus(200) : res.sendStatus(404);
});

app.delete('/entries/:id', (req, res) => {
    const deleted = db.deleteEntry(Number(req.params.id));
    deleted ? res.sendStatus(200) : res.sendStatus(404);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));