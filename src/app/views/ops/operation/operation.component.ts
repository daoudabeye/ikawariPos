import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat, SearchCountryField, TooltipLabel } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {

  isCompleted: boolean;
  data: any = {
    email: ''
  };
  step2Form: FormGroup;

  


  //Phone Intl
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.Mali, CountryISO.Senegal, CountryISO.CôteDIvoire, CountryISO.Niger];
  onlyCountries: CountryISO[] = [CountryISO.Mali, CountryISO.Senegal, CountryISO.CôteDIvoire, CountryISO.Niger, CountryISO.France, CountryISO.UnitedStates];
	step1Form = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.step2Form = this.fb.group({
      experience: [2]
    });
  }

  onStep1Next(e) {}
  onStep2Next(e) {}
  onComplete(e) {}

}
