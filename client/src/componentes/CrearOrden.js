import React from 'react';
import { Link } from "react-router-dom";

class CrearOrden extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    state = {
        datosMenuCargados:false,
        MesasSet:[],
        menuItemsSet:[],
        MesasSelected: "",
        menuItemSelected: "",
        cantidad: "",
        alertaMesa:"",
        alertaMenu:"",
        alertaCantidad:""
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
    
    componentDidMount(){
        this.getDatosMesas();
        this.getDatosMenus();        
    }
    
    cambioValor = (e) =>{
        const state = this.state;
        state[e.target.name] = e.target.value
        this.setState({state})
    }
    
    enviarData = (e) =>{
        e.preventDefault();
        console.log("Creando orden...");
        
        const {MesasSelected, menuItemSelected, cantidad } = this.state                
        var dataEnvio = {mesa:MesasSelected, menu:menuItemSelected, cantidad:cantidad}

        if (MesasSelected === "" && menuItemSelected === "" && cantidad === "") {
            this.setState({alertaMesa:"* obligatorio mesa"})     
            this.setState({alertaMenu:"* obligatorio menú"})     
            this.setState({alertaCantidad:"* obligatorio cantidad"})                 
        }else{            
            if( MesasSelected === "n" || MesasSelected === "" ){
                this.setState({alertaMesa:"* obligatorio mesa"})     
            }else if( menuItemSelected === "n" || menuItemSelected === ""){
                this.setState({alertaMenu:"* obligatorio menú"})     
            }else if( cantidad === "0" || cantidad === ""){
                this.setState({alertaCantidad:"* obligatorio cantidad"})     
            }else{
        
                fetch("https://restaurante-mozo-crud.herokuapp.com/api/crearOrden", {
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
    
    render() { 
        
        const {cantidad } = this.state

        return (  
            <div className="card">
                <div className="card-header">
                    Crear Orden
                </div>
                <div className="card-body">
                <form onSubmit={this.enviarData}>
                    <div className="form-group my-4">
                        <label htmlFor="">Mesas *</label>
                        <select className="form-select" name="MesasSelected" id="MesasSelected" aria-label="Default select example" onChange={this.cambioValor}>
                            <option value="n">-- Seleccionar Mesa --</option>
                            {this.state.MesasSet.map(el=>(
                                <option value={el.id} key={el.id} >{el.nombre}</option>
                                )
                            )}
                        </select>
                        <small id="helpId" className="text-danger">{this.state.alertaMesa}</small>
                    </div>

                    <div className="form-group my-4">
                        <label htmlFor="">Menús *</label>
                        <select className="form-select" name="menuItemSelected" id="menuItemSelected" aria-label="Default select example" onChange={this.cambioValor}>
                            <option value="n">-- Seleccionar Item --</option>
                            {this.state.menuItemsSet.map(el=>(
                                <option value={el.id} key={el.id} >{el.nombre}</option>
                                )
                            )}
                        </select>
                        <small id="helpId" className="text-danger">{this.state.alertaMenu}</small>
                    </div>

                    <div className="form-group my-4">
                        <label htmlFor="">Cantidad *</label>
                        <input type="number" name="cantidad" id="cantidad" value={cantidad} onChange={this.cambioValor} className="form-control" placeholder="" aria-describedby="helpId" />
                        <small id="helpId" className="text-danger">{this.state.alertaCantidad}</small>
                    </div>
                    
                    <div className="btn-group" role="group" aria-label="">
                        <button type="submit" className="btn btn-success me-1">Crear</button>
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

export default CrearOrden;