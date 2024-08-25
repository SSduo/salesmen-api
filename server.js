const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

let salesmen = require('./salesmen.json');

app.get('/api/salesmen', (req, res) => {
  res.json(salesmen);
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const salesman = salesmen.find(
    sm => sm.username === username && sm.password === password
  );

  if (salesman) {
    const { password, ...salesmanData } = salesman;
    res.json({ username: salesmanData.username, token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/api/salesmen/:username', (req, res) => {
  const { username } = req.params;
  const salesman = salesmen.find(sm => sm.username === username);
  
  if (salesman) {
    // Exclude password from response
    const { password, ...salesmanData } = salesman;
    res.json(salesmanData);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
