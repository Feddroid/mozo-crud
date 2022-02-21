import React from 'react';
import { Link } from "react-router-dom";

class ListarOrdenes extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    state = { 
        datosCargados:false,
        ordenes:[],
        idOrden: "" 
    }
    
    borrarOrden = (id) => {        
        console.log("Borrando orden...");
        
        fetch("https://restaurante-mozo-crud.herokuapp.com/api/borrarOrden/", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({id:id})
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            // console.log(datosRespuesta)
            this.getDatos()
        })
        .catch(console.log)
    }

    getDatos(){
        console.log("Listando ordenes...");

        fetch("https://restaurante-mozo-crud.herokuapp.com/api/getOrdenes/")
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{

            // console.log(datosRespuesta)
            this.setState({datosCargados:true, ordenes:datosRespuesta})
        })
        .catch(console.log)
    }

    componentDidMount(){
        this.getDatos();
    }

    render() { 
        const{datosCargados, ordenes} = this.state

        if(!datosCargados){return(<div>Loading... </div>)}

        return ( 
            
        <div className="card">
            <div className="card-header text-center">
                {/* <Link type="button" className="btn btn-info me-1" to={"/"}>Listar Ordenes</Link> */}
                <Link type="button" className="btn btn-info ms-1" to={"/crear"}>Crear Orden</Link>
            </div>
            <div className="card-body">
            <h4>Listar Ordenes</h4>
                <table className="table table-striped table-bordered text-center">
                    <thead>
                        <tr>
                            <th>Nº Orden</th>
                            <th>Mesa</th>
                            <th>Menú</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        { ordenes.map(
                            (orden)=>(                        
                                <tr key={orden.id_orden}>
                                    <td>{orden.id_orden}</td>
                                    <td>{orden.nom_mesa}</td>
                                    <td>{orden.nom_menu}</td>
                                    <td>{orden.cantidad}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="">
                                            <Link type="button" className="btn btn-primary me-1" to={"/editar/"+orden.id_orden} >Editar</Link>
                                            <button type="button" className="btn btn-danger ms-1" onClick={()=>this.borrarOrden(orden.id_orden)} 
                                                name="idOrden" id='idOrden' >Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table> 

            </div>
        </div>

        );
    }
}
 
export default ListarOrdenes;