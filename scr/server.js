const express = require('express');
const {PrismaClient} =require ('@prisma/client');
const { number } = require('joi');
const prisma = new PrismaClient();
//const router = require('./router');

//const bodyParser = require('body-parser');

const HOST = 'localhost';
const PORT = 3000;
const app = express();
app.use(express.json())

// iniciar server

app.listen(PORT, ()=>{
    console.log('Server en ',HOST,' puerto ', PORT);
});

app.post('/', async(req, res) => {
    const{titulo,autor,descripcion} = req.body;
    const libro = await prisma.libros.create({
        data:{
            titulo: titulo,
            autor: autor,
            descripcion: descripcion
        },
    });
    res.json(libro);
});

app.get('/', async(req, res) =>{
    const libros = await prisma.libros.findMany();
    res.json(libros)
})

app.get('/byId/:id', async(req, res) =>{
    const id = Number(req.params.id);
    const libro = await prisma.libros.findUnique({
        where:{
            Id:id,
        },
    });
    res.json(libro)
});



app.put("/:id", async(req, res) =>{
    const{titulo,autor,descripcion} = req.body;
    const id = Number(req.params.id);

    const updateLibro = await prisma.libros.update({
        where:{
            Id: id,
        },
        data:{
            titulo: titulo,
            autor:autor,
            descripcion:descripcion
        },
    });
    res.json(updateLibro)
});

app.delete('/byId/:id', async(req, res) =>{
    const id = Number(req.params.id);
    const deleteUser = await prisma.libros.delete({
        where:{
            Id: id,
        },
    });
    res.json(deleteUser);
});

app.delete('/', async(req,res)=>{
    const delLibros = await prisma.libros.deleteMany();
    res.json(delLibros);
})
