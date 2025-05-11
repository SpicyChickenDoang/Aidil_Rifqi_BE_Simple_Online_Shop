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

function addEntry(body, fileNames) {
    const data = readData();
    const newId = data.length ? Math.max(...data.map(d => d.id)) + 1 : 1;

    data.push({
        id: newId,
        title: body.title,
        sku: body.sku,
        description: body.description,
        quantity: body.quantity,
        images: fileNames
    });

    writeData(data);
    return newId;
}

function updateEntry(buy, qty) {
    const data = readData();
    const index = data.findIndex(item => item.id == buy.id);
    const current = data.find(item => item.id == buy.id);
    
    if (index === -1) return false;

    if (current.quantity < qty) {
        console.log(current.quantity, qty);
        
        return false
    }

    data[index] = {
        id: parseInt(buy.id),
        title: current.title,
        sku: current.sku,
        description: current.description,
        quantity: (current.quantity - qty),
        images: current.images
    };
    writeData(data);
    return true;
}

module.exports = {
    getAll,
    getById,
    addEntry,
    updateEntry
};