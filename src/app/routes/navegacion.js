const app = require("../../config/server"); 
const bcryptjs = require("bcryptjs");
const connection= require("../../config/db.js");
const { render } = require("../../config/server");

module.exports = app => {
    app.get('/', (req, res) => {
        res.render('../views/mein.ejs'); 
    })

    app.get('/cliente', (req, res) => {
        res.render('../views/cliente.ejs'); 
    })

    app.get('/admin_l', (req, res) => {
        if(req.session.loggedin){
            res.render('../views/admin_l.ejs',{
                login: true,
                usuario: req.session.usuario
            })
            
        }else{
            res.render('../views/admin_l.ejs',{
                login: false,
                usuario: "Inicia sesion"
            })
        }
    })

    app.get('/login', (req, res) => {
        res.render('../views/login.ejs'); 
    })

    app.get('/registro', (req, res) => {
        res.render('../views/registro.ejs'); 
    })

    app.get('/lineaMuebles', (req, res) => {
        res.render('../views/lineaMuebles.ejs'); 
    })

    app.get('/restauraciones', (req, res) => {
        res.render('../views/restauraciones.ejs'); 
    })

    app.get('/pedidos', (req, res) => {
        connection.query("SELECT * FROM Pedidos", (err, result)=>{
            res.render('../views/pedidos.ejs', {

                Pedidos: result
            })
        })

    })

    app.get('/Materiales', (req, res) => {
        connection.query("SELECT * FROM Materiales", (err, result)=>{
            res.render('../views/Materiales.ejs', {

                Materiales: result
            })
          
        })
         
    })

    app.get('/borrar/:id_producto', (req,res)=> {
    
        const id_producto = req.params.id_producto;
         
        connection.query("DELETE FROM Pedidos WHERE id_producto = ?", [id_producto], (err,result) =>{
            if(err){
                res.send(err); 
            } else{
                res.redirect("/pedidos"); 
            }
        }) 
    })

    app.get('/delete/:id_Materiales', (req,res)=> {
    
        const id_material = req.params.id_Materiales;
         
        connection.query("DELETE FROM Materiales WHERE id_Materiales = ?", [id_material], (err,result) =>{
            if(err){
                res.send(err); 
            } else{
                res.redirect("/Materiales"); 
            }
        }) 
    })

       
    app.post('/registro', async (req,res) =>{
        const {nombre, apellido, correo, password} = req.body; 
        console.log(req.body); 
        let passwordHaash = await bcryptjs.hash(password, 8); 
        connection.query("INSERT INTO registro SET ?",{

            nombre: nombre,
            apellido: apellido,
            correo: correo,
            password: passwordHaash,
            rol: "cliente"


            
        }, async(error , result)=> {
            if(error){
                console.log(error); 
            }else {
                res.redirect("/")
            }


        })

    })



    app.post("/auth", async(req, res)=>{

        const{correo, password}= req.body;
        let= passwordHaash = await bcryptjs.hash(password, 8);

        if(correo && password){

            connection.query('SELECT * FROM registro WHERE correo = ?', [correo], async(err, result)=>{

                console.log(result);
                if(res.length == 0 || !(await bcryptjs.compare(password, result[0].password))){
                  
                    res.render('../views/mein.ejs', {
 
                            alert: true,
                            alertTitle: "Algo esta mal :(", 
                            alertMessage: "Revisa que tu usuario y tu contraseña esten correctos",
                            alertIcon: "error",
                            showConfirmButton: true,
                            timer: 15000,
                            ruta: 'login'
                  });
                    

                }else if (result[0].rol === "cliente"){
                    
                    req.session.loggedin= true
                    req.session.correo = result[0].correo;
                    res.render('../views/cliente.ejs', {

                        alert: true,
                        alertTitle: "Hola de nuevo ", 
                        alertMessage: ":)",
                        alertIcon: "success",
                        showConfirmButton: false,
                        timer: 15000,
                        ruta: 'cliente'
                

                    })
                }else if (result[0].rol === "admin"){
                    req.session.loggedin= true
                    req.session.correo = result[0].correo;
                    res.render('../views/admin_l.ejs', {

                        alert: true,
                        alertTitle: "Hola de nuevo ", 
                        alertMessage: ":)",
                        alertIcon: "success",
                        showConfirmButton: false,
                        timer: 15000,
                        ruta: 'admin_l'
                

                    })
                }

            })
        }
    })

    
    app.get('/logout', (req, res)=>{

        req.session.destroy(()=>{
            res.redirect('/')
        })
    })

    app.post('/materiales' , async (req, res)=> {
        const{material, cantidad} = req.body; 
        connection.query('INSERT INTO Materiales SET ?', {
            
            Material: material, 
            Cantidad: cantidad
        }, async(err, result)=>{

            if(err){
                console.log(err)
            }else{
                res.redirect('/Materiales')
            }
        })

    })

    app.post('/pedidos' , (req, res)=> {
        const{Nombre_Apellido, Telefono, capitoneado, modificacion_diseño, cojines, brazos, Diseño_mueble, Pago_inicial, Pago_final, Fecha_Entrega} = req.body; 
        connection.query('INSERT INTO Pedidos SET ?', {
             
            Nombre_Apellido: Nombre_Apellido, 
            Telefono: Telefono, 
            capitoneado: capitoneado, 
            modificacion_diseño: modificacion_diseño,
            cojines: cojines,
            brazos: brazos, 
            Diseño_mueble: Diseño_mueble, 
            Pago_inicial: Pago_inicial, 
            Pago_final: Pago_final, 
            Fecha_Entrega: Fecha_Entrega 
        }, async(err, result)=>{

            if(err){
                console.log(err)
            }else{
                res.redirect('/pedidos')
            }
        })

    })

    app.post("/edit/:id_Materiales", (req, res)=>{

        const id_Materiales = req.params.id_Materiales;
        const {material, cantidad}= req.body;

        connection.query("UPDATE Materiales SET Material = ?, Cantidad = ? WHERE id_Materiales = ? ", [material, cantidad, id_Materiales], (err, results)=>{

            if(err){

                res.send(err)
            } else{

                res.redirect("/Materiales")
            }
        })
    })

    app.post("/editar/:id_producto", (req,res)=>{
        const id_producto = req.params.id_producto; 
        const {nombre,telefono,capitoneado, modificacion_diseño,cojines,brazos,diseño_mueble,pago_inicial,pago_final,fecha_entrega} = req.body; 

        connection.query("UPDATE Pedidos SET Nombre_Apellido = ?, Telefono = ?,  capitoneado = ?, modificacion_diseño = ?, cojines = ?, brazos = ?, Diseño_mueble = ?, Pago_inicial = ?, Pago_final = ?,  Fecha_Entrega = ? WHERE id_producto = ?", [nombre,telefono,capitoneado,modificacion_diseño,cojines,brazos,diseño_mueble,pago_inicial,pago_final,fecha_entrega,id_producto], (err,result)=>{
            if(err){
                
                res.send(err)
            }else{
                res.redirect("/pedidos")
            }
        })
           
        
    })

}



