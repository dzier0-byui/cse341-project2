const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API for managing contacts'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};  

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

//this will generate the swagger.json 
swaggerAutogen(outputFile, endpointsFiles, doc);