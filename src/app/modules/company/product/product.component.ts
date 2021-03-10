import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private gridApi;
  private gridColumnApi;

  public columnDefs;
  public defaultColDef;
  public rowData;

  constructor() { 
    this.columnDefs = [
      {
        field: 'Item',
        headerName: 'Product',
        checkboxSelection: true,
        width: 250,
        minWidth: 200,
        maxWidth:350,
      },
      {
        field: 'Amount',
        headerName: 'Amount',
        width: 200,
        minWidth: 150,
        maxWidth:250,
      },
      {
        field: 'Date',
        headerName: 'Date',
        width: 200,
        minWidth: 150,
        maxWidth:250,
      },
      {
        field: 'Last',
        headerName: 'Last Updated',
        width: 200,
        minWidth: 150,
        maxWidth:250,
      },
    ];

    this.rowData = [
      {
        Item: 'Egg',
        Amount: '10',
        Date: '2021-08-08',
        Last: '2021-08-05',
      },
      {
        Item: 'Walmart free-run eggs 16pack',
        Amount: '20',
        Date: '2021-08-08',
        Last: '2021-08-05',
      }
    ];

    this.defaultColDef = { resizable: true, sortable: true, filter: true, editable: true, };
  }


  ngOnInit(): void {
  }

}
