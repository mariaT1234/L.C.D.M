const mysql = require('mysql'); 

const connection = mysql.createConnection ({
    host: "localhost",
    user: "root",
    database: "registro"
}); 

connection.connect((err) =>{
    if(err){
        console.log("El error a conexion a BD es: " + err)
        return; 
    }
    console.log("Conectado exitosamente a la BD"); 
}); 

module.exports = connection; 