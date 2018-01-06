const path = require('path');
const express = require('express');
const passport = require('passport');
const { Strategy } = require('passport-facebook');
const session = require('express-session');
const { ensureLoggedIn } = require('connect-ensure-login');
const bodyParser = require('body-parser');

const users = require('./src/backend/users');

const app = express();
const PORT = process.env.PORT || 3000;

const FB_CALLBACK_LOCAL = 'http://localhost:3000/api/loginSuccess';
const FB_CALLBACK_PRODUCTION = 'https://uvb18.herokuapp.com/api/loginSuccess';

passport.use(new Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.NODE_ENV === 'production' ? FB_CALLBACK_PRODUCTION : FB_CALLBACK_LOCAL
}, async (accessToken, refreshToken, profile, cb) => {
  const userId = await users.getOrCreateUser(profile);
  return cb(null, userId);
}));

passport.serializeUser((user, cb) => cb(null, user));

passport.deserializeUser(async (id, cb) => {
  const user = await users.getUserById(id);
  cb(null, user);
});

const sessionSettings = {
  secret: 'vaasankatu',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 }
};

app.use(bodyParser.json());
app.use(session(sessionSettings));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => res.sendFile(path.resolve('dist/index.html')));
app.get('/failure', (req, res) => res.sendFile(path.resolve('dist/failure.txt')));
app.get('/api/venues', (req, res) => res.sendFile(path.resolve('data/venues.json')));
app.get('/api/user', ensureLoggedIn(), (req, res) => res.send(req.user));
app.get('/api/login', passport.authenticate('facebook'));

app.get(
  '/api/loginSuccess',
  passport.authenticate('facebook', { failureRedirect: '/failure' }),
  (req, res) => res.redirect('/')
);

app.post('/api/points', ensureLoggedIn(), async (req, res) => {
  try {
    await users.addPoints(req.user.id, req.body.venue, req.body.points);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get('/api/points', ensureLoggedIn(), async (req, res) => {
  try {
    const points = await users.getUserPoints(req.user.id);
    res.send(points);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get('/api/scores', ensureLoggedIn(), async (req, res) => {
  try {
    const scores = await users.getScores();
    res.send(scores);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(PORT, error => (
  error
    ? console.error(error)
    : console.info(`Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
));
