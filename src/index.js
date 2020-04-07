const express = require('express');
const app = express();
const morgan = require('morgan'); //Morgan me sirev para poder ver las peticiones al servidor
const {mongoose} = require('./database');
const path = require('path');


//MORGAN ME AYUDA A PODER VER LAS PETICIONES EN EL LOG, CON EXPRESS.JOSN LE DIGO AL SERVIDOR
//QUE DEBE ENTENDER PETICIONES EN FORMATO JSON



//Seccion de configuracion

app.set('port', process.env.PORT || 3000);

//Middlewares(Funciones que se ejecutan antes de llegar a la ruta)

app.use(morgan('dev'));
app.use(express.json());

//Rutas

app.use('/api/tasks',require('./routes/task.routes'));

//Static Files

app.use(express.static(path.join(__dirname, 'public')));

//Arranque de servidor
app.listen(app.get('port'),()=>{
	console.log(`Sirviendo en el puerto ${app.get('port')}`);
});

