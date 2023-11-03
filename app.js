const express = require('express');
const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/register.html');
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send('Invalid email address');
  }

  const isStrongPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if (!isStrongPassword.test(password)) {
    return res.status(400).send('Password must meet certain criteria');
  }

  res.send('Registration successful');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
