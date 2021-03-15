import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Builder } from '../../../shared/services/component-builder';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {
  errorMessage: string;
  private componentBuilder: Builder;
  bill: Builder[];

  billForm = this.formBuilder.group({
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
    private firebase: FirebaseService,
  ) {}

  ngOnInit(): void {
    this.errorMessage = '';
    this.componentBuilder = new Builder();
  }

  onSubmit(): void {
    const bill = this.componentBuilder.setId("")
                    .setItemName(this.billForm.controls.company.value)
                    .setNumber(this.billForm.controls.amount.value)
                    .setStartDate(this.billForm.controls.startDate.value)
                    .setDescription(this.billForm.controls.description.value)
                    .setStatus(this.billForm.controls.status.value)
                    .setEndDate(this.billForm.controls.endDate.value)
                    .setReference(this.billForm.controls.reference.value).createComponent();
                    console.log(bill);
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
