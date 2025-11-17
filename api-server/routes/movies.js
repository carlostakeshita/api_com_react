const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DATA_FILE = path.join(__dirname, '..', 'data', 'movies.json');

function readFileData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    return [];
  }
}

function writeFileData(arr) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  const tmp = DATA_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(arr, null, 2), 'utf8');
  try { fs.renameSync(tmp, DATA_FILE); } catch (e) { fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2), 'utf8'); }
}

router.get('/', (req, res) => res.json(readFileData()));

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const item = readFileData().find((m) => m.id == id || m._id == id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

router.post('/', (req, res) => {
  const { title, year, director, description } = req.body || {};
  if (!title) return res.status(400).json({ error: 'title is required' });
  const arr = readFileData();
  const id = String(Date.now());
  const newItem = { id, title, year, director, description };
  arr.push(newItem);
  writeFileData(arr);
  res.status(201).json(newItem);
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body || {};
  const arr = readFileData();
  const idx = arr.findIndex((m) => m.id == id || m._id == id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const updated = { ...arr[idx], ...body };
  arr[idx] = updated;
  writeFileData(arr);
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const arr = readFileData();
  const idx = arr.findIndex((m) => m.id == id || m._id == id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const removed = arr.splice(idx, 1)[0];
  writeFileData(arr);
  res.json({ deleted: removed });
});

module.exports = router;
