const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.json');

function readData() {
    const raw = fs.readFileSync(filePath);
    return JSON.parse(raw);
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function getAll() {
    return readData();
}

function getById(id) {
    return readData().find(item => item.id === id);
}

function addEntry(name, dob, base64Image) {
    const data = readData();
    const newId = data.length ? Math.max(...data.map(d => d.id)) + 1 : 1;

    data.push({
        id: newId,
        name,
        dob,
        image: base64Image
    });

    writeData(data);
    return newId;
}

function updateEntry(id, name, dob, base64Image) {
    const data = readData();
    const index = data.findIndex(d => d.id === id);
    if (index === -1) return false;

    data[index] = { id, name, dob, image: base64Image };
    writeData(data);
    return true;
}

function deleteEntry(id) {
    let data = readData();
    const initialLength = data.length;
    data = data.filter(d => d.id !== id);
    writeData(data);
    return data.length < initialLength;
}

module.exports = {
    getAll,
    getById,
    addEntry,
    updateEntry,
    deleteEntry
};