// Создание сервера
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errorsHandler');
const { validateLogin, validateUser } = require('./middlewares/validation');
const NotFound = require('./errors/NotFound');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use(helmet()); // Настройка заголовков HTTP

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);

app.use(auth);

app.use(usersRouter);
app.use(cardsRouter);

app.use('/', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

app.use(errors()); // обработчик ошибок celebrate

app.use(errorsHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
