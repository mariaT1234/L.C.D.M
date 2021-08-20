const app = require('./config/server'); 
const connetion = require('./config/db'); 

require('./app/routes/navegacion')(app); 

app.listen(app.get('port'), () => {
    console.log("servidor en el puerto: ", app.get('port')); 
})