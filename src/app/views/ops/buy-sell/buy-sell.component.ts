import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { el } from 'date-fns/locale';
import { CountryISO, NgxIntlTelInputComponent, PhoneNumberFormat, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';
import { Customer } from 'src/app/shared/models/customer';
import { OperationConfig, OperationType } from 'src/app/shared/models/operation';
import { Wallet, TypeWallet } from 'src/app/shared/models/wallet';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { OperationService } from 'src/app/shared/services/operations.service';
import { WalletService } from 'src/app/shared/services/wallet.service';

@Component({
  selector: 'app-buy-sell',
  templateUrl: './buy-sell.component.html',
  styleUrls: ['./buy-sell.component.scss']
})
export class BuySellComponent implements OnInit {

  //Phone Intl
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.Mali];
  onlyCountries: CountryISO[] = [CountryISO.Mali];

  //Page Form
  opsForm: FormGroup;
  defaultCurrency;
  wallets: Wallet[];
  defaultWallet: Wallet;
  customer: Customer;

  loading: boolean;
  loadingText: string;

  submitted = false;

  confirmResut;

  @ViewChild('successModal') successModal: ElementRef;
  @ViewChild('failedModal') failedModal: ElementRef;

  config: OperationConfig;
  
  constructor(
    private modalService: NgbModal,
    private operationService: OperationService,
    private walletService: WalletService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private customerService: CustomerService,
  ) { }

  ngAfterViewInit() {

  }

  ngOnInit(): void {
    this.config = new OperationConfig;
    this.defaultWallet = new Wallet;
    this.operationService.getConfig(OperationType.DEPOSIT)
      .subscribe(
        (config: OperationConfig) => {
        this.config = config;
        this.defaultCurrency = config.mainCurrencyIso;},

        (error) => {
          this.alertService.error("Service Indisponible.");
          this.loading = false;
        }
      );

    this.walletService.findMyWallets().
    subscribe((w: Wallet[]) => {
      this.wallets = w;
      this.defaultWallet = w[0];
      for (let i = 0; i < w.length ; i++){
        if(w[i].type == TypeWallet.PRINCIPAL){
          this.defaultWallet = w[i];
        }
      }
    });

    this.opsForm = this.fb.group({
      receiverMobile: [undefined, Validators.required],
      sendingAmount: ['', Validators.required]
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.opsForm.controls; }

  switchCurrency(newCurrency){
    this.defaultCurrency = newCurrency;
  }

  switchWallet(newWallet){
    this.defaultWallet = newWallet;
  }

  confirm(content) {

    if (this.opsForm.invalid) {
      this.alertService.error('Valeur incorrect !');

      return;
    }

    let mobile = this.opsForm.get('receiverMobile').value.e164Number.replace('+', '');

    this.customerService.findByMobileNumber(mobile)
    .subscribe((data: Customer) =>{
      this.customer = data;
    })

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    .result.then((result) => {
      this.confirmResut = `Closed with: ${result}`;

      if(`${result}` == 'OK'){
        this.openSuccessModal();
      }
      else{
        this.openFailedModal()
      }

      console.log(this.confirmResut);
    }, (reason) => {

      this.openFailedModal()
    });
  }

  openSuccessModal(){
    this.modalService.open(this.successModal, { ariaLabelledBy: 'modal-basic-title' })
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

  submit(){
    this.submitted = true;
        // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.opsForm.invalid) {
      return;
    }
    this.loading = true;
    this.loadingText = 'Sigining in...';
  }
}
