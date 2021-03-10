import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  private gridApi;
  private gridColumnApi;

  public columnDefs;
  public defaultColDef;
  public rowData;
  private rowSelection;

  constructor() { 
    this.columnDefs = [
      {
        field: 'Item',
        headerName: 'Item',
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
    this.rowSelection = 'single';
  }

  onRemoveSelected() {
    var selectedData = this.gridApi.getSelectedRows();
    this.gridApi.applyTransaction({ remove: selectedData });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  ngOnInit(): void {
    
  }
}
