const routes = require('express').Router();
const passport = require('passport');

routes.use('/', require('./swagger'));
routes.use('/equipment', require('./equipment'));
routes.use('/workouts', require('./workouts'));

routes.get('/login', passport.authenticate('github'), (req, res) => {});

routes.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = routes;