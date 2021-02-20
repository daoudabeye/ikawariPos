import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
    loading: boolean;
    loadingText: string;
    signinForm: FormGroup;

    submitted = false;

    @ViewChild('dialog_error') dialog_error: ElementRef; 

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private modalService: NgbModal,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
                this.loadingText = 'Loading Dashboard Module...';

                this.loading = true;
            }
            if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
                this.loading = false;
            }
        });

        this.signinForm = this.fb.group({
            username: ['test@example.com', Validators.required],
            password: ['1234', Validators.required]
        });
    }

     // convenience getter for easy access to form fields
     get f() { return this.signinForm.controls; }

    signin() {
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.signinForm.invalid) {
            return;
        }
        this.loading = true;
        this.loadingText = 'Sigining in...';
        this.auth.signin(this.signinForm.value, () =>{
            this.router.navigateByUrl('/welcome/v1');
            this.loading = false;
        }, 
        (error) =>{
            this.loading = false;
            this.alertService.error('Identifiant ou Mot de passe incorrect !');
            this.signinForm.controls['username'].setErrors({'incorrect': true});
            this.signinForm.controls['password'].setErrors({'incorrect': true});
        })
    }
}
