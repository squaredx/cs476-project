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
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  errorMessage: string;
  private componentBuilder: Builder;
  order: Builder[];

  orderForm = this.formBuilder.group({
    componentId: [''],
    company: ['', Validators.required],
    amount: ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
    startDate: ['', [Validators.required, DateValidator.dateVaidator]],
    description: ['', Validators.required],
    status: ['', Validators.required],
    endDate: ['', [Validators.required, DateValidator.dateVaidator]],
    reference: ['', Validators.required],
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
    this.listData = this.fs.list(this.companyId, 'orders');
  }

  onSubmit(): void {
    if (!this.company.value) {
      this.errorMessage = 'Please enter a company name';
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

    if (!this.endDate.value) {
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

    if (!this.reference.value) {
      this.errorMessage = 'Please enter a reference';
      return;
    }

    if(this.componentId.value != 0) {
      // update (need to set id)
      const order = this.componentBuilder
                    .setId(this.componentId.value)
                    .setItemName(this.company.value)
                    .setNumber(this.amount.value)
                    .setStartDate(this.startDate.value)
                    .setDescription(this.description.value)
                    .setStatus(this.status.value)
                    .setEndDate(this.endDate.value)
                    .setReference(this.reference.value).createComponent();
      
      this.fs.update(this.companyId, 'orders', order).then((res) => {
        this.toast.success('Order updated successfully!');
      })
      .catch((err) => {
        this.toast.error(`ERROR: ${err.message}`);
      });
    }
    else {
      // create (doesnt need id)
      const order = this.componentBuilder
                    .setItemName(this.company.value)
                    .setNumber(this.amount.value)
                    .setStartDate(this.startDate.value)
                    .setDescription(this.description.value)
                    .setStatus(this.status.value)
                    .setEndDate(this.endDate.value)
                    .setReference(this.reference.value).createComponent();
      this.fs.add(this.companyId, 'orders', order).then((res) => {
        this.toast.success('Order created successfully!');
      })
      .catch((err) => {
        this.toast.error(`ERROR: ${err.message}`);
      });
    }
    this.orderForm.reset();
  }

  delete(component: IComponent){
    this.fs.delete(this.companyId, 'orders', component.id).then((res) => {
      this.toast.success('Order deleted successfully!');
    })
    .catch((err) => {
      this.toast.error(`ERROR: ${err.message}`);
    });
  }

  open(content, component?: IComponent) { 
    if(component) {
      console.log(component);
      this.company.setValue(component.itemName);
      this.amount.setValue(component.number);
      this.startDate.setValue(component.startDate);
      this.endDate.setValue(component.endDate);
      this.description.setValue(component.description);
      this.status.setValue(component.status);
      this.reference.setValue(component.reference);
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

  get company() {
    return this.orderForm.controls.company;
  }

  get amount() {
    return this.orderForm.controls.amount;
  }

  get startDate() {
    return this.orderForm.controls.startDate;
  }

  get endDate() {
    return this.orderForm.controls.endDate;
  }

  get description() {
    return this.orderForm.controls.description;
  }

  get status() {
    return this.orderForm.controls.status;
  }

  get reference() {
    return this.orderForm.controls.reference;
  }

  get componentId() {
    return this.orderForm.controls.componentId;
  }
}
