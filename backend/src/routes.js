const express = require('express');
const routes  = express.Router();
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

routes.post('/sessions', SessionController.create);

routes.get('/profile',ProfileController.list);

routes.get('/ongs', OngController.list);
routes.post('/ongs', OngController.create);

routes.get('/incidents',IncidentController.list);
routes.post('/incidents',IncidentController.create);
routes.delete('/incidents/:id',IncidentController.delete);

module.exports = routes;