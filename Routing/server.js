const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const postApiRoutes = require('./routes/api-post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const app = express();

const errorMsq = chalk.bgKeyword('white').redBright;
const successMsq = chalk.bgKeyword('green').white;

app.set('view engine', 'ejs');

const PORT = 3000;

app.listen(PORT, 'localhost', (error) => {
    error ? console.log(errorMsq(error)) : console.log(successMsq(`listening port ${PORT}`));
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms')); // мидлвар логгер morgan
app.use(express.urlencoded({extended: false}));
app.use(express.static('styles')); // Разрешаем браузеру доступ к файлам в папке styles
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    const title = 'Home';

    res.render(createPath('index'), {title});
});

app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);

app.get('/home', (req, res) => {
    res.redirect('/');
});

app.get('/about-us', (req, res) => {
    res.redirect('/contacts');
});

app.use((req, res) => {
    const title = 'Error page';

    res
    .status(404)
    .render(createPath('error'), {title});
});