const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sendEmail = require('./sendemail');

const app = express();

// Middleware

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Route

app.get('/', (req, res) => {
  res.send('Working...');
});

app.post('/sendmail', async (req, res) => {
  const { email } = req.body;

  try {
    const send_to = `Новая заявка с сайта! Номер телефона: ${req.body.phone}`;
    const send_from = 'SomoonTrans@yandex.ru'; // somoontrans@yandex.ru or somoonwork@gmail.com
    const subject = email;
    const message = `<h4>Номер телефона: ${req.body.phone}</h4> <br>Откуда: ${req.body.city1} ${req.body.street1} <br>Куда: ${req.body.city2} ${req.body.street2} <br>Габариты: ${req.body.size} <br>Примерный вес: ${req.body.weight}`;
    await sendEmail(send_to, send_from, subject, message);
    res.status(200).json({ success: true, message: 'Email Sent' });
  } catch (error) {
    res.status(500).json(error.message);
  }
  req.body.phone = '';
  req.body.city1 = '';
  req.body.city2 = '';
  req.body.street1 = '';
  req.body.street2 = '';
  req.body.size = '';
  req.body.weight = '';
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}...`);
});
