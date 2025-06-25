var express = require('express');
var Router = express.Router();
const mongoose = require('mongoose');
const autentifica = (require('../middleware/autentificajwt'));
const bcrypt = require('bcrypt');
const Cliente = mongoose.model('Cliente');

Router.post('/',async (req,res)=>{
    try {
        let salt = await bcrypt.genSalt(10); // Genera un salt para hashear la contraseña
        let password_cifrado = await bcrypt.hash(req.body.password, salt); // Hashea la contraseña con el salt generado

        let cli = new Cliente({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            email: req.body.email,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            password: password_cifrado // Guarda la contraseña hasheada
        });

        await cli.save();

        let aviso = {
            mensaje: "Cliente creado correctamente"
        }
        res.send(aviso);
    } catch (error) {
        console.error('Error al crear cliente:', error);
        res.status(500).send({mensaje: "Error al crear el cliente"});
    }
}); 

Router.post('/iniciosesion', async (req, res) =>{
    try {
        let cli = await Cliente.findOne({email: req.body.email});
        if(!cli){
            return res.status(401).send({mensaje: "El cliente no existe"});
        }
        if(! await bcrypt.compare(req.body.password,cli.password)
        ){
        return res.status(401).send({mensaje: "Contraseña incorrecta"});
        }
        let aviso = {
            msj:"Bienvenido al sistema ",
            jwt: cli.generadorJWT() // Genera el token JWT para el cliente
        }
        res.send(aviso);
    } catch (error) {
        console.error('Error en inicio de sesión:', error);
        res.status(500).send({mensaje: "Error en el inicio de sesión"});
    }
})





module.exports = Router;