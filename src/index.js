const express = require('express');
const db = require('./Config/dbConfig.js');
const apiRouter = require('./routes/apiRouter.js');
const app = express();
// Synchronize the database
db.sync({ force: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((err) => {
    console.error('Error synchronizing the database:', err);
  });



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
  return res.status(200).send({
    success: true,
    message: 'pong',
  });
});

app.listen(3000, () => {
  console.log('Server Running on 3000');
});
