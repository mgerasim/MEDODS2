import ExampleServer from './server';



const exampleServer = new ExampleServer();
const port = process.env.NODE_ENV === 'production' ? 8080 : parseInt(process.env.PORT, 3000) || 3000;

exampleServer.start(port);