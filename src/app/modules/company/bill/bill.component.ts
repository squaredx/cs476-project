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
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {
  errorMessage: string;
  private componentBuilder: Builder;
  bill: Builder[];

  billForm = this.formBuilder.group({
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
    //create component builder
    this.componentBuilder = new Builder();
    //get id parameter from route
    this.companyId = this.route.snapshot.paramMap.get('id');

    //create an observable of the company bill collection
    this.listData = this.fs.list(this.companyId, 'bills');
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

    //error checking here
    if(this.componentId.value != 0) {
      // update (need to set id)
      const bill = this.componentBuilder
                    .setId(this.componentId.value)
                    .setItemName(this.company.value)
                    .setNumber(this.amount.value)
                    .setStartDate(this.startDate.value)
                    .setDescription(this.description.value)
                    .setStatus(this.status.value)
                    .setEndDate(this.endDate.value)
                    .setReference(this.reference.value).createComponent();
      
      this.fs.update(this.companyId, 'bills', bill).then((res) => {
        this.toast.success('Bill updated successfully!');
      })
      .catch((err) => {
        this.toast.error(`ERROR: ${err.message}`);
      });
    }
    else {
      // create (doesnt need id)
      const bill = this.componentBuilder
                    .setItemName(this.company.value)
                    .setNumber(this.amount.value)
                    .setStartDate(this.startDate.value)
                    .setDescription(this.description.value)
                    .setStatus(this.status.value)
                    .setEndDate(this.endDate.value)
                    .setReference(this.reference.value).createComponent();
      this.fs.add(this.companyId, 'bills', bill).then((res) => {
        this.toast.success('Bill created successfully!');
      })
      .catch((err) => {
        this.toast.error(`ERROR: ${err.message}`);
      });
    }
    this.billForm.reset();
  }

  delete(component: IComponent){
    this.fs.delete(this.companyId, 'bills', component.id).then((res) => {
      this.toast.success('Bill deleted successfully!');
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
    return this.billForm.controls.company;
  }

  get amount() {
    return this.billForm.controls.amount;
  }

  get startDate() {
    return this.billForm.controls.startDate;
  }

  get endDate() {
    return this.billForm.controls.endDate;
  }

  get description() {
    return this.billForm.controls.description;
  }

  get status() {
    return this.billForm.controls.status;
  }

  get reference() {
    return this.billForm.controls.reference;
  }

  get componentId() {
    return this.billForm.controls.componentId;
  }

}
