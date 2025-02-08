const request = require("supertest");
const express = require("express"); //Inicio Un express y app ya que la importacion si el servidor se inicia con el "Listen", no funciona en el Supertest
const app = express();
const router = require("./routes/routesPost")
const mongoose = require("mongoose");
require("dotenv").config({ path: "./env/.env" })
const Model = require("./models/PostModels");

app.use(express.json());// tambien inicio los mismos Middlewares que usaria app
app.use(express.urlencoded({ extended: true }));
app.use("/", router); 

describe("Testing Create", () => {
    beforeAll(async () => { // Primero Conectamos a Nuestra DB
        await mongoose.connect(process.env.MONGO_URI)
    })
    afterAll(async () =>{
        await Model.deleteMany({}) 
        // Acá van laves dentro para especificar que no hay filtro de borrado 
        //Es decir borra todo dejando el objeto vacio, si quiero eliminar algo puntual 
        //Puedo poner clave y valor dentro
        await mongoose.connection.close() 
        // Al finalizar las pruebas: Si estás ejecutando pruebas unitarias y 
        //Una vez que se completan todas, es una buena práctica cerrar la conexión a la base de datos para liberar los recursos.
    })
    it("Debería Crear un Post", async () => {
        const PostModel = {
            title: "Primer Post",
            body: "Bienvenido a Mi Perfíl",
            };
        
        const res = await request(app)
        // hacemos el Supertest que lo nombramos request en la importacion, llamando de parametro a app        
        .post("/create")// a que ruta afecta esta funcion
        .send(PostModel)// pruebo con el objeto de esta función que tiene el mismo body que el Model original

        expect(res.status).toBe(201);
        expect(res.body.title).toBe(PostModel.title);
        expect(res.body.body).toBe(PostModel.body);
        })
    
    it("Debería dar error si no se envia", async ()=> {
        const PostModel = {
            title: "Primer Post",
            };
        const res = await request(app).post("/create").send(PostModel)
        expect(res.status).toBe(500)
        expect(res.body.Message).toBe("500 - Error en la Solicitud")    
    })
});

describe("Testing Get /title/:title", () => {
    
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI)
    })

    it("Deberiamos Obtener un post por el title, despues de crearlo", async () =>{
        
        const PostModel = await Model.create({
            title: "Primer Post",
            body: "Bienvenido a Mi Perfíl",
            });

        const res = await request(app).get(`/title/${encodeURIComponent(PostModel.title)}`)

        expect(res.status).toBe(200);
        expect(res.body.title).toBe(PostModel.title);
        expect(res.body.body).toBe(PostModel.body);
    })

    it("Debería dar error si no encuentra Post", async () => {
        const res = await request(app).get("/title/titulorandom")
        expect(res.status).toBe(404);
        expect(res.body).toEqual({"Message": "Post no encontrado"})
    })
});