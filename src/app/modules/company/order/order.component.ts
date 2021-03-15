import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Builder } from '../../../shared/services/component-builder';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  errorMessage: string;
  private componentBuilder: Builder;
  order: Builder[];

  orderForm = this.formBuilder.group({
    company: ['', Validators.required],
    amount: ['', Validators.required],
    startDate: ['', Validators.required],
    description: ['', Validators.required],
    status: ['', Validators.required],
    endDate: ['', Validators.required],
    reference: ['', Validators.required],
  });
  
  closeResult: string;
  deleteId: string;
  
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private firebase: FirestoreService,
  ) {}

  ngOnInit(): void {
    this.errorMessage = '';
    this.componentBuilder = new Builder();
  }

  onSubmit(): void {
    const order = this.componentBuilder.setId("")
                    .setItemName(this.orderForm.controls.company.value)
                    .setNumber(this.orderForm.controls.amount.value)
                    .setStartDate(this.orderForm.controls.startDate.value)
                    .setDescription(this.orderForm.controls.description.value)
                    .setStatus(this.orderForm.controls.status.value)
                    .setEndDate(this.orderForm.controls.endDate.value)
                    .setReference(this.orderForm.controls.reference.value).createComponent();
                    console.log(order);
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
