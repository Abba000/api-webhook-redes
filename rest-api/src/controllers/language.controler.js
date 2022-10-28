import { getConnection } from "../database/database";
import axios from 'axios';


const getLanguages = async (req, res)=>{ 
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT id, nombre, apellido FROM alumnos");
        res.json(result);

        axios.post('http://localhost:4000/webhook', {
        mensaje: "Datos de la tabla alumnos",
        data: result })
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const getLanguage = async (req, res)=>{ 
    try{
        console.log(req.params);
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, nombre, apellido FROM alumnos WHERE id = ?", id);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const addLanguages = async (req, res) => {
    try{
        const { nombre, apellido } = req.body;

        if ( nombre == undefined || apellido == undefined) {
            res.status(400).json({ message: "ERROR al cargar los datos"})
        }
        
        const alumno = { nombre, apellido };
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO alumnos SET ?", alumno);
        res.json(result);

        axios.post('http://localhost:4000/sendMail', {
            mensaje: `Se inserto con exito el alumno: ${ nombre + ' ' + apellido }`,
            remitente: 'abbaagustin@outlook.com',
            asunto: 'asunto',
            token: 'token666'
        })

    }catch(error){
        res.status(500);
        res.send(error.message);

        axios.post('http://localhost:4000/webhook', {
            mensaje: 'Se produjo un error.'
        })
    }
}

const deleteLanguage = async (req, res)=>{ 
    try{
        console.log(req.params);
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM alumnos WHERE id = ?", id);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const updateLanguage = async (req, res)=>{ 
    try{
        const { id } = req.params;
        const { nombre, apellido } = req.body;

        if ( id == undefined || nombre == undefined || apellido == undefined) {
            res.status(400).json({ message: "ERROR al cargar los datos"})
        }

        const alumno = { id, nombre, apellido };
        const connection = await getConnection();
        const result = await connection.query("UPDATE alumnos SET ? WHERE id = ?", [alumno, id]);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getLanguages,
    getLanguage,
    addLanguages,
    deleteLanguage,
    updateLanguage
};