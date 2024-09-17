const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/calculate', (req, res) => {
  const { values, type, equationResult } = req.body;
  let result;

  if (type === 'asc') {
    result = values.sort((a, b) => a - b);
  } else if (type === 'desc') {
    result = values.sort((a, b) => b - a);
  } else if (type === 'equation') {
    result = equationResult;
  }

  res.json({
    type: type,
    result: result,
  });
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
