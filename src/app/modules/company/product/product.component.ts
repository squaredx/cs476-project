import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Builder } from '../../../shared/services/component-builder';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  errorMessage: string;
  private componentBuilder: Builder;
  inventory: Builder[];

  productForm = this.formBuilder.group({
    item: ['', Validators.required],
    number: ['', Validators.required],
    date: ['', Validators.required],
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
    const product = this.componentBuilder.setId("")
                    .setItemName(this.productForm.controls.item.value)
                    .setNumber(this.productForm.controls.number.value)
                    .setStartDate(this.productForm.controls.date.value)
                    .setDescription(this.productForm.controls.description.value)
                    .setStatus(this.productForm.controls.status.value)
                    .setEndDate("")
                    .setReference("").createComponent();
                    console.log(product);
  }

  openDelete(targetModel, product: Builder){
    this.deleteId = product.getId();
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
