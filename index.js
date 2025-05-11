const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const path = require('path');

const cors = require('cors');
app.use(cors());

const emailFunction = require('./email');
const fileFunction = require('./files');
const authFunction = require('./auth');

app.use(bodyParser.json({ limit: '10mb' }));
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));

app.get('/', (req, res) => {
    res.sendStatus(200); json()
});

app.post('/entries', fileFunction.array('images'), (req, res) => {
    const fileNames = req.files.map(file => file.filename);
    const id = db.addEntry(req.body, fileNames);

    res.status(201);
});

app.get('/entries', (req, res) => {
    res.json(db.getAll());
});

app.post('/login', (req, res) => {
    const token = authFunction.createToken(req.body);
    console.log(req.body);

    res.status(200).json({ token: token });
});

app.post('/checkout', async (req, res) => {
    let failed = false;
    req.body.items.forEach(item => {
        const update = db.updateEntry(item, item.qty);
        if (update == false) {
            failed = true;
        }
    });

    if (failed) {
        return res.status(422).json({ message: "Fail" });
    }
    const sent = await emailFunction.send(req.body.email, "Succesfull Purchase", req.body.items);
    res.status(201).json({ message: "Success" });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));