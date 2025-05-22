import path from "path";
import { fileURLToPath } from "url";
import express from 'express'
import flash from 'connect-flash'
import { flashValidationErrors } from './errorHandlers.js'
import session from 'express-session'

const app = express();

app.set("view engine", "ejs"); // We'll use ejs. Other options: pug, hbs, liquid etc.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: 'sssHH', // remember to input this in .env
    key: 'chocchip', // remember to input this in .env
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash())

app.use((req, res, next) => {
    res.locals.flashes = req.flash(); // flash messages (ex: success, error, info)
    next();
})

app.get('/', (req, res) => {
    res.render('index', {title: 'hi'});
});

app.get('/set-flash', (req, res) => {
    req.flash('success', 'you successfully added whatever');
    req.flash('success', 'you saved to the db');
    req.flash('error', 'oops');
    req.flash('fdsa', 'asdf');
    res.send('set flash')
})

// app.use(flashValidationErrors)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});