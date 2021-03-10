import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  private gridApi;
  private gridColumnApi;

  public columnDefs;
  public defaultColDef;
  public rowData;
  
  constructor() { 
    this.columnDefs = [
      { 
        headerName: 'Order', 
        field: 'Order',  
        checkboxSelection: true ,
        width: 150,
        minWidth: 100,
        maxWidth:200,
      },
      { 
        headerName: 'Sending to', 
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
        headerName: 'Shipping Date', 
        field: 'Shipping', 
        width: 200,
        minWidth: 150,
        maxWidth: 250,
      },
    ];

  this.rowData = [
      { 
        Order: '1234567', 
        Vendor: 'Test Company', 
        Value:'220.98', 
        Date:'2021-03-05', 
        Shipping: ' 2021-04-04',
      },
      { Order: '1234567', 
        Vendor: 'Test Company', 
        Value:'100.98', 
        Date:'2021-03-05', 
        Shipping: ' 2021-04-04',
      },
    ];

    this.defaultColDef = { resizable: true, sortable: true, filter: true, editable: true, };
  }

  ngOnInit(): void {
  }

}
