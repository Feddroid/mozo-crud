import './App.css';

import Listar from "./componentes/ListarOrdenes";
import Editar from "./componentes/EditarOrden";
import Crear from "./componentes/CrearOrden";

// import { Link } from "react-router-dom";
// import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
          <div className="nav navbar-nav">
              {/* <Link className="nav-item nav-link active" to={"/"}>Inicio</Link>
              <Link className="nav-item nav-link" to={"/crear"}>Crear Orden</Link> */}
              {/* <Link className="nav-item nav-link" to={"/editar"}>Editar Orden</Link> */}
          </div>
      </nav>
    <div className="container mt-4">
      {/* <Routes> */}
        <Route path='/' exact component={Listar}/>
        <Route path='/crear' component={Crear}/>
        <Route path='/editar/:id' component={Editar}/>
      {/* </Routes> */}
    </div>
    </Router>
  );
}

export default App;
