const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index.js');

require('./db.js')
const app = express();
// app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/', routes);

app.use(cors({
  origin: 'https://challenge365-front.vercel.app/',
  credentials: true
}))

// const proxy = httpProxy.createProxyServer();

// app.all('/*', (req, res) => {
//     process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//     proxy.web(req, res, { target: 'http://localhost:5173/' });
// });

// proxy.on('error', (err, req, res) => {
//     // Manejo de errores personalizado
//     console.error(err);
//     res.status(500).send('Error en el servidor');
// });


module.exports = app;
