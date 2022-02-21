import React from 'react';
import { Link } from "react-router-dom";

class EditarOrden extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    state = { 
        datosCargados:false,
        orden: "",
        MesasSet:[],
        menuItemsSet:[],
        MesasSelected: "",
        menuItemSelected: "",
        cantidad: "", 
        alertaMesa:"",
        alertaMenu:"",
        alertaCantidad: ""
     }

    getDatosMesas(){
        fetch("https://restaurante-mozo-crud.herokuapp.com/api/getDatosMesas/")
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            // console.log(datosRespuesta)
            this.setState({datosMenuCargados:true, MesasSet:datosRespuesta})               
        })
        .catch(console.log)
    }
    
    getDatosMenus(){
        fetch("https://restaurante-mozo-crud.herokuapp.com/api/getDatosMenu/")
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            // console.log(datosRespuesta)
            this.setState({datosMenuCargados:true, menuItemsSet:datosRespuesta})            
        })
        .catch(console.log)
    }
    
    editarOrden(){
        fetch("https://restaurante-mozo-crud.herokuapp.com/api/getEditarOrden", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({id:this.props.match.params.id})
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            // console.log(datosRespuesta[0])
            this.setState({datosCargados:true, orden:datosRespuesta[0]})
        })
        .catch(console.log)
    }

    enviarData = (e) =>{
        e.preventDefault();
        console.log("Editando orden...");

        const {MesasSelected, menuItemSelected, cantidad } = this.state                
        var dataEnvio = {id:this.props.match.params.id, mesa:MesasSelected, menu:menuItemSelected, cantidad:cantidad}
        
        if (MesasSelected === "" && menuItemSelected === "" && cantidad === "") {
            this.props.history.push("/")
            // console.log(this.state.orden.id_mesa);
            
        }else{            
            if( MesasSelected === "n"){
                this.setState({alertaMesa:"* obligatorio mesa"})     
            }else if( menuItemSelected === "n"){
                this.setState({alertaMenu:"* obligatorio menú"})     
            }else if( cantidad === "0"){
                this.setState({alertaCantidad:"* obligatorio cantidad"})     
            }else{
                fetch("https://restaurante-mozo-crud.herokuapp.com/api/editarOrden", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify(dataEnvio)
                })
                .then(respuesta=>respuesta.json())
                .then((datosRespuesta)=>{
                    
                    // console.log(datosRespuesta)
                    this.props.history.push("/")
                    
                })
                .catch(console.log)   
            }
                  
        }
    }

    cambioValor = (e) =>{         
        const state = this.state;
        state[e.target.name] = e.target.value
        this.setState({state})
    }

    componentDidMount(){
        this.getDatosMesas();
        this.getDatosMenus(); 
        this.editarOrden();
    }

    render() { 
        const{datosCargados, orden} = this.state

        if(!datosCargados && !orden){return(<div>Loading... </div>)}

        return ( 
            
            <div className="card">
                <div className="card-header">
                    Editar Orden 
                </div>
                <div className="card-body">
                <form onSubmit={this.enviarData}>
                    <div className="form-group">
                    <label htmlFor="">Nº de orden</label>
                      <input type="text" readOnly className="form-control" defaultValue={orden.id} name="" id="" aria-describedby="helpId" placeholder="" onChange={this.cambioValor}/>                      
                    </div>
                    <div className="form-group my-4">
                        <label htmlFor="">Mesas *</label>
                        <select className="form-select" name="MesasSelected" id="MesasSelected" 
                            aria-label="Default select example" defaultValue={orden.id_mesa} onChange={this.cambioValor}>
                            <option value="n">-- Seleccionar Mesa --</option>
                            {this.state.MesasSet.map(el=>(
                                <option value={el.id} key={el.id} >{el.nombre}</option>
                                )
                            )}
                        </select>
                        <small id="helpId" className="text-muted">{this.state.alertaMesa}</small>
                    </div>

                    <div className="form-group my-4">
                        <label htmlFor="">Menús *</label>
                        <select className="form-select" name="menuItemSelected" id="menuItemSelected" 
                            aria-label="Default select example" defaultValue={orden.id_menu} onChange={this.cambioValor}>
                            <option value="n">-- Seleccionar Menú --</option>
                            {this.state.menuItemsSet.map(el=>(
                                <option value={el.id} key={el.id}>{el.nombre}</option>
                                )
                            )}
                        </select>
                        <small id="helpId" className="text-muted">{this.state.alertaMenu}</small>
                    </div>

                    <div className="form-group my-4">
                        <label htmlFor="">Cantidad *</label>
                        <input type="number" name="cantidad" id="cantidad" defaultValue={orden.cantidad} onChange={this.cambioValor} className="form-control" placeholder="" aria-describedby="helpId" required />
                        <small id="helpId" className="text-muted">{this.state.alertaCantidad}</small>
                    </div>                    
                    
                    <div className="btn-group" role="group" aria-label="">
                        <button type="submit" className="btn btn-success me-1">Editar</button>
                        <Link type="button" className="btn btn-secondary ms-1" to={"/"}>Cancelar</Link>
                    </div>
                </form>
                </div>
                <div className="card-footer text-muted">
                    <Link type="button" className="btn btn-dark ms-1" to={"/"}> &lt; Regresar </Link>
                </div>
            </div>
         );
    }
}
 
export default EditarOrden;