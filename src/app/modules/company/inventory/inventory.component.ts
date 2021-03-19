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
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  errorMessage: string;
  private componentBuilder: Builder;

  inventoryForm = this.formBuilder.group({
    componentId: [''],
    item: ['', Validators.required],
    amount: ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1})?$")]],
    startDate: ['', [Validators.required, DateValidator.dateVaidator]],
    description: ['', Validators.required],
    status: ['', Validators.required]
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
    this.componentBuilder = new Builder();
    this.companyId = this.route.snapshot.paramMap.get('id');
    this.listData = this.fs.list(this.companyId, 'inventory');
    // get the company information
    this.companyDetails = this.fs.getCompanyDetails(this.companyId);
  }

  onSubmit(): void {
    // chec if company set
    if (!this.item.value) {
      this.errorMessage = 'Please enter a product name';
      return;
    }

    // check if amount set
    if (!this.amount.value) {
      this.errorMessage = 'Please enter an amount';
      return;
    }

    // check if startDate set
    if (!this.startDate.value) {
      this.errorMessage = 'Please enter a date';
      return;
    }

    // check if description set
    if (!this.description.value) {
      this.errorMessage = 'Please enter a description';
      return;
    }

    // check if status is set
    if (!this.status.value) {
      this.errorMessage = 'Please enter a status';
      return;
    }

    // check if we are updating or creating new record
    if(this.componentId.value !== 0) {
      // update (need to set id)
      const inventory = this.componentBuilder
                    .setId(this.componentId.value)
                    .setItemName(this.item.value)
                    .setNumber(this.amount.value)
                    .setStartDate(this.startDate.value)
                    .setDescription(this.description.value)
                    .setStatus(this.status.value).createComponent();

      // update the component using firebase service
      this.fs.update(this.companyId, 'inventory', inventory).then((res) => {
        this.toast.success('Inventory updated successfully!');
      })
      .catch((err) => {
        this.toast.error(`ERROR: ${err.message}`);
      });
    }
    else {
      // create (doesnt need id)
      const inventory = this.componentBuilder
                    .setItemName(this.item.value)
                    .setNumber(this.amount.value)
                    .setStartDate(this.startDate.value)
                    .setDescription(this.description.value)
                    .setStatus(this.status.value).createComponent();
      // update the component using firebase service
      this.fs.add(this.companyId, 'inventory', inventory).then((res) => {
        this.toast.success('Inventory created successfully!');
      })
      .catch((err) => {
        this.toast.error(`ERROR: ${err.message}`);
      });
    }
    this.inventoryForm.reset();
  }

  delete(component: IComponent): any {
    this.fs.delete(this.companyId, 'inventory', component.id).then((res) => {
      this.toast.success('Inventory deleted successfully!');
    })
    .catch((err) => {
      this.toast.error(`ERROR: ${err.message}`);
    });
  }

  open(content, component?: IComponent): any {
    if (component) {
      console.log(component);
      this.item.setValue(component.itemName);
      this.amount.setValue(component.number);
      this.startDate.setValue(moment(component.startDate.toDate()).format('YYYY-MM-DD'));
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

  get item(): AbstractControl {
    return this.inventoryForm.controls.item;
  }

  get amount(): AbstractControl {
    return this.inventoryForm.controls.amount;
  }

  get startDate(): AbstractControl {
    return this.inventoryForm.controls.startDate;
  }

  get description(): AbstractControl {
    return this.inventoryForm.controls.description;
  }

  get status(): AbstractControl {
    return this.inventoryForm.controls.status;
  }

  get componentId(): AbstractControl {
    return this.inventoryForm.controls.componentId;
  }
}
