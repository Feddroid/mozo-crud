const express = require('express');
const bd = require("./config/bd");
const cors = require("cors");

const app = express();
const path = require("path");

const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

app.get("/api/getDatosMesas", async (req, res) => {
    const sqlGetDatosMenu = await `select * from tb_mesa`
    bd.query(sqlGetDatosMenu, (err, result)=>{
            if(err){
                console.log(err);
            }
            res.send(result);
        })
})

app.get("/api/getDatosMenu", async (req, res) => {
    const sqlGetDatosMenu = await `select * from tb_menu`
    bd.query(sqlGetDatosMenu, (err, result)=>{
            if(err){
                console.log(err);
            }
            res.send(result);
        })
})

app.get("/api/getOrdenes", (req, res) => {
    const sqlGetOrdenes = `select o.id id_orden, men.nombre nom_menu, mes.nombre nom_mesa, o.cantidad
                                from tb_ordenes o 
                                inner join tb_menu men on men.id = o.id_menu
                                inner join tb_mesa mes on mes.id = o.id_mesa
                                order by o.id`
    bd.query(sqlGetOrdenes, (err, result)=>{
            if(err){
                console.log(err);
            }
            res.send(result);
        })
})

app.post("/api/crearOrden", (req, res) => { 
    const mesa = req.body.mesa;
    const menu = req.body.menu;
    const cantidad = req.body.cantidad;
    console.log("creando! "+mesa+" - "+menu);

    const sqlCrearOrden = "insert into tb_ordenes (id_mesa, id_menu, cantidad) values (?,?,?)"
    bd.query(sqlCrearOrden, 
        [mesa,menu,cantidad],
        (err, result)=>{
            if(err){
                console.log(err);
            }
            console.log(result);
            console.log("creada");
            res.send(result)

        })
})

app.post("/api/getEditarOrden", async (req, res) => { 
    const id = req.body.id;
    console.log("editando! "+id);

    const sqlBorrarOrden = await `select * from tb_ordenes where id = ${id}`
    bd.query(sqlBorrarOrden, 
            (err, result)=>{
            if(err){
                console.log(err);
            }
            console.log(result);
            console.log("orden editada");
            res.send(result)
        })
})

app.post("/api/editarOrden", (req, res) => { 
    const id = req.body.id;
    const mesa = req.body.mesa
    const menu = req.body.menu
    const cantidad = req.body.cantidad;
    var update_values = [];

    if(mesa != ""){
        update_values.push(`id_mesa=${mesa}`);
    }

    if(menu){
        update_values.push(`id_menu=${menu}`);
    }

    if(cantidad != ""){
        update_values.push(`cantidad="${cantidad}"`);
    }
    
    const sqlEditarOrden = `update tb_ordenes set ${update_values} where id = ${id}`
    bd.query(sqlEditarOrden, 
            (err, result)=>{
            if(err){
                console.log(err);
            }
            console.log(result);
            console.log("orden editada");
            res.send(result)
        })
})

app.post("/api/borrarOrden", (req, res) => { 
    const id = req.body.id;
    console.log("borrando! "+id);

    const sqlBorrarOrden = `delete from tb_ordenes where id = ${id}`
    bd.query(sqlBorrarOrden, 
            (err, result)=>{
            if(err){
                console.log(err);
            }
            console.log(result);
            console.log("orden borrada");
            res.send(result)
        })
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
    app.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'), err => {
            if (err) {
              res.status(500).send(err);
            }
          })
    })
}

app.listen(PORT, () => {
    console.log(`corriendo en ${PORT}`);
})