import { Component, OnInit, ViewChild } from '@angular/core';
//import { AgGridAngular } from "ag-grid-angular";

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {

  private gridApi;
  private gridColumnApi;

  public columnDefs;
  public defaultColDef;
  public rowData;

  constructor() {
    this.columnDefs = [
      { 
        headerName: 'Invoice', 
        field: 'Invoice',  
        checkboxSelection: true ,
        width: 150,
        minWidth: 100,
        maxWidth:200,
      },
      { 
        headerName: 'Paying to', 
        field: 'Vendor', 
        width: 250,
        minWidth: 200,
        maxWidth: 300,
      },
      { 
        headerName: 'Value', 
        field: 'Value', 
        width: 200,
        minWidth: 150,
        maxWidth: 250,
      },
      { 
        headerName: 'Invoice date', 
        field: 'Date', 
        width: 200,
        minWidth: 150,
        maxWidth: 250,
      },
      { 
        headerName: 'Payment due', 
        field: 'Deadline', 
        width: 200,
        minWidth: 150,
        maxWidth: 250,
      },
    ];

  this.rowData = [
      { 
        Invoice: '1234567', 
        Vendor: 'Test Company', 
        Value:'220.98', 
        Date:'2021-03-05', 
        Deadline: ' 2021-04-04',
      },
      { Invoice: '1234567', 
        Vendor: 'Test Company', 
        Value:'100.98', 
        Date:'2021-03-05', 
        Deadline: ' 2021-04-04',
      },
    ];

    this.defaultColDef = { resizable: true, sortable: true, filter: true, editable: true, };
  }

  ngOnInit(): void {

  }
}
