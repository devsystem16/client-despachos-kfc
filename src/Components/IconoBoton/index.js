import React, { Component } from 'react';
import Motorcycle from "@material-ui/icons/Motorcycle";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import Commute from "@material-ui/icons/Commute";

class IconoBoton extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        if (this.props.opcion === "Por Asignar")
            return (<Motorcycle fontSize="small" />);

        else if (this.props.opcion === "Asignado")
            return (<AssignmentInd fontSize="small" />);

        else if (this.props.opcion === "En Camino")
            return (<Commute fontSize="small" />);
    }
}

export default IconoBoton;