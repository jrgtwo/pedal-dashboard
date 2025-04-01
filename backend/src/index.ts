import express from 'express';

const app = express();
const port = 5150;

app.get('/api/test', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})