import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Builder } from '../../../shared/services/component-builder';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { DateValidator } from '../../../shared/validators/date.validator';
import { IComponent } from 'src/app/shared/interfaces/component';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import * as moment from 'moment';
import { ICompany } from 'src/app/shared/interfaces/company';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {
  errorMessage: string;
  private componentBuilder: Builder;

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
  companyDetails: Observable<ICompany>;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private fs: FirestoreService,
    private route: ActivatedRoute,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.errorMessage = '';
    // create component builder
    this.componentBuilder = new Builder();
    // get id parameter from route
    this.companyId = this.route.snapshot.paramMap.get('id');
    // create an observable of the company bill collection
    this.listData = this.fs.list(this.companyId, 'bills');
    // get the company information
    this.companyDetails = this.fs.getCompanyDetails(this.companyId);
  }

  onSubmit(): void {
    // check if company set
    if (!this.company.value) {
      this.errorMessage = 'Please enter a company name';
      return;
    }

    // check if amount is set
    if (!this.amount.value) {
      this.errorMessage = 'Please enter an amount';
      return;
    }

    // check if date is set
    if (!this.startDate.value) {
      this.errorMessage = 'Please enter a date';
      return;
    }

    // check if end date is set
    if (!this.endDate.value) {
      this.errorMessage = 'Please enter a date';
      return;
    }

    // check if description is set
    if (!this.description.value) {
      this.errorMessage = 'Please enter a description';
      return;
    }

    // check if status is set
    if (!this.status.value) {
      this.errorMessage = 'Please enter a status';
      return;
    }

    // check if reference is set
    if (!this.reference.value) {
      this.errorMessage = 'Please enter a reference';
      return;
    }

    // check if we are updating or creating new record
    if(this.componentId.value !== 0) {
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

      // update the component using firebase service
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

      // update the component using firebase service
      this.fs.add(this.companyId, 'bills', bill).then((res) => {
        this.toast.success('Bill created successfully!');
      })
      .catch((err) => {
        this.toast.error(`ERROR: ${err.message}`);
      });
    }
    this.billForm.reset();
  }

  delete(component: IComponent): any{
    this.fs.delete(this.companyId, 'bills', component.id).then((res) => {
      this.toast.success('Bill deleted successfully!');
    })
    .catch((err) => {
      this.toast.error(`ERROR: ${err.message}`);
    });
  }

  open(content, component?: IComponent): any { 
    if (component) {
      console.log(component);
      this.company.setValue(component.itemName);
      this.amount.setValue(component.number);
      this.startDate.setValue(moment(component.startDate.toDate()).format('YYYY-MM-DD'));
      this.endDate.setValue(moment(component.endDate.toDate()).format('YYYY-MM-DD'));
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

  get company(): AbstractControl {
    return this.billForm.controls.company;
  }

  get amount(): AbstractControl {
    return this.billForm.controls.amount;
  }

  get startDate(): AbstractControl {
    return this.billForm.controls.startDate;
  }

  get endDate(): AbstractControl {
    return this.billForm.controls.endDate;
  }

  get description(): AbstractControl {
    return this.billForm.controls.description;
  }

  get status(): AbstractControl {
    return this.billForm.controls.status;
  }

  get reference(): AbstractControl {
    return this.billForm.controls.reference;
  }

  get componentId(): AbstractControl {
    return this.billForm.controls.componentId;
  }
}
