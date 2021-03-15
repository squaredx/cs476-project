import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Builder } from '../../../shared/services/component-builder';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  errorMessage: string;
  private componentBuilder: Builder;
  inventory: Builder[];

  inventoryForm = this.formBuilder.group({
    item: ['', Validators.required],
    amount: ['', Validators.required],
    startDate: ['', Validators.required],
    description: ['', Validators.required],
    status: ['', Validators.required]
  });

  closeResult: string;
  deleteId: string;
  
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    ) {}

  ngOnInit(): void {
    this.errorMessage = '';
    this.componentBuilder = new Builder();
  }

  onSubmit(): void {
    const inventory = this.componentBuilder.setId("")
                    .setItemName(this.inventoryForm.controls.item.value)
                    .setNumber(this.inventoryForm.controls.amount.value)
                    .setStartDate(this.inventoryForm.controls.startDate.value)
                    .setDescription(this.inventoryForm.controls.description.value)
                    .setStatus(this.inventoryForm.controls.status.value)
                    .setEndDate("")
                    .setReference("").createComponent();
                    console.log(inventory);
  }

  openDelete(targetModel, inventory: Builder){
    this.deleteId = inventory.getId();
    this.modalService.open(targetModel, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  open(content) { 
    this.modalService.open(content, 
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => { 
      this.closeResult = `Closed with: ${result}`; 
    }, (reason) => { 
      this.closeResult =  
         `Dismissed ${this.getDismissReason(reason)}`; 
    }); 
  } 
  
  private getDismissReason(reason: any): string { 
    if (reason === ModalDismissReasons.ESC) { 
      return 'by pressing ESC'; 
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) { 
      return 'by clicking on a backdrop'; 
    } else { 
      return `with: ${reason}`; 
    } 
  } 

}
