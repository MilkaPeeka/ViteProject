require('dotenv').config();
const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();

const passport = require('./config/passport-config.cjs');


const store = new MongoDBStore({
  uri: process.env.REMOTE_DB,
  collection: 'BarakSessions', // Collection name for storing sessions in MongoDB
});

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json({ extended: true }));

app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 86400000 }, // 1 day in milliseconds
  store,
}));

app.use(passport.initialize());
app.use(passport.session());

const userRoutes = require('./routes/loginRoutes.cjs');
const rekemRoutes = require('./routes/rekemsRoutes.cjs');
// Use the userRoutes for all user-related routes
app.use('/api/user/', userRoutes);

// Use the rekemRoutes for all rekem (carData) related routes
app.use('/api/rekems', rekemRoutes);

mongoose.connect(process.env.REMOTE_DB)
  .then(() => {
    console.log('Connected to the database successfully');
    const port = 3001;
    app.listen(port, () => console.log(`Running API on port ${port}`));
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
  });

