import React, { Component } from "react";

import "react-data-components/css/table-twbs.css";

class DataTables extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  hacerClick = event => {
    alert(event);
  };

  selectRow = row => {
    this.setState({ selected: row.id });
  };

  buildRowOptions = rows => {
    return {
      onClick: function(row) {
        console.log(row.currentTarget.cells[0].firstChild.data);
      }
    };
  };

  render() {
    var DataTable = require("react-data-components").DataTable;

    var columns = [
      { title: "Name", prop: "name" },
      { title: "City", prop: "city" },
      { title: "Address", prop: "address" },
      { title: "Phone", prop: "phone" }
    ];
    var data = [
      {
        name: "silicon",
        city:  'Ciudad',
        address: "address value",
        phone: "phone value"
      },
      {
        name: "name value",
        city: "city value",
        address: "address value",
        phone: "campo 2"
      },
      {
        name: "capo",
        city: "city value",
        address: "address value",
        phone: "phone value"
      },
      {
        name: "name value",
        city: "city value",
        address: "address value",
        phone: "phone value"
      },
      {
        name: "name value",
        city: "city value",
        address: "address value",
        phone: "phone value"
      }
      // It also supports arrays
      // [ 'name value', 'city value', 'address value', 'phone value' ]
    ];
    return (
      <DataTable
        className="table table-hover"
        keys="name"
        columns={columns}
        initialData={data}
        initialPageLength={5}
        initialSortBy={{ prop: "city", order: "descending" }}
        buildRowOptions={this.buildRowOptions}
      />
    );
  }
}

export default DataTables;
