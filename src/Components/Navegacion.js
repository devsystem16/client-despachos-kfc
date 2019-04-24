import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Css/Navegacion.css";

const Navegacion = () => {
  return (
    <nav className="col-12 col-md-12">
      <Link to={"/"}>Home</Link>
      {/* <Link to={"/crear"}>Nuevo post</Link> */}
    </nav>
  );
};

export default Navegacion;
