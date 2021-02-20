import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { el } from 'date-fns/locale';
import { CountryISO, PhoneNumberFormat, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';

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

  confirmResut;

  @ViewChild('successModal') successModal: ElementRef;
  @ViewChild('failedModal') failedModal: ElementRef;
  
  constructor(
    private modalService: NgbModal
  ) { }

  ngAfterViewInit() {

  }

  ngOnInit(): void {
  }

  confirm(content) {
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

}
