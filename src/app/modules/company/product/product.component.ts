import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Builder } from '../../../shared/services/component-builder';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { DateValidator } from '../../../shared/validators/date.validator';
import { IComponent } from 'src/app/shared/interfaces/component';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

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
    componentId: [''],
    item: ['', Validators.required],
    number: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    date: ['', [Validators.required, DateValidator.dateVaidator]],
    description: ['', Validators.required],
    status: ['', Validators.required]
  });

  closeResult: string;
  deleteId: string;

  listData: Observable<IComponent[]>;
  companyId: string;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private fs: FirestoreService,
    private route: ActivatedRoute,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.errorMessage = '';
    this.componentBuilder = new Builder();
    this.companyId = this.route.snapshot.paramMap.get('id');
    this.listData = this.fs.list(this.companyId, 'products');
  }

  onSubmit(): void {
    if (!this.item.value) {
      this.errorMessage = 'Please enter a product name';
      return;
    }

    if (!this.amount.value) {
      this.errorMessage = 'Please enter an amount';
      return;
    }

    if (!this.startDate.value) {
      this.errorMessage = 'Please enter a date';
      return;
    }

    if (!this.description.value) {
      this.errorMessage = 'Please enter a description';
      return;
    }

    if (!this.status.value) {
      this.errorMessage = 'Please enter a status';
      return;
    }

    if(this.componentId.value != 0) {
      // update (need to set id)
      const product = this.componentBuilder
                    .setId(this.componentId.value)
                    .setItemName(this.item.value)
                    .setNumber(this.amount.value)
                    .setStartDate(this.startDate.value)
                    .setDescription(this.description.value)
                    .setStatus(this.status.value).createComponent();
      
      this.fs.update(this.companyId, 'products', product).then((res) => {
        this.toast.success('Product updated successfully!');
      })
      .catch((err) => {
        this.toast.error(`ERROR: ${err.message}`);
      });
    }
    else {
      // create (doesnt need id)
      const product = this.componentBuilder
                    .setItemName(this.item.value)
                    .setNumber(this.amount.value)
                    .setStartDate(this.startDate.value)
                    .setDescription(this.description.value)
                    .setStatus(this.status.value).createComponent();
      this.fs.add(this.companyId, 'products', product).then((res) => {
        this.toast.success('Product created successfully!');
      })
      .catch((err) => {
        this.toast.error(`ERROR: ${err.message}`);
      });
    }
    this.productForm.reset();

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

  delete(component: IComponent){
    this.fs.delete(this.companyId, 'products', component.id).then((res) => {
      this.toast.success('Product deleted successfully!');
    })
    .catch((err) => {
      this.toast.error(`ERROR: ${err.message}`);
    });
  }

  open(content, component?: IComponent) { 
    if(component) {
      console.log(component);
      this.item.setValue(component.itemName);
      this.amount.setValue(component.number);
      this.startDate.setValue(component.startDate);
      this.description.setValue(component.description);
      this.status.setValue(component.status);
      this.componentId.setValue(component.id);
    }
    else {
      this.componentId.setValue(0);
    }

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

  get item() {
    return this.productForm.controls.item;
  }

  get amount() {
    return this.productForm.controls.number;
  }

  get startDate() {
    return this.productForm.controls.date;
  }

  get description() {
    return this.productForm.controls.description;
  }

  get status() {
    return this.productForm.controls.status;
  }

  get componentId() {
    return this.productForm.controls.componentId;
  }
}
