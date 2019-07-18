import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { LoginService } from '../login.service';

import { Login } from  '../login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loading = false;
	 loginForm : FormGroup
	 submitted = false;
    returnUrl: string;
    error: string;
    success: string
  constructor(       private loginService: LoginService,  private formBuilder: FormBuilder,private router: Router,  private route: ActivatedRoute,) { }

  ngOnInit() {
	  
	  this.loginForm  = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
		
		
	        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        // show success message on registration
        if (this.route.snapshot.queryParams['registered']) {
            this.success = 'Registration successful';
        }
  }
get f() { return this.loginForm.controls; }

onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.error = null;
        this.success = null;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
		  //console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value));
		 
		   this.loginService.login(this.loginForm.value)
            .pipe(first())
            .subscribe(
                data => {
					this.loading = false;
					//console.log("data===",data);
					if (data !== undefined)
				    {
						this.router.navigate(['/dashboard'], { queryParams: { logged: 'true' }});
				    }
					  
                },
                error => {
						 //console.log("error===",error);
						  this.error = 'Something missing wrong. Please try again';
						  this.loading = false;
                });
				
				
				
        /*this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });*/
    }
}
