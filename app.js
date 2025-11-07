import express from 'express';

const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
  res.send('Hello from Express in Docker! as');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
