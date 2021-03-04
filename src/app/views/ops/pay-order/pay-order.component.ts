import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { formatDate, Location } from '@angular/common';
import { OrderService } from 'src/app/shared/services/operations.service';
import { Order, PaymentMode } from 'src/app/shared/models/sendForm';
import { NationalIdType, PaymentForm } from 'src/app/shared/models/operation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from '@angular-material-extensions/select-country';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_DATE_FORMATS } from 'src/app/shared/models/constants';

@Component({
  selector: 'app-pay-order',
  templateUrl: './pay-order.component.html',
  styleUrls: ['./pay-order.component.scss'],
  animations: [SharedAnimations],
  providers: [

    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }

  ]
})
export class PayOrderComponent implements OnInit {

  @ViewChild('pinModal') pinModal: ElementRef;
  @ViewChild('successModal') successModal: ElementRef;
  @ViewChild('failedModal') failedModal: ElementRef;

  order: Order;
  orderState;

  idTypes = Object.keys(NationalIdType).filter(f => isNaN(Number(f)));
  idType: NationalIdType;
  idNumber: string;
  idExpiration: string;
  issuer: string;

  showBankDepositForm: boolean = false;

  paymentModes = Object.keys(PaymentMode).filter(f => isNaN(Number(f)));
  paymentMode: PaymentMode;

  payFormGroup: FormGroup;
  depositFormGroup: FormGroup;
  pinFormGroup: FormGroup;

  error: string;
  message: string;

  constructor(
    private location: Location,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.order = null;
    this.orderState  = this.location.getState();
    this.showBankDepositForm = false;
    if (this.orderState.id != null){
      this.orderService.findOrder(this.orderState.id).subscribe(
        (data: Order) =>{
          this.order = data;
        },
        (error) =>{
  
        }
      )
    }

    this.payFormGroup = this.formBuilder.group({
      countryInput: [undefined, Validators.required],
      idNumber:['', Validators.required],
      expiration: [undefined, Validators.required],
    });

    this.depositFormGroup = this.formBuilder.group({
      banName: [undefined, Validators.required],
      accountNumber:['', Validators.required],
      operationDate: [undefined, Validators.required],
      depositReference:[undefined, Validators.required]
    });

    this.pinFormGroup = this.formBuilder.group({
      pinCode: ['', Validators.required]
    });
  
  }

  switchDocument(item: NationalIdType){
    this.idType = item;
  }

  switchPaymentMode(item: PaymentMode){
    if(item+"" === 'BANK_DEPOSIT'){
      this.showBankDepositForm = true;
      console.log("true " + item);
    } else{
      this.showBankDepositForm = false;
      console.log("false " + item);
    }
    this.paymentMode = item;
  }

  confirm(){
    if(this.order?.pin){
      this.openPinModal();
    } else {
      this.submitPayment();
    }
  }

  confirmPinAndSubmit(){
    if(this.pinFormGroup.valid){
      this.submitPayment();
      this.modalService.dismissAll();
      return;
    }

    this.pinFormGroup.controls['pinCode'].setErrors({'error':true});
  }

  submitPayment(){
    let pForm = new PaymentForm();
    pForm.paymentMode = this.paymentMode;

    //Cash
    pForm.countryIso = this.payFormGroup.get('countryInput').value?.alpha2Code;
    pForm.nationalId = this.idType;
    pForm.idNumber = this.payFormGroup.get('idNumber').value;
    pForm.expirationDate = formatDate(this.payFormGroup.get('expiration').value, 'dd-MM-yyyy', 'en-US');

    //Bank Deposit
    pForm.operationDate = formatDate(this.depositFormGroup.get('operationDate').value, 'dd-MM-yyyy', 'en-US');
    pForm.bankName = this.depositFormGroup.get('banName').value;
    pForm.accountNumber = this.depositFormGroup.get('accountNumber').value;
    pForm.bankOperationRef = this.depositFormGroup.get('depositReference').value;

    pForm.pinCode = this.pinFormGroup.get('pinCode').value;

    this.orderService.payOrder(pForm).subscribe(
      (data: PaymentForm) => {
        if(data.hasError){
          this.openFailedModal();
        } else {
          this.openSuccessModal();
        }
      },
      (error) => {
        console.log('error response ' + error);
      }
    );
  }

  onCountrySelected(country: Country) {
  }

  openSuccessModal(){
    this.modalService.open(this.successModal, { ariaLabelledBy: 'modal-basic-title' })
    .result.then((result) => {
      
    }, (reason) => {

    });
  }

  openPinModal(){
    this.modalService.open(this.pinModal, { ariaLabelledBy: 'modal-basic-title' })
    .result.then((result) => {
      
    }, (reason) => {

    });
  }

  openFailedModal(){
    this.modalService.open(this.failedModal, { ariaLabelledBy: 'modal-basic-title' })
    .result.then((result) => {
      
    }, (reason) => {

    });
  }

}
