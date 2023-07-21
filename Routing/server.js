const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;



app.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
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