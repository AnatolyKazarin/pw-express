import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'PW REST API',
        description: 'REST API for Parrot Wings app done with Express'
    },
    host: 'https://pw-express.onrender.com'
};

const outputFile = './swagger-output.json';
const routes = ['../router/api/index.js', '../router/auth/auth.route.js'];

swaggerAutogen()(outputFile, routes, doc);
