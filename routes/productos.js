//estrucutra basica de un router que tenga referencias a riutas 
var express = require('express');
var router = express.Router();
//mongoose como gestor de datos 
const mongoose = require("mongoose");
//extraer el modelo producto 
const Producto = mongoose.model("Producto");
//ruta de actulaizar 
const upload = require('../libs/almacen');
//fs es file string 
const fs = require('fs-extra');
//manejo de rutas de archivo 
const path = require('path');





//ayudas para validar datos de entrada
const {body, validationResult} = require('express-validator');
const autentifica = require('../middleware/autentificajwt');

//Metodos HTTP
// GET, POST, PUT, DELETE, Fresco el panerai ! 

// no se puede tener dos metodos iguales en un mismo router, por ejemplo dos get, dos post 

// GET: Obtener datos de forma simplificada 



// trabajan con url , funcion anonima y parametros que son req y res que son request y response

//cuando se cominica 
router.get('/',autentifica, async function(req, res){
   /*  pro = [
        {codigo: 1, nombre: 'Fenix', descripcion: 'Ave de fuego', precio: 1000, existencia: 10},
        {codigo: 2, nombre: 'Unicornio', descripcion: 'Animal mitologico', precio: 2000, existencia: 5},
        {codigo: 3, nombre: 'Dragon', descripcion: 'Animal mitologico', precio: 3000, existencia: 2},
    ] */

        //linea de codigo para consultar todo mediente la directiva find
    let pro = await Producto.find({});

    res.send({pro});
    
});
//consultar un solo documento  

//indica la ruta unica por que no se puede usar la misma ruta para varios metodos
router.get('/nombre/:nombre',autentifica,async (req, res) => {

    //Se crea la variable a ytrave s de la dconsulta del parametro nombre 
    let producto = await Producto.findOne({nombre:req.params.nombre})

    //respuesta en casi de ser negativo
    if (!producto){
        return res.status(400).send("no hay informacion documento");
    }

    res.send({producto});
});

router.post('/', autentifica,
    [   //validaciones de los datos de entrada
        /* body("codigo").isInt().withMessage("El codigo debe ser un numero entero"),
        body("nombre").isLength({min: 3}).withMessage("El nombre debe tener al menos 3 caracteres"), */
    ],upload.single("imagen"), async function(req, res){//simulacion de guardar un producto

        //req es el objeto que contiene la peticion y res es el objeto que contiene la respuesta
        let error = validationResult(req); //validacion de los datos de entrada

        if (!error.isEmpty()) {
            //error 400 indica que hay un error en la peticion
            return res.status(400).json({ errors: error.array() });
        }
       
    


    
    let prod_guardado = new Producto( {
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        existencia: req.body.existencia
    });
    
    if(req.file){
        const {filename} = req.file;
        prod_guardado.setimgurl(filename);
        }

    let pro_save = await prod_guardado.save();

    //res.status(201).send({prod_guardado}); // 201 es el codigo de estado para indicar que se ha creado un recurso

    //res.status(201).send('Peticion POST a productos . recordemos que post es para guardar o crear datos');


    let = aviso ={
        msj: 'documento guardado'
    }
    res.status(201).send(aviso);

    });
//Metodo para modificar 
router.put('/', autentifica, async (req, res)=>{
    let pro = await Producto.findOne({nombre:req.body.nombre});

    if(!pro){
        return res.status(400).send("Documento no encontrado");
    }    

    let pro_modificado = await Producto.findOneAndUpdate(
        //campo de filtrado
        {nombre:req.body.nombre},
        //campo que se modifican
        {
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        existencia: req.body.existencia  
        },
        //valores retornados 

        {
            new:true
        }

    );
    res.send({pro_modificado});
});

router.delete('/borrar/:nombre',autentifica, async(req, res)=>{
    let pro =  await Producto.findOne({nombre:req.params.nombre});

    if(!pro){
        return res.status(400).send("Documento no encontrado");
    }

    let prod_eliminado = await Producto.findOneAndDelete({nombre:req.params.nombre});
    let urlfotoanterior = prod_eliminado.imgurl.split('/');//se divide la url en un array
    await fs.unlink(path.resolve("almacen/img"+urlfotoanterior[4]));
    res.send({prod_eliminado})

});


/* 
no se puede tener metodos vacios por que el servi
por lo menos debmos tener url y funcion anonima sin parametros
*/




//metodo para actualizar donde primero se busca poir nombre 
router.put('/', autentifica, upload.single('imagen'), async(req,res)=>{
    let prod = await Producto.findOne({nombre:req.body.nombre});

    if(!prod){
        return res.status(402).send("Producto no encontrado");
    }

    let urlfotoanterior = pro.img.split('/');


    console.log(req.file);
    if(req.file){
        const {filename} = req.file;
        prod.setimgurl(filename);
    }
    //se busca el producto por nombre y actualiza 
    let pro_modificado = await Producto.findByIdAndUpdate(
        {nombre:req.body.nombre},
        {imgurl:prod.imgurl},
        {new:true},
    );

    if(req.file){//path busca y elimina 
        await fs.unlink(path.resolve("almacen/img"+urlfotoanterior[4]));

        res.send({pro_modificado});
    }

});
module.exports = router;






