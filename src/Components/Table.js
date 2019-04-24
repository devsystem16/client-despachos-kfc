import React , {Component} from 'react';
import DataTable from 'react-data-table-component';
 

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }  ];
        const columns = [
          {
            name: 'Title',
            selector: 'title',
            sortable: true,
          },
          {
            name: 'Year',
            selector: 'year',
            sortable: true,
            right: true,
          },
        ];

        return (  
             <DataTable
            title="Arnold Movies"
            columns={columns}
            data={data}
          />);
    }
}
 
export default Table;