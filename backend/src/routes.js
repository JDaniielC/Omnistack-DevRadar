const { Router} = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get ('/search', SearchController.index);

module.exports = routes;


//Métodos HTTP: GET, POST, DELETE, PUT
//tipos de parâmetros:
//Query params: request.query (filtros, ordenação, paginação)
//route params: request.params (identificar um recurso ou alteração ou remoção)
//body: request.body (Dados para criação ou alteração de um registro)
