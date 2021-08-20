CREATE DATABASE registro; 

USE registro;

CREATE TABLE registro(

    id_usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    apellido VARCHAR(50), 
    correo VARCHAR(75), 
    password VARCHAR(75)

); 

DESCRIBE registro;


CREATE TABLE Pedidos(
    id_producto INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    Nombre_Apellido VARCHAR(150) NOT NULL,
    Telefono INT NOT NULL, 
    capitoneado VARCHAR(50), 
    modificacion_diseño VARCHAR(500), 
    cojines INT, 
    brazos INT, 
    Diseño_mueble VARCHAR(500), 
    Pago_inicial INT NOT NULL, 
    Pago_final INT NOT NULL, 
    Fecha_Entrega DATE
);

DESCRIBE Pedidos; 

CREATE TABLE Materiales(
    id_Materiales INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    Material VARCHAR(50) NOT NULL, 
    Cantidad INT NOT NULL
);
                    
DESCRIBE Materiales; 

INSERT INTO Materiales(Material, Cantidad) values ("alfileres", "10"); 
SELECT * FROM Materiales; 


AE



