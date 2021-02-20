import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { EChartsOption } from 'echarts';
import { AuthService } from 'src/app/shared/services/auth.service';
//import { echartStyles } from '../../../shared/echart-styles';

@Component({
	selector: 'app-dashboad-default',
	templateUrl: './dashboad-default.component.html',
	styleUrls: ['./dashboad-default.component.css']
})
export class DashboadDefaultComponent implements OnInit {
	chartLineOption1: EChartsOption;
	chartLineOption2: EChartsOption;
	chartLineOption3: EChartsOption;
    salesChartBar: EChartsOption;
    salesChartPie: EChartsOption;

	constructor(private authService: AuthService) { }

	ngOnInit() {
		
	}

	username(){
		return this.authService.userValue.username
	}

}
