var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors'); // Importando cors para usar las peticiones cruzadas desde el Frontend
const mongoose = require('mongoose'); // Importando mongoose para la conexión a la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/ejemplo6d02');
//depues de la declaracion de variables se coloca la conexion a la base de datos
//const mongoose = require('mongoose');
//Listado de archivos de modelos
require('./models/producto'); // Importando el modelo de producto para que se registre en mongoose
require('./models/empleado'); // Importando el modelo de empleado para que se registre en mongoose
require('./models/cliente'); // Importando el modelo de cliente para que se registre en mongoose








//listado de rutas
//prodcuto

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productosRouter = require('./routes/productos'); // new file of route in da houseeeeee step 1 
var clientesRouter = require('./routes/clientes'); // new route for clientes

//listado de rutas empleados
var empleadosRouter = require('./routes/empleados'); // asigacion de ruta de empleados 


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//usa la direccion estatica como su nombre lo indica 
app.use('/foto', express.static(__dirname + '/almacen/img'));


app.use(cors({
  origin: "*",
  methods : ["POST", "GET","PUT","DELETE"],
  preflightContinue: false,
  optionsSuccessStatus : 204
})); // Usando cors para permitir peticiones cruzadas desde el Frontend

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




//asiganacion de rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/producto', productosRouter); // new route for productos  // step 2
app.use('/empleados', empleadosRouter); // new route for empleados 
app.use('/clientes', clientesRouter); // new route for clientes


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
